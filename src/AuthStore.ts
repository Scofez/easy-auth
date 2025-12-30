import Cookies from 'js-cookie';

export class AuthStore {
    constructor(private readonly tokenKey: string) {}

/**
     * Saves the JWT token to a secure cookie.
     * 
     * @param {string} token - The JWT string received from the server.
     */
    public setToken(token: string): void {
        Cookies.set(this.tokenKey, token, { expires: 7, secure: true, sameSite: 'strict' });
    }

    /**
     * Retrieves the stored token.
     * 
     * @returns The token string or undefined if no session exists.
     */
    public getToken(): string | undefined {
        return Cookies.get(this.tokenKey);
    }

    /**
     * Clear the token from the cookie
     */
    public clear(): void {
        Cookies.remove(this.tokenKey);
    }

    /**
     * Check if the user is authenticated
     */
    public isAuthenticated(): boolean {
        return !!this.getToken();
    }
}