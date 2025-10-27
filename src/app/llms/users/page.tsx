'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import axiosCookieClient from "@/services/axiosCookieClient"
import TopNavbar from "@/app/llms/components/topNavbar"
import { User } from "./types" 


export default function users() {

    const router = useRouter();
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers(){
            const usersResponse = await axiosCookieClient.get('/api/v1/users/')
            const result = await usersResponse.data
            console.log(result)
            setUsers(result.results);
        }
        fetchUsers();
    }, [])

    const openUserDetail = (userId: string) => {
        const url = `/users/${userId}`
        router.push(url)
    }

    return (
        <div className={"w-full h-screen flex flex-col items-center"}>
            <div className={"w-full h-12 flex bg-gray-700 sticky top-0"}>
                <TopNavbar style={"h-12"}/>
            </div>
            <div className={"w-5/6 flex flex-col flex-1 justify-center"}>
                <div className={"h-32 flex justify-center items-center text-5xl my-5"}>
                    Users
                </div>
                <div className={"flex justify-center"}>
                    <div className={"grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                        { users.map((user, index) => {
                            return userCard(user, openUserDetail)
                        })}
                    </div>
                </div>              
            </div>            
        </div>
    )
}

const userCard = (user: User, openUserdetail: Function) => {

    return (
        <div key={user.id} className={"w-58 h-64 flex flex-col items-center rounded-md border border-gray-700 cursor-pointer"}
        onClick={() => openUserdetail(user.id)}
        >
            <div>{user.first_name}</div>
            <div>{user.email}</div>
        </div>
    )
}