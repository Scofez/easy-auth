# @scofez/easy-auth

A lightweight, developer-friendly authentication suite for React. It combines powerful logic utilities with ready-to-use Material UI components to handle your entire authentication flow in minutes.

---

## Installation

This library handles `axios` and `js-cookie` as internal dependencies. You only need to ensure the React and MUI peer dependencies are present in your host project:

```bash
# Install the library
pnpm add @scofez/easy-auth

# Ensure peer dependencies are installed
pnpm add @mui/material @emotion/react @emotion/styled react react-dom
```

---

## UI Components

### AuthForm

A self-contained, dual-mode authentication form. It manages its own internal state to switch between Login and Register modes, including built-in password validation.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `onLogin` | `(creds: AuthCredentials) => void` | Called when the user submits the Login form. |
| `onRegister` | `(creds: AuthCredentials) => void` | Called when the user submits the Registration form. |
| `title` | `string` (Optional) | Overrides the header text. |

#### Features

- **Mode Switching**: Internal toggle between Login and Register.
- **Validation**:
  - Minimum password length (6 characters).
  - "Confirm Password" matching in Register mode.
- **Error Handling**: Displays MUI Alerts for validation failures.

---

## Logic Utilities

### AuthStore

Handles secure token persistence using cookies.

```typescript
import { AuthStore } from '@scofez/easy-auth';

AuthStore.setToken('your-jwt-token');
const token = AuthStore.getToken();
AuthStore.clear(); // Use for Logout
```

### QueryHandler

A simplified Axios wrapper for your backend auth endpoints.

```typescript
import { QueryHandler, type AuthCredentials } from '@scofez/easy-auth';

const handleLogin = async (creds: AuthCredentials) => {
  const response = await QueryHandler.login(creds);
  AuthStore.setToken(response.data.token);
};
```

---

## Integration Example

```typescript
import { AuthForm, AuthStore, QueryHandler, type AuthCredentials } from '@scofez/easy-auth';

export const LoginPage = () => {
  const handleLogin = async (creds: AuthCredentials) => {
    try {
      const { data } = await QueryHandler.login(creds);
      AuthStore.setToken(data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleRegister = async (creds: AuthCredentials) => {
    try {
      await QueryHandler.register(creds);
      // Custom post-registration logic here
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
};
```

---

## Development & Playground

This project uses a pnpm workspace to allow development of components in a real React environment.

1. Clone the repo
2. Install dependencies: `pnpm install`
3. Run Playground: `pnpm playground`
4. Build Library: `pnpm build`

---

## License

MIT
