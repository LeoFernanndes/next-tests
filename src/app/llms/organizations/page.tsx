'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import axiosCookieClient from "@/services/axiosCookieClient"
import TopNavbar from "@/app/llms/components/topNavbar"


export default function organizations() {

    const router = useRouter();
    const [organizations, setOrganizations] = useState([])

    useEffect(() => {
        async function fetchOrganizations(){
            const organizationssResponse = await axiosCookieClient.get('/api/v1/organizations')
            const result = await organizationssResponse.data
            console.log(result)
            setOrganizations(result);
        }
        fetchOrganizations();
    }, [])

    const openUserDetail = (userId: string) => {
        const url = `/llms/organizations/${userId}`
        router.push(url)
    }

    return (
        <div className={"w-full h-screen flex flex-col items-center"}>
            <div className={"w-full h-12 flex bg-gray-700 sticky top-0"}>
                <TopNavbar style={"h-12"}/>
            </div>
            <div className={"w-5/6 flex flex-col flex-1 items-center"}>
                <div className={"h-32 flex justify-center items-center text-5xl my-5"}>
                    Organizations
                </div>
                <div className={"flex justify-center"}>
                    <div className={"grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                        { organizations.map((user, index) => {
                            return organizationCard(user, openUserDetail)
                        })}
                    </div>
                </div>              
            </div>            
        </div>
    )
}

const organizationCard = (organization: any, openOrganizationDetail: Function) => {

    return (
        <div key={organization.id} className={"w-58 h-64 flex flex-col items-center rounded-md border border-gray-700 cursor-pointer"}
        onClick={() => openOrganizationDetail(organization.id)}
        >
            <div>Name</div>
            <div>{organization.name}</div>

        </div>
    )
}