'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import bankSvg from '../../../../../public/bank.svg'
import { useAuth } from '@/app/contexts/authContext'
import axiosCookieClient from '@/services/axiosCookieClient'


export default function TopNavbar({isOpen, toggleMenu}){
    
    const [apiUser, setApiUser] = useState(null);
    const router = useRouter();
    const { user, login } = useAuth();

    useEffect(() => {
        axiosCookieClient.get('/api/v1/users/retrieve_self/')
        .then(response => {
            if (response.status == 200){
                setApiUser(response.data)
                console.log(response.data)
            } else {
                console.log(response.status)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleLogoff = () => {
        axiosCookieClient.post('/api/v1/users/auth/logout/', {})
        .then(response => {
            if (response.status == 200){
                setApiUser(null)
                console.log(response.data)
                router.push('/banking')
            } else {
                console.log(response.status)
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <>            
            {apiUser ?             
                <nav className="w-full bg-gray-300">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center hover:cursor-pointer" onClick={() => router.push('/banking')}>
                                <div className="flex relative w-6 h-6 m-1 items-center justify-center">                      
                                    <Image className="object-contain" src={bankSvg} alt="bank logo" fill/>                                                    
                                </div>
                                <span className="text-2xl font-bold ml-2">Sample Bank</span>  
                            </div>
                            <div className="md:hidden">
                                <button className="flex justify-center items-center" onClick={toggleMenu} aria-expanded={isOpen}>
                                    {isOpen ? "close" : "open"}
                                </button>
                            </div>
                            
                            <div className="hidden md:block">
                                <div className="flex items-baseline space-x-4">
                                    <a className="w-36 h-12 inline-flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-gray-400 duration-200" onClick={() => handleLogoff()}>Logoff</a>
                                </div>
                            </div>   
                        </div>                                                     
                    </div>
                                
                    <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="space-y-1">
                            <a className="block text-base rounded-md hover:bg-gray-700 transition-colors">Logoff</a>
                        </div>
                    </div>
                </nav> : 
                <nav className="w-full bg-gray-300">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center hover:cursor-pointer" onClick={() => router.push('/banking')}>
                            <div className="flex relative w-6 h-6 m-1 items-center justify-center">                      
                                <Image className="object-contain" src={bankSvg} alt="bank logo" fill/>                                                    
                            </div>
                            <span className="text-2xl font-bold ml-2">Sample Bank</span>  
                        </div>
                        <div className="md:hidden">
                            <button className="flex justify-center items-center" onClick={toggleMenu} aria-expanded={isOpen}>
                                {isOpen ? "close" : "open"}
                            </button>
                        </div>
                        
                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4">
                                <a className="w-36 h-12 inline-flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-gray-400 duration-200" onClick={() => router.push('/banking/login')}>Login</a>
                                <a className="w-36 h-12 inline-flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-gray-400 duration-200" onClick={() => router.push('/banking/register')}>Register</a>
                            </div>
                        </div>   
                    </div>                                                     
                </div>
                            
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="space-y-1">
                        <a className="block text-base rounded-md hover:bg-gray-700 transition-colors" onClick={toggleMenu}>Login</a>
                        <a className="block text-base rounded-md hover:bg-gray-700 transition-colors" onClick={toggleMenu}>Register</a>
                    </div>
                </div>
            </nav>}

        </>       
    )
}