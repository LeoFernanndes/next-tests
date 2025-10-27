'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import axiosCookieClient from "@/services/axiosCookieClient"
import {User} from "../types"


const initialUser = {
    "id": "",
    "last_login": "",
    "username": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "is_active": true,
    "date_joined": ""
}

export default function userDetail(){
    
    const router = useRouter();
    const params = useParams();
    const [user, setUser] = useState<User>(initialUser);
    
    useEffect(() => {
        async function fetchUser(){
            const response = await axiosCookieClient.get(`/api/v1/users/${params['userId']}`)
            const _user = await response.data
            setUser(_user)
        }
        fetchUser();
    }, [])
    
    return (
        <div className={"w-full h-dvh flex flex-col"}>
            <div className={"w-full h-12 flex justify-between bg-gray-700"}>
                <div className={"flex"}>
                    <div className={"w-32 flex justify-center items-center rounded-md text-gray-100 hover:bg-gray-800"}>Home</div>
                    <div className={"w-32 flex justify-center items-center rounded-md text-gray-100 hover:bg-gray-800"}>Organizatons</div>
                </div>
                <div className={"flex"}>
                    <div className={"w-32 flex justify-center items-center rounded-md text-gray-100 hover:bg-gray-800"} onClick={()=> router.push('/users')}>Back</div>
                </div>
            </div>
            <div className={"w-full flex flex-col flex-1 bg-gray-50 items-center"}>
                <div className={"flex flex-col mt-16"}>
                    <div className={"flex flex-col mt-6"}>
                        <div>Username</div>
                        <div>{user.username}</div>
                    </div>
                    <div className={"flex flex-col mt-6"}>
                        <div>First Name</div>
                        <div>{user.first_name}</div>
                    </div>
                    <div className={"flex flex-col mt-6"}>
                        <div>Last Name</div>
                        <div>{user.last_name}</div>
                    </div>
                    <div className={"flex flex-col mt-6"}>
                        <div>Email</div>
                        <div>{user.email}</div>
                    </div>
                    <div className={"flex flex-col mt-6"}>
                        <div>Active</div>
                        <div>{user.is_active}</div>
                    </div>
                    <div className={"flex flex-col mt-6"}>
                        <div>Joined</div>
                        <div>{user.date_joined}</div>
                    </div>
                    <div className={"flex flex-col mt-6"}>
                        <div>Last Login</div>
                        <div>{user.last_login}</div>
                    </div>
                    <div className={"flex"}>
                        <button>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
