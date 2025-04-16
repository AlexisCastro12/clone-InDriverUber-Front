import { createContext, useEffect, useState } from "react";
import { AuthResponse } from "../../domain/models/AuthResponse";
import { LocalStorage } from "../../data/sources/local/LocalStorage";

export interface AuthContextProps {
  authResponse: AuthResponse | null,
  saveAuthSession: (authResponse:AuthResponse) => Promise<void>;
  getAuthSession: () => Promise<void>;
  removeAuthSession: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const localStorage = new LocalStorage();
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);

  useEffect(()=>{
    getAuthSession();
    // Verifica si existe o no una sesion creada previamente, 
    // si ya se creo se traeran los datos almacenados localmente que se tenian al cerrar la app,
    // si no se a creado entonces devolvera null y podra solicitarse un loggeo o registro
  }, [])

  const saveAuthSession = async (authResponse:AuthResponse) => {
    localStorage.save('auth', JSON.stringify(authResponse));
    setAuthResponse(authResponse);
  }
  
  const getAuthSession = async () => {
    const data = await localStorage.getItem('auth');
    const authData: AuthResponse = JSON.parse(data as any);
    console.log('SESSION DATA:\n', authData);
    setAuthResponse(authData);
  }

  const removeAuthSession = async () => {
    // await localStorage.removeItem('auth');
    // setAuthResponse(null);
  }

  return(
    <AuthContext.Provider value={{
      authResponse,
      saveAuthSession,
      getAuthSession,
      removeAuthSession
    }}>
      {children}
    </AuthContext.Provider>
  )
}