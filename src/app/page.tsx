'use client'

import { useRouter } from "next/navigation"



export default function NewHome() {

    const router = useRouter();

    return ( 
        <div className={"w-dvw h-screen flex flex-col justify-center items-center"}>
            <div>
                <div className="h-12 text-3xl text-gray-700 font-semibold">Select the application</div>
                <div className="flex flex-col items-center">
                    <span className="w-full h-8 flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-gray-200" onClick={() => router.push('/banking')}>Banking</span>
                    <span className="w-full h-8 flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-gray-200" onClick={() => router.push('/ecommerce')}>Ecommerce</span>
                    <span className="w-full h-8 flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-gray-200" onClick={() => router.push('/foodservices')}>Food services</span>
                    <span className="w-full h-8 flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-gray-200" onClick={() => router.push('/llms')}>Large Language Models</span>
                </div>
            </div>
        </div>
    )
}
