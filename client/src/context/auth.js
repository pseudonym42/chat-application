import React, { 
    createContext, 
    useReducer, 
    useContext 
} from 'react';
import jwtDecode from 'jwt-decode';

let user = null;

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const token = localStorage.getItem('token');
if (token) {
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);
    if (new Date() > expiresAt) {
        localStorage.removeItem('token');
    } else {
        // note that our token only contains user data
        user = decodedToken
    }
} else console.log('no token');


const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
            }
        default:
            throw new Error(`Unknow action type: ${action.type}`);
    }
}

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, {user: user});

    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

function useAuthState() {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider');
    }
    return context;
}

function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider');
    }
    return context;
}


export { AuthProvider, useAuthState, useAuthDispatch };