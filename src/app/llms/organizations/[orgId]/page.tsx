'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"

import TopNavbar from "@/app/llms/components/topNavbar"
import axiosCookieClient from "@/services/axiosCookieClient";
import { Organization } from "@/app/llms/organizations/types/organization";


const emptyOrganization = {
  id: '',
  name: '',
  created_at: '',
  updated_at: '',
  owner: '',
  admins: [],
  members: []
} 

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [modalStyle, setModalStyle] = useState();
  const [organization, setOrganization] = useState<Organization>(emptyOrganization);

  async function fetchOrganization(){
    const response = await axiosCookieClient.get(`/api/v1/organizations/${params.orgId}`)
    const _organization = await response.data
    setOrganization(_organization)
  }

  useEffect(() => {
    fetchOrganization();
  }, [])
  
  return (
    <div className={"w-full h-screen flex flex-col items-center"}>
        <div className={"w-full h-12 flex bg-gray-700 sticky top-0"}>
            <TopNavbar style={"h-12"}/>
        </div>
        <div className={"w-5/6 flex flex-col flex-1 items-center"}>
            <div className={"h-24 flex justify-center items-center text-5xl my-5"}>
                { organization!.name }
            </div>            
            <div>
              <div>
                <div>Id</div>
                <div>{organization.id}</div>
              </div>
              <div>
                <div>Name</div>
                <div>{organization.name}</div>
              </div>
              <div>
                <div>Creation Date</div>
                <div>{organization.created_at}</div>
              </div>
              <div>
                <div>Last update</div>
                <div>{organization.updated_at}</div>
              </div>
            </div>
            <div className="flex mt-5 justify-between">
              <button className="w-24 h-8 flex justify-center items-center mx-2 bg-gray-700 text-gray-100 rounded-sm hover:cursor-pointer" onClick={() => router.push(`/llms/organizations/${organization.id}/files`)}>Files</button>
              <button className="w-24 h-8 flex justify-center items-center mx-2 bg-gray-700 text-gray-100 rounded-sm hover:cursor-pointer" onClick={() => router.push(`/llms/organizations/${organization.id}/projects`)}>Projects</button>
              <button className="w-24 h-8 flex justify-center items-center mx-2 bg-gray-700 text-gray-100 rounded-sm hover:cursor-pointer">Members</button>
            </div>
        </div>            
    </div>
  )
}