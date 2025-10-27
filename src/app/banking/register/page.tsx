'use client'

import { useState } from 'react'
import TopNavbar from "@/app/banking/components/topNavbar"


export default function login(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuState = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="w-full h-screen flex flex-col items-center bg-gray-100">
            <TopNavbar isOpen={isOpen} toggleMenu={toggleMenuState}/>
            <div className="flex justify-center">
                <form className="w-120 flex flex-col items-center mt-30">
                    <div className="h-24 flex flex-col items-center">
                        <span className="text-xl text-gray-700">Username</span>
                        <input className="h-8 bg-white rounded-md mt-2 text-center " type="text"></input>
                    </div>
                    <div className="h-24 flex flex-col items-center">
                        <span className="text-xl text-gray-700">First Name</span>
                        <input className="h-8 bg-white rounded-md mt-2 text-center " type="password"></input>
                    </div>
                    <div className="h-24 flex flex-col items-center">
                        <span className="text-xl text-gray-700">Last Name</span>
                        <input className="h-8 bg-white rounded-md mt-2 text-center " type="password"></input>
                    </div>
                    <div className="h-24 flex flex-col items-center">
                        <span className="text-xl text-gray-700">Email</span>
                        <input className="h-8 bg-white rounded-md mt-2 text-center " type="password"></input>
                    </div>
                    <div className="h-24 flex flex-col items-center">
                        <span className="text-xl text-gray-700">Password</span>
                        <input className="h-8 bg-white rounded-md mt-2 text-center " type="password"></input>
                    </div>
                    <div className="w-72 flex justify-center">
                        <button className="w-32 rounded bg-gray-700 text-gray-100 hover:cursor-pointer hover:bg-gray-600 duration-100 p-2">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}