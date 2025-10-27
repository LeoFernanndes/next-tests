import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, MouseEventHandler, useEffect, useState } from "react";
import axiosCookieClient from "@/services/axiosCookieClient";


type RegisterModalProps = {
    isOpen: boolean
    toogleModalVisibility: any
}

type RegisterFormData = {
    email: string
    first_name: string
    last_name: string
    username: string
    password: string
    main_profile_image_url: string
}


export default function RegisterModal(props: RegisterModalProps) {

    const [registerFormData, setRegisterFormData] = useState({email: '', first_name: '', last_name: '', username: '', password: '', main_profile_image_url: ''})

    const router = useRouter();

    if (!props.isOpen){
        return null
    }

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentState = {...registerFormData}
        currentState[event.target.name as keyof RegisterFormData] = event.target.value 
        setRegisterFormData({...currentState})
    }

    function submitRegisterForm(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(registerFormData)
        axiosCookieClient.post('/api/v1/users/', registerFormData, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            if(response.status == 201){
                setRegisterFormData({email: '', first_name: '', last_name: '', username: '', password: '', main_profile_image_url: ''})
                alert("Successfully created user!")
                props.toogleModalVisibility()
            }
        })
        .catch(error => {
            console.log(error)
            alert("Failed to create user")
        })
    }

    return (
        <div className={"w-screen h-screen flex justify-center items-center backdrop-opacity-10 absolute upper-0 left-0"}>
            <div className={"w-96 h-132 flex justify-center items-center bg-gray-200 rounded-lg z-10001"}>
                <form className={"h-120 flex flex-col justify-between items-center text-center"} onSubmit={submitRegisterForm}>
                    <div className={"mb-5"}>
                        <h1>Email</h1>
                        <input className={"w-64 h-8 bg-gray-50 rounded-md"} name="email" onChange={handleFormChange}></input>
                    </div>
                    <div className={"mb-5"}>
                        <h1>First Name</h1>
                        <input className={"w-64 h-8 bg-gray-50 rounded-md"} name="first_name" onChange={handleFormChange}></input>
                    </div>
                    <div className={"mb-5"}>
                        <h1>Last Name</h1>
                        <input className={"w-64 h-8 bg-gray-50 rounded-md"} name="last_name" onChange={handleFormChange}></input>
                    </div>
                    <div className={"mb-5"}>
                        <h1>Username</h1>
                        <input className={"w-64 h-8 bg-gray-50 rounded-md"} name="username" onChange={handleFormChange}></input>
                    </div>
                    <div className={"mb-5"}>
                        <h1>Password</h1>
                        <input className={"w-64 h-8 bg-gray-50 rounded-md"} name="password" type="password" onChange={handleFormChange}></input>
                    </div>
                    <div className={"mb-5"}>
                        <h1>Profile Image Url</h1>
                        <input className={"w-64 h-8 bg-gray-50 rounded-md"} name="main_profile_image_url" onChange={handleFormChange}></input>
                    </div>
                    <div className="w-64 flex justify-between">
                        <button className={"w-24 h-8 bg-gray-700 text-gray-100 rounded-md"} type={"submit"}>Submit</button>
                        <button className={"w-24 h-8 bg-gray-700 text-gray-100 rounded-md"} type={"button"} onClick={props.toogleModalVisibility}>Close</button>
                    </div>
                </form>
            </div>
        </div>

    )
}