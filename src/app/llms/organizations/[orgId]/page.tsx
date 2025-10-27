'use client'

import { useState } from "react";
import { useParams } from "next/navigation"

import TopNavbar from "@/app/llms/components/topNavbar"


export default function BlogPostPage() {
    const params = useParams(); 
    const [modalStyle, setModalStyle] = useState();
    
    return (
      <div className={"w-full h-screen flex flex-col items-center"}>
          <div className={"w-full h-12 flex bg-gray-700 sticky top-0"}>
              <TopNavbar style={"h-12"}/>
          </div>
          <div className={"w-5/6 flex flex-col flex-1 items-center"}>
              <div className={"h-32 flex justify-center items-center text-5xl my-5"}>
                  { params.orgId }
              </div>        
          </div>            
      </div>
    )
  }