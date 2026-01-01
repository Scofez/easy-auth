import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Link, 
    Paper,
    Stack,
    Alert
} from '@mui/material';

export interface AuthCredentials {
    username: string;
    pass: string;
}

interface AuthFormProps {
    onLogin: (credentials: AuthCredentials) => void;
    onRegister: (credentials: AuthCredentials) => void;
    title?: string;
}

export const AuthForm = ({ onLogin, onRegister, title }: AuthFormProps) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState<string | null>(null);

    /**
     * Validates the form inputs.
     * 
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    const validate = (): boolean => {
        setError(null);
        if (pass.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }

        // Double entry validation for registration
        if (isRegistering && pass !== confirmPass) {
            setError("Passwords do not match.");
            return false;
        }
        return true;
    };

    /**
     * Handles form submission.
     * 
     * @param {React.FormEvent} e - The form event.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validate()) return;

        if (isRegistering) {
            onRegister({ username, pass });
        } else {
            onLogin({ username, pass });
        }
    };

    /**
     * Toggles between login and registration modes.
     */
    const toggleMode = () => {
        setIsRegistering((prev) => !prev);
        setError(null); // Clear errors when switching modes
        setConfirmPass(''); // Reset confirm field
    };

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 400, mx: 'auto' }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                    <Typography variant="h5" fontWeight="bold" textAlign="center">
                        {title || (isRegistering ? 'Create Account' : 'Welcome Back')}
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="Username"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />

                    {isRegistering && (
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            required
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    )}

                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large" 
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {isRegistering ? 'Register' : 'Login'}
                    </Button>

                    <Typography variant="body2" textAlign="center">
                        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <Link 
                            component="button" 
                            type="button"
                            onClick={toggleMode} 
                            sx={{ fontWeight: 'bold', cursor: 'pointer', border: 'none', background: 'none', font: 'inherit', color: 'primary.main', p: 0 }}
                        >
                            {isRegistering ? 'Login here' : 'Register here'}
                        </Link>
                    </Typography>
                </Stack>
            </Box>
        </Paper>
    );
};