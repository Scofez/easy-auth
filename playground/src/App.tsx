import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { AuthForm, type AuthCredentials } from '@scofez/easy-auth';

function App() {
  const handleLogin = (creds: AuthCredentials) => {
    console.log("Attempting Login with:", creds);
  };

  const handleRegister = (creds: AuthCredentials) => {
    console.log("Attempting Registration with:", creds);
  };

  return (
    <div style={{ padding: '50px', background: '#eee', minHeight: '100vh', width: '100vw' }}>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Easy Auth Playground
      </Typography>
      <Paper  sx={{ width: '90vw', p: 4, mb: 4, background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Easy Auth AuthForm component
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        The following is an example of the AuthForm component.
        It's a component that can be used to handle authentication in your app.
        to implement it, you need to pass it two functions:
        <ul>
          <li>onLogin: This function is called when the user clicks the login button.</li>
          <li>onRegister: This function is called when the user clicks the register button.</li>
        </ul>
      </Typography>

      </Paper>
      <AuthForm 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
      />
      <Typography variant="h4" sx={{ mb: 4 }}>
        More components will be added later
      </Typography>
    </div>
  );
}

export default App
