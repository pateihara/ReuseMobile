# ReuseMobile

O **ReuseMobile** é um app móvel para facilitar a **troca de itens** entre pessoas próximas, estimulando **reutilização** e **sustentabilidade**. Usuários publicam itens que desejam trocar, navegam por categorias, avaliam detalhes e combinam a troca dentro do app.

> Monorepo/stack alvo: **Expo + React Native + TypeScript** (Managed Workflow).

---

## 🌟 Funcionalidades

- **Autenticação** (Firebase Auth: e-mail/senha, social opcional).
- **Publicação de itens** com fotos (até 5 imagens) e **localização**.
- **Catálogo e pesquisa** por categorias.
- **Favoritos** e **lista de itens relacionados**.
- **Chat/contato** in-app para negociação.
- **Notificações push** (Expo Notifications/FCM).
- **Persistência local** (AsyncStorage) para rascunhos e cache leve.

---

## 🧱 Arquitetura (resumo)

- `screens/` – telas (ex.: `Item/ItemScreen`, `Item/AddItem` etc.)
- `src/components/` – UI compartilhada (Cards, Header, Gallery…)
- `src/services/` – integrações (API/fetch, favoritos, etc.)
- `context/` – contexto de autenticação (`AuthContext`)
- `src/constants/` – tema, constantes
- `src/types/` – tipagens globais (ex.: `navigation`)
- `src/lib/` – inicialização de libs (ex.: firebase)

---

## 🛠️ Tecnologias

- **React Native** (Expo)
- **TypeScript**
- **React Navigation**
- **Firebase** (Auth, Firestore, Storage) + **Expo Notifications/FCM**
- **AsyncStorage** (cache/local draft)
- **DropDownPicker**, **expo-image-picker**, **expo-location**

---

## 🚀 Como executar

1. **Clone** o repositório
   ```bash
   git clone https://github.com/nataliaguaita/ReuseMobile.git
   cd ReuseMobile
   ```

2. **Instale** dependências
   ```bash
   npm install
   ```

3. **Config .env** (veja seção *Variáveis de ambiente* abaixo)

4. **Inicie** o app
   ```bash
   npm start
   ```
   Escaneie o QR no **Expo Go**:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` (ou `app.config.js` usando `extras`) com:

```env
# Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...

# Opcional (Nominatim: coloque um contato válido para o User-Agent)
EXPO_PUBLIC_CONTACT_EMAIL=seu-email@dominio.com
```

> No código, usamos `process.env.EXPO_PUBLIC_*`. Não exponha segredos sensíveis fora do escopo público do app.

---

## 🔗 Firebase (setup rápido)

1. **Projeto** no Firebase Console → crie um app **Web**.
2. **Auth**: habilite *E-mail/senha* (e provedores extras se quiser).
3. **Firestore**: crie banco em modo de teste (ajuste regras depois).
4. **Storage**: habilite bucket para upload de imagens.
5. **Notifications**: configure **FCM** (Expo Managed já integra).

### Inicialização (exemplo)

`src/lib/firebase.ts`
```ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Regras (exemplos mínimos – ajuste para produção)

**Firestore (`firestore.rules`)**
```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /items/{itemId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && request.auth.uid == request.resource.data.ownerId;
    }
    match /users/{uid} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

**Storage (`storage.rules`)**
```txt
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /items/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📍 Localização & Endereço (robusto)

- `expo-location` para coordenadas do dispositivo.
- **Reverse geocoding** com **Nominatim** (OSM) usando:
  - `zoom=18`
  - headers obrigatórios: `User-Agent` (com contato) e `Accept-Language`.
  - Fallback de bairro: `suburb → neighbourhood → city_district → borough`.
- Quando houver **CEP**, normalizamos **bairro/cidade/UF/logradouro** via **ViaCEP**.

> Campo de endereço permanece **editável** pelo usuário.

---

## 🖼️ Imagens (image picker)

- Compatibilidade mantida com **`ImagePicker.MediaTypeOptions.Images`**.
- Recomendado: atualizar `expo-image-picker` para usar **`ImagePicker.MediaType`**.
- Upload das imagens pode ir para **Firebase Storage** (não incluso aqui por brevidade).

---

## 🧪 Qualidade

- **ESLint/Prettier** (scripts prontos no `package.json`)
- **TypeScript** estrito recomendado
- **Testes** (opcional): `jest` + `@testing-library/react-native`

---

## 🌳 Git & Fluxo

- **Branching**:
  - `main` → produção
  - `develop` → integração
  - `feature/xyz`, `fix/abc`, `chore/…`
- **Commits**: Conventional Commits
  - `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`
- **PRs**: curtos, com descrição, print/gif quando UI

Exemplo:
```bash
git checkout -b feature/publicar-item
git add .
git commit -m "feat(item): publicar item com fotos e endereço"
git push origin feature/publicar-item
# Abra o Pull Request
```

---

## 🤝 Contribuindo

1. Faça um **fork**.
2. Crie uma **branch**:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit:
   ```bash
   git commit -m "feat: minha nova feature"
   ```
4. Push:
   ```bash
   git push origin minha-feature
   ```
5. Abra um **Pull Request**.

---

## ⚠️ Troubleshooting

- **VirtualizedLists nested**:  
  Se usar `ScrollView` e um componente com `FlatList` interno (ex.: `DropDownPicker`), use `listMode="SCROLLVIEW"` ou troque o container por `FlatList` com `ListHeaderComponent`.

- **ImagePicker deprecated warning**:  
  Atualize `expo-image-picker` e use `ImagePicker.MediaType`. Se não atualizar, o app funciona, mas o aviso aparece.

- **Reverse geocoding com bairro incorreto**:  
  O fallback + ViaCEP corrige a maioria. Manter campo editável para ajuste manual.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🔄 Atualizações recentes (Mobile)

### 2025-10-26
- **Geolocalização (Nominatim + ViaCEP)**
  - Reverse geocoding agora usa `zoom=18` e cabeçalhos obrigatórios (`User-Agent`, `Accept-Language`).
  - Adicionamos *fallback* para bairro: `suburb → neighbourhood → city_district → borough`.
  - Quando houver **CEP**, normalizamos **bairro/cidade/UF/logradouro** via **ViaCEP**.
  - Exemplo de uso:
    ```ts
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&zoom=18&lat=${lat}&lon=${lon}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'ReuseMobile/1.0 (contato: seu-email@dominio.com)',
        'Accept-Language': 'pt-BR',
      },
    });
    ```

- **VirtualizedLists x ScrollView**
  - Para evitar o warning de listas aninhadas, o `DropDownPicker` agora está com `listMode="SCROLLVIEW"` quando usado dentro de `ScrollView`.
  - Alternativa: trocar o `ScrollView` externo por uma `FlatList` com `ListHeaderComponent`.

- **Image Picker (compatibilidade)**
  - Mantivemos `ImagePicker.MediaTypeOptions.Images` para compatibilidade com a versão instalada.
  - Recomendado: atualizar para `expo-image-picker@latest` e trocar para `ImagePicker.MediaType.Images`.
  - Matriz rápida:
    | Versão do expo-image-picker | Propriedade recomendada |
    |-----------------------------|-------------------------|
    | < 15.x                      | `MediaTypeOptions`      |
    | ≥ 15.x                      | `MediaType` (ou array)  |

### Passos para quem for clonar/atualizar
1. **Variáveis de ambiente**: mantenha o `EXPO_PUBLIC_*` do Firebase e, se desejar, uma variável com contato para o `User-Agent` do Nominatim.
2. **Permissões**: `expo-location` pedirá as permissões em runtime.
3. **Builds**: sem mudanças no EAS necessárias para estas alterações.

### Troubleshooting
- **“VirtualizedLists should never be nested…”**  
  - Certifique-se de que `DropDownPicker` em telas com `ScrollView` use `listMode="SCROLLVIEW"` ou migre o container para `FlatList`.
- **Aviso do ImagePicker (depreciação)**  
  - Atualize o pacote e troque `MediaTypeOptions` → `MediaType`. Enquanto não atualizar, é só um *warning*.
- **Reverse geocoding com bairro incorreto**  
  - O fallback + ViaCEP já corrige a maioria dos casos; o campo continua editável para ajuste manual.
