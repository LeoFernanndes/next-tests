'use client'

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/banking/services/axiosClient';
import TopNavbar from "@/app/banking/components/topNavbar";


interface LoginPayloadType {
    username: string;
    password: string;
}

export default function login(){
    const [loginPayload, setLoginPayload] = useState<LoginPayloadType>({username: '', password: ''});
    const [isOpen, setIsOpen] = useState(false);
    const [loginErrors, setLoginErrors] = useState(null);

    const router = useRouter();

    const toggleMenuState = () => {
        setIsOpen(!isOpen)
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginErrors(null)

        api.post('/api/v1/users/auth/login/', loginPayload).then(
            response => {
                console.log(response.data.user)
                router.push('/banking')
            }
        ).catch(
            error => {
                console.log(error)
                setLoginErrors(error.response.data.error)
            })
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currentLoginPayload = loginPayload
        currentLoginPayload[event.target.name as keyof typeof currentLoginPayload] = event.target.value
        setLoginPayload(currentLoginPayload)
        console.log(loginPayload)
    }

    return (
        <div className="w-full h-screen flex flex-col items-center bg-gray-100">
            <TopNavbar isOpen={isOpen} toggleMenu={toggleMenuState}/>
            <div className="flex justify-center">
                <form className="w-120 flex flex-col items-center mt-30" onSubmit={e => submit(e)}>
                    <div className="h-24 flex flex-col items-center">
                        <span className="text-xl text-gray-700">Username</span>
                        <input className="h-8 bg-white rounded-md mt-2 text-center" type="text" name="username" onChange={event => handleFormChange(event)}></input>
                    </div>
                    <div className="h-24 flex flex-col items-center">
                        <span className="text-xl text-gray-700">Password</span>
                        <input className="h-8 bg-white rounded-md mt-2 text-center" type="password" name="password" onChange={event => handleFormChange(event)}></input>
                    </div>
                    {loginErrors ? <div className="h-12 flex justify-center items-start text-red-500 font-semibold"><span>{loginErrors}</span></div> : null}
                    <div className="w-72 flex justify-center">
                        <button className="w-32 rounded bg-gray-700 text-gray-100 hover:cursor-pointer hover:bg-gray-600 duration-100 p-2">Login</button>
                    </div>
                    <div className="mt-5">
                        <a href="">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}