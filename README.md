
# ReuseMobile — Troca Sustentável de Itens

O **ReuseMobile** é um aplicativo em **React Native (Expo)** que facilita a **troca de itens entre pessoas** próximas, promovendo **reutilização** e **sustentabilidade**. 
Os usuários podem **publicar** produtos com fotos, **buscar** itens por localização/CEP e **conversar** pelo chat para combinar a troca.

<p align="left">
  <img alt="Expo" src="https://img.shields.io/badge/Expo-51%2B-000?logo=expo&logoColor=fff">
  <img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.7x-61dafb?logo=react&logoColor=000">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=fff">
  <img alt="React Query" src="https://img.shields.io/badge/React%20Query-5.x-ef4444">
</p>

## 📌 Sumário
- [Introdução](#-introdução)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [APIs Consumidas](#-apis-consumidas)
- [Autenticação & Sessões](#-autenticação--sessões)
- [Caching Local & Offline](#-caching-local--offline)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Fluxos Principais](#-fluxos-principais)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🧭 Introdução
Na fase anterior, estruturamos a base do app com telas, UX, armazenamento interno e câmera. 
Nesta fase, evoluímos para **consumir APIs externas**, implementar **autenticação/sessões** e aplicar **caching local** com estratégia **offline-first** — mantendo o foco em experiência simples e eficiente para que trocas aconteçam com o mínimo de atrito.

---

## 🧰 Tecnologias Utilizadas
- **React Native (Expo)** — app móvel multiplataforma com dev ágil.
- **TypeScript** — tipagem estática para segurança/manutenibilidade.
- **React Navigation** — navegação Stack/Tab, com rotas protegidas.
- **Axios** — camada de serviços HTTP com interceptors.
- **@tanstack/react-query** — cache de dados, revalidação e persistência.
- **@react-native-async-storage/async-storage** — persistência do cache/offline.
- **expo-secure-store** — armazenamento seguro do token de sessão.

---

## ✅ Funcionalidades
- **Cadastro e autenticação de usuários.**
- **Publicação de itens para troca** (com endereço por CEP e suporte a câmera).
- **Navegação** entre seções: **Início**, **Favoritos**, **Adicionar**, **Chat**, **Perfil**.
- **Visualização de detalhes** dos itens.
- **Chat** para combinar trocas (dados mockados nesta fase).
- **Busca por localização** (CEP/UF/Município) para encontrar itens próximos.
- **Cabeçalho com clima local** na Home para contexto (Open-Meteo).
- **Sistema de notificações** (placeholder) para atualizações/mensagens.

> Obs.: Algumas integrações são **mock** nesta fase (ex.: chat e parte do perfil) para focar na arquitetura de dados, cache e sessão.

---

## 🌐 APIs Consumidas
| API | Endpoint(s) | Uso no App | Telas Impactadas |
|---|---|---|---|
| **ViaCEP** | `GET /ws/{cep}/json/` | Autopreencher endereço a partir do CEP. | **Adicionar Item**, **Perfil/Endereço** |
| **IBGE Localidades** | `GET /localidades/estados` · `GET /localidades/estados/{UF}/municipios` | Dropdowns oficiais de UF/Município. | **Cadastro**, **Filtros** |
| **Open-Meteo** | `GET /forecast?latitude={lat}&longitude={lon}&current_weather=true` | Clima atual no topo da Home. | **Início** |
| **ReqRes (mock)** | `POST /api/login` · `GET /api/users/2` | **Login** e perfil simulado (token). | **Login**, **Perfil** |
| **JSONPlaceholder** | `GET /comments?postId={id}` | Lista “mock” de conversas/mensagens. | **Chat** |

---

## 🔐 Autenticação & Sessões
- **Login** via **ReqRes** (mock) para foco na arquitetura do app.
- **Token** salvo em **SecureStore** (seguro) + hidratação com **AsyncStorage**.
- **Axios interceptor** injeta `Authorization` quando autenticado.
- **Rotas protegidas**: `Adicionar Item`, `Perfil` (e outras sensíveis).
- **Expiração simulada** (ex.: 30 min). Como ReqRes não oferece refresh real, o **refresh** é simulado sob demanda (novo login).

---

## ⚡ Caching Local & Offline
- **React Query** + **persistQueryClient** no **AsyncStorage** (offline-first).
- **Estratégias por domínio**:
  - **UF/Município (IBGE)**: TTL 7 dias (dados raramente mudam).
  - **CEP→Endereço (ViaCEP)**: TTL 1 dia por CEP consultado.
  - **Clima (Open-Meteo)**: TTL 5 min (revalida ao focar a Home).
  - **Perfil/Token**: até **logout**.
  - **Chat (JSONPlaceholder)**: TTL 30 min + pull-to-refresh.

---

## ▶️ Como Executar o Projeto

### 1) Clone o repositório
```bash
git clone https://github.com/nataliaguaita/ReuseMobile.git
cd ReuseMobile
```

### 2) Instale as dependências
```bash
npm install
# ou
yarn
```

### 3) Configure variáveis de ambiente (opcional)
Crie um `.env` na raiz (exemplo):
```ini
VIA_CEP_BASE=https://viacep.com.br
IBGE_BASE=https://servicodados.ibge.gov.br
OPEN_METEO_BASE=https://api.open-meteo.com
REQRES_BASE=https://reqres.in
JSON_PLACEHOLDER_BASE=https://jsonplaceholder.typicode.com
SESSION_TTL_MINUTES=30
```

### 4) Inicie o servidor de desenvolvimento
```bash
npx expo start --clear
```
Isso abrirá o **Expo DevTools** no navegador. Escaneie o QR Code com o **Expo Go** para visualizar o app.

**Android:** [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) · **iOS:** [Expo Go](https://apps.apple.com/app/expo-go/id982107779)

---

## 🗂️ Estrutura de Pastas
```
src/
  api/
    client.ts                # Axios base + interceptors
    ibge.service.ts
    viacep.service.ts
    weather.service.ts
    auth.service.ts
    chat.service.ts
  hooks/
    useUFsQuery.ts
    useMunicipiosQuery.ts
    useCepQuery.ts
    useWeatherQuery.ts
    useChatQuery.ts
  auth/
    AuthContext.tsx
    useAuth.ts
    ProtectedRoute.tsx
  screens/
    HomeScreen.tsx
    AddItemScreen.tsx
    ProfileScreen.tsx
    LoginScreen.tsx
    ChatScreen.tsx
    FiltersScreen.tsx
  components/
    AddressForm.tsx
    WeatherHeader.tsx
    ChatList.tsx
  navigation/
    AppNavigator.tsx
  storage/
    queryClient.ts           # React Query + persist
  utils/
    geolocation.ts
```

---

## 🔄 Fluxos Principais
- **Login** → salva token em SecureStore → navega para Tabs com rotas protegidas.
- **Adicionar Item** → CEP via ViaCEP autopreenche endereço; UF/Município via IBGE.
- **Home** → usa geolocalização para buscar clima atual (Open-Meteo).
- **Chat** → carrega conversas mockadas (JSONPlaceholder) com cache e pull-to-refresh.
- **Perfil** → busca usuário (mock) pós-login; **Logout** limpa sessão.

---

## 🤝 Contribuindo

1. Faça um **fork** deste repositório.
2. Crie uma **branch** para sua feature/ajuste:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça **commit** das alterações:
   ```bash
   git commit -m "feat: adiciona <descrição>"
   ```
4. Envie sua branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um **Pull Request**.

> Branches úteis para a disciplina: `main` e (se aplicável) `entrega-fase-mobile` para a submissão desta etapa.

---

## 📄 Licença
Este projeto está licenciado sob a **MIT License**. Consulte [`LICENSE`](LICENSE) para detalhes.
