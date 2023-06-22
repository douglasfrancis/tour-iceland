import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../Firebase';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider( {children} ) {

    const [currentUser, setCurrentUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
   
   
useEffect(() => {
   
        let unsubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
		console.log(user)
                setCurrentUser(user)
                setIsLoading(false)
      
          
            } else {
                setCurrentUser(null)
                setIsLoading(false)
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}
