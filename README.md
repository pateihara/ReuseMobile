# ReuseMobile

O **ReuseMobile** é um app móvel para facilitar a **troca de itens** entre pessoas próximas, estimulando **reutilização** e **sustentabilidade**. Usuários publicam itens que desejam trocar, navegam por categorias, avaliam detalhes e combinam a troca dentro do app.

> Stack: **Expo + React Native + TypeScript** (Managed Workflow).

---

## 🌟 Funcionalidades

- **Autenticação** (Firebase Auth: e-mail/senha; provedores extras opcionais)
- **Publicação de itens** com fotos (até 5 imagens) e **localização**
- **Catálogo & pesquisa** por categorias
- **Favoritar itens** e **itens relacionados**
- **Chat/contato** in-app para negociação
- **Notificações push** (Expo Notifications/FCM)
- **Persistência local** (AsyncStorage) para rascunhos e cache leve

---

## 🧱 Arquitetura (resumo)

- `screens/` – telas (ex.: `Item/ItemScreen`, `Item/AddItem`, `Item/FeedbackAddItem`)
- `src/components/` – UI compartilhada (Cards, Header, Gallery…)
- `src/services/` – integrações (API/fetch, favoritos, firebase…)
- `context/` – provê `AuthContext` (`useAuth`)
- `src/constants/` – tema, cores
- `src/types/` – tipagens globais (ex.: `navigation`)
- `src/lib/` – inicialização de libs (ex.: firebase)

---

## 🧭 Páginas & Fluxos

### Mapa de navegação (alto nível)
```
MainApp (TabNavigator)
├─ Início (Home/Listagem)
├─ Categorias (explorar por categoria)
├─ Chat (conversas)        [Protegida]
├─ Perfil (Login/Registro / Perfil do usuário)
└─ (Outras abas conforme evolução)

Stack (AppStack)
├─ Item (ItemScreen)       [Ações protegidas]
├─ AddItem (Wizard)        [Protegida]
└─ FeedbackAddItem (Confirmação de publicação)
```

### Telas principais

- **Início (Home/Listagem)**  
  Lista de itens (mock/local por enquanto). Acessível a todos.

- **ItemScreen (`screens/Item/ItemScreen`)**  
  - Mostra **galeria** de imagens, categoria, descrição e **itens relacionados**.  
  - Ações:
    - **Favoritar** → exige login (se não logado, redireciona para Perfil).
    - **Trocar agora** → exige login (navega para **Chat**).
  - Observação técnica: usa uma `FlatList` “vazia” com conteúdo no `ListHeaderComponent` para evitar `ScrollView` + `FlatList` aninhadas.

- **AddItem (Wizard) (`screens/Item/AddItem`)** **[Protegida]**  
  - **6 passos**: nome, descrição, categoria, estado, fotos, endereço.  
  - **Fotos** com `expo-image-picker` (até 5).  
  - **Endereço**:
    - Reverse geocoding via **Nominatim** com `zoom=18` + headers obrigatórios.
    - **Fallback de bairro**: `suburb → neighbourhood → city_district → borough`.
    - Se houver **CEP**, normaliza via **ViaCEP** (bairro/cidade/UF/logradouro).
  - **Persistência de rascunho** com AsyncStorage:
    - `@addItemFormData` e `@addItemCurrentStep`.  
    - Limpa ao **publicar** ou **cancelar**.

- **FeedbackAddItem (`screens/Item/FeedbackAddItem`)**  
  Tela simples de “Publicação concluída”.

- **Perfil**  
  Tela/aba com **Login/Registro** (entrada para autenticação). Telas protegidas redirecionam pra cá quando o usuário não está logado.

- **Chat** **[Protegida]**  
  Fluxo de mensagens entre usuários para combinar a troca (navegado a partir de ações protegidas).

---

## 🔐 Autenticação e sessões

**Onde está aplicado**
- **Perfil (aba “Perfil”)**: Login/Registro.
- **AddItem**: **protegida** — se não logado, redireciona para Perfil.
- **ItemScreen**: ações **Favoritar** e **Trocar agora** exigem login (senão, Perfil).
- **Chat**: requer usuário autenticado.

**Como funciona**
- `AuthContext` (`useAuth`) observa `onAuthStateChanged` (Firebase) e expõe `user`/`loading`.
- Telas/ações consultam `user` para permitir o fluxo.
- **Persistência da sessão** (opcional): configurar `setPersistence` no Firebase para manter login após reabrir o app.

---

## 🗃️ Caching local (AsyncStorage & caches de rede)

| Chave/Origem                     | Conteúdo                                  | Tela(s)      | TTL/Expiração                      | Observações |
|----------------------------------|-------------------------------------------|--------------|------------------------------------|-------------|
| `@addItemFormData`               | Respostas do formulário (passos 0–5)      | AddItem      | Limpo ao **publicar/cancelar**     | Evita perda de progresso |
| `@addItemCurrentStep`            | Índice do passo atual                      | AddItem      | Limpo ao **publicar/cancelar**     | — |
| `@items`                         | Itens publicados (mock/local)             | AddItem/Lista| Até o usuário limpar               | Append ao publicar |
| `@favorites` (serviço favoritos) | IDs/objetos favoritos                      | ItemScreen   | Até o usuário limpar               | Altera se logado; leitura offline |
| `viacep:<CEP>`                   | Normalização oficial de endereço           | AddItem      | 10 min (digitação) / 24h (geo)     | Menos chamadas repetidas |
| Nominatim (fetch direto)         | Reverse geocoding                          | AddItem      | —                                  | `zoom=18`, headers, fallback de bairro; ViaCEP normaliza |

---

## 🔗 Firebase (setup)

1. **Projeto** no Firebase Console → crie app **Web**.
2. **Auth**: habilite *E-mail/senha* (e provedores extras se quiser).
3. **Firestore**: banco em modo teste para dev (ajuste regras depois).
4. **Storage**: bucket para imagens.
5. **Notifications**: FCM (Expo Managed integra).

### Variáveis de ambiente

Crie `.env` com (exemplo):

```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=reuse-mobile.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=reuse-mobile
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=reuse-mobile.appspot.com   # <- appspot.com (correto)
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=257764412083
EXPO_PUBLIC_FIREBASE_APP_ID=1:257764412083:web:ff73b22158b74cd6837ec6

# Opcional (User-Agent do Nominatim)
EXPO_PUBLIC_CONTACT_EMAIL=seu-email@dominio.com
```

> Em Expo, use sempre `process.env.EXPO_PUBLIC_*`. Não exponha segredos fora desse prefixo.

### Inicialização

`src/services/firebase.ts`
```ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!, // ex.: reuse-mobile.appspot.com
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

export const app: FirebaseApp =
  getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

## 📍 Localização & Endereço

- `expo-location` para coordenadas.
- **Nominatim (OSM)** com `zoom=18` e headers:  
  `User-Agent: ReuseMobile/1.0 (contato: seu-email@dominio.com)` e `Accept-Language: pt-BR`.
- **Fallback de bairro**: `suburb → neighbourhood → city_district → borough`.
- **ViaCEP**: quando houver **CEP**, normaliza bairro/cidade/UF/logradouro.
- Campo permanece **editável**.

---

## 🖼️ Imagens (image picker)

- Compat: **`ImagePicker.MediaTypeOptions.Images`** (versões antigas).
- Recomendado: atualizar para `expo-image-picker@latest` e usar **`ImagePicker.MediaType`**.
- Upload para **Firebase Storage** (a ser integrado conforme necessidade).

---

## 🚀 Como executar

```bash
git clone https://github.com/nataliaguaita/ReuseMobile.git
cd ReuseMobile
npm install
npm start
```
Abra no **Expo Go** (Android/iOS).

---

## 🌳 Git & Fluxo

- Branches: `main` (prod), `develop` (integração), `feature/*`, `fix/*`, `chore/*`
- Commits: **Conventional Commits** (`feat:`, `fix:`, `docs:`…)
- PRs: pequenos, com descrição e prints/gifs de UI

---

## ⚠️ Troubleshooting

- **VirtualizedLists nested**  
  Use `listMode="SCROLLVIEW"` no `DropDownPicker` quando dentro de `ScrollView`; ou troque o container por `FlatList` com `ListHeaderComponent`.

- **ImagePicker deprecated warning**  
  Atualize para `expo-image-picker@latest` e use `ImagePicker.MediaType`. Sem atualizar, é apenas um *warning*.

- **Bairro incorreto no reverse**  
  Fallback + ViaCEP corrige a maioria; campo segue editável.

---

## 🔄 Atualizações recentes (Mobile)

### 2025-10-26
- **Geolocalização (Nominatim + ViaCEP)**: `zoom=18`, headers obrigatórios, fallback de bairro; normalização via ViaCEP quando houver CEP.
- **VirtualizedLists x ScrollView**: `DropDownPicker` com `listMode="SCROLLVIEW"`.
- **Image Picker**: compat com `MediaTypeOptions`; recomendado migrar para `MediaType` em versões novas.

---

## 📄 Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
