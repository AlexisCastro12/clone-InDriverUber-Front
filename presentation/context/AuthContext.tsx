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

export const AuthProvider = ({children, authUseCases}: any) => {
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);

  useEffect(()=>{
    getAuthSession();
    // Verifica si existe o no una sesion creada previamente, 
    // si ya se creo se traeran los datos almacenados localmente que se tenian al cerrar la app,
    // si no se a creado entonces devolvera null y podra solicitarse un loggeo o registro
  }, [])

  const saveAuthSession = async (authResponse:AuthResponse) => {
    await authUseCases.saveAuthSession.execute(authResponse);
    setAuthResponse(authResponse);
  }
  
  const getAuthSession = async () => {
    const authData = await authUseCases.getAuthSession.execute();
    console.log('SESSION DATA:\n', authData);
    setAuthResponse(authData);
  }

  const removeAuthSession = async () => {
    await authUseCases.removeAuthSession.execute();
    setAuthResponse(null);
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