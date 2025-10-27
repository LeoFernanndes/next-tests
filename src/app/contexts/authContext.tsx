'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import axiosCookieClient from '@/services/axiosCookieClient'


const AuthContext = createContext(null);

export function AuthProvier({children}) {
    const [user, setUser] = useState(null);

    // useEffect(() => {

    //     function checkAuth(){
    //         api.get('/api/v1/users/retrieve_self/')
    //         .then(response => {
    //             if(response.status == 200){
    //                 const userData = response.data;
    //                 setUser(userData);
    //             } else {
    //                 if (user != null) {
    //                     setUser(null)
    //                 }
    //             }
    //         })
    //         .catch(error => {
    //             if (user != null){
    //                 setUser(null)
    //             }
    //         })
    //     }

    //     // checkAuth();
    // }, [user])



    const login = async (loginPayload) => {
        axiosCookieClient.post('/api/v1/users/auth/login/', loginPayload).then(
            response => {
                console.log(response.data.user)
                router.push('/banking')
            }
        ).catch(error => console.log(error))
    }

    return (
        <AuthContext.Provider value={{ user, login }}>
          {children}
        </AuthContext.Provider>
      );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
  }