'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import axiosClient from "../../services/axiosClient"
import axiosCookieClient from '@/services/axiosCookieClient'
import TopNavbar from "@/app/llms/components/topNavbar"


interface Organization {
    id: string,
    name: string,
    created_at: string,
    updated_at: string,
    owner: string,
    admins: string[],
    members: string[]
}


export default function Main() {

    const router = useRouter();
    const [data, setData] = useState<Organization[]>([]);

    return ( 
        <div className={"w-dvw h-screen flex flex-col"}>
            <div className={"flex"}>
                < TopNavbar style="h-12" />
            </div>
            <div className={"flex flex-1 justify-center bg-gray-100"}>
                Test
            </div>
        </div>
    )
}
