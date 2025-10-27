'use client'

import { useRouter } from "next/navigation";
import { ChangeEventHandler, InputHTMLAttributes, useState } from "react";
import axiosCookieClient from "@/services/axiosCookieClient";
import TopNavbar from "@/app/llms/components/topNavbar";
import RegisterModal from "./register";


type LoginFormData = {
    username: string
    password: string
}


export default function login(){

    const router = useRouter()
    const [formData, setFormData] = useState({username: '', password: ''});
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentState = {...formData}
        currentState[event.target.name as keyof LoginFormData] = event.target.value
        setFormData({...currentState})

        // Clear error message when user starts typing
        if (errorMessage) {
            setErrorMessage('')
        }
    }
    
    function toogleModalVisibility(){
        setIsRegisterModalOpen(!isRegisterModalOpen)
    }

    async function submitLoginForm(event: any) {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axiosCookieClient.post(
                '/api/v1/users/auth/login/',
                formData,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );

            if(response){               
                router.push('/')
            }
        } catch (error: any) {
            let errorMsg = 'An error occurred. Please try again.';

            if (error.response) {
                const status = error.response.status;

                if (status === 401) {
                    errorMsg = 'Invalid username or password';
                } else if (status === 400) {
                    errorMsg = error.response.data?.detail || 'Invalid login credentials';
                } else if (status >= 500) {
                    errorMsg = 'Server error. Please try again later.';
                }
            } else if (error.request) {
                errorMsg = 'Connection error. Please check your internet connection.';
            }

            setErrorMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }

    // async function submitLoginForm(event: any) {
    //     event.preventDefault();
    //     setIsLoading(true);
    //     setErrorMessage('');

    //     try {
    //         const response = await axiosCookieClient.post(
    //             '/api/token/',
    //             formData,
    //             {
    //                 headers: {'Content-Type': 'application/json'}
    //             }
    //         );

    //         if(response){
    //             const tokenData = {
    //                 access: response.data['access'],
    //                 refresh: response.data['refresh']
    //             }
    //             localStorage.setItem('tokenData', JSON.stringify(tokenData))

    //             axiosCookieClient.get('/api/v1/users/retrieve_self/').
    //             then(response => {
    //                 localStorage.setItem('userData', JSON.stringify(response.data))
    //             })

    //             router.push('/')
    //         }
    //     } catch (error: any) {
    //         let errorMsg = 'An error occurred. Please try again.';

    //         if (error.response) {
    //             const status = error.response.status;

    //             if (status === 401) {
    //                 errorMsg = 'Invalid username or password';
    //             } else if (status === 400) {
    //                 errorMsg = error.response.data?.detail || 'Invalid login credentials';
    //             } else if (status >= 500) {
    //                 errorMsg = 'Server error. Please try again later.';
    //             }
    //         } else if (error.request) {
    //             errorMsg = 'Connection error. Please check your internet connection.';
    //         }

    //         setErrorMessage(errorMsg);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }
   
    return (
        <div className={"w-full min-h-screen flex flex-col bg-gray-50"}>
             <div className={"flex h-12 sticky top-0"}>
                <TopNavbar />
            </div>
            <RegisterModal isOpen={isRegisterModalOpen} toogleModalVisibility={toogleModalVisibility} />
            <div className={"flex flex-1 justify-center items-center"}>
                <form className={"flex flex-col h-96 items-center"} onSubmit={submitLoginForm}>
                    {errorMessage && (
                        <div className={"w-56 p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-md"}>
                            {errorMessage}
                        </div>
                    )}
                    <div className={"flex flex-col w-56 mt-5"}>
                        <a>Username</a>
                        <input
                            className={"rounded-md border border-gray-700 pl-2 h-8"}
                            name={"username"}
                            onChange={handleFormChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div className={"flex flex-col w-56 mt-5"}>
                        <a>Password</a>
                        <input
                            type={"password"}
                            className={"rounded-md border border-gray-700 pl-2 h-8"}
                            name={"password"}
                            onChange={handleFormChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div className={"flex justify-between w-56 mt-5"}>
                        <button
                            className={"w-24 h-8 rounded bg-gray-700 hover:bg-gray-800 text-gray-50 disabled:bg-gray-400 disabled:cursor-not-allowed"}
                            type={"submit"}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        <button
                            className={"w-24 h-8 rounded bg-gray-700 hover:bg-gray-800 text-gray-50 disabled:bg-gray-400"}
                            onClick={toogleModalVisibility}
                            disabled={isLoading}
                            type="button"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
       
    )
}