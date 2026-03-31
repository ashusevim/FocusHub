import { useRef } from "react";
import { useEffect, createContext, useState, useContext, useCallback } from "react";

const AuthContext = createContext();
const TOKEN_STORAGE_KEY = "token";

const clearStoredToken = () => {
	localStorage.removeItem(TOKEN_STORAGE_KEY);
}

const decodeJwtPayload = (token) => {
	const parts = token?.split(".");

	if (!parts || parts.length !== 3) {
		throw new Error("Malformed JWT");
	}

	const base64 = parts[1].replace(/-/g, "+").replace(/-/g, "/");
	const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
	const decoded = atob(paddedBase64);

	const json = decodeURIComponent(
		decoded
			.split("")
			.map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
			.join("")
	);

	return JSON.parse(json);
}

const isExpiredToken = (payload) => {
	return typeof payload?.exp !== "number" || payload.exp * 1000 <= Date.now();
}

const getInitialAuthState = () => {
	const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

	if (!storedToken) {
		return {
			token: null,
			user: null
		};
	}

	try {
		const payload = decodeJwtPayload(storedToken);

		if (isExpiredToken(payload)) {
			throw new Error("Expired JWT");
		}

		return {
			token: storedToken,
			user: payload,
		}
	} catch {
		clearStoredToken();
		return {
			token: null,
			user: null
		};
	}
}

export default function AuthProvider({ children }) {
	const [auth, setAuth] = useState(getInitialAuthState);
	const logoutTimeoutRef = useRef(null);

	const clearAuthState = useCallback(() => {
		clearStoredToken();
		setAuth({
			token: null,
			user: null
		})
	}, []);

	const login = useCallback((newToken, user) => {
		try {
			const payload = decodeJwtPayload(newToken);

			if (isExpiredToken(newToken)) {
				throw new Error("Expired JWT");
			}

			localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
			setAuth({
				token: newToken,
				user: user ?? payload
			});
		} catch {
			clearAuthState();
		}
	}, [clearAuthState]);

	const logout = useCallback(() => {
		clearAuthState();
	}, [clearAuthState]);

	useEffect(() => {
		if (logoutTimeoutRef.current) {
			window.clearTimeout(logoutTimeoutRef.current);
			logoutTimeoutRef.current = null;
		}

		if (!auth.token) {
			return;
		}

		try {
			const payload = decodeJwtPayload(auth.token);

			if (isExpiredToken(payload)) {
				clearAuthState();
				return;
			}

			logoutTimeoutRef.current = window.setTimeout(() => {
				clearAuthState();
			}, payload.exp * 1000 - Date.now());
		} catch {
			clearAuthState();
		}

		return () => {
			if (logoutTimeoutRef.current) {
				window.clearTimeout(logoutTimeoutRef.current);
				logoutTimeoutRef.current = null
			}
		}
	}, [auth.token, clearAuthState]);

	const isAuthenticated = !!auth.token;

    return (
		<AuthContext.Provider
			value={{
				user: auth.user,
				token: auth.token,
				isAuthenticated,
				login,
				logout
			}}
		>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)
