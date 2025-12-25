'use client'

import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation"
import Image from 'next/image';

import TopNavbar from "@/app/llms/components/topNavbar"
import axiosCookieClient from "@/services/axiosCookieClient";
import {File} from '@/app/llms/organizations/types/file'
import {Project} from "@/app/llms/organizations/types/project";
import {ProjectCard} from "@/app/llms/organizations/components/projectCard";
import { Organization } from "@/app/llms/organizations/types/organization";
import closeButtonSvg from '../../../../../../public/llms/x-circle-fill.svg'

const emptyOrganization = {
  id: '',
  name: '',
  created_at: '',
  updated_at: '',
  owner: '',
  admins: [],
  members: []
} 

export default function OrganizationProjectsPage() {
    const params = useParams(); 
    const [modalStyle, setModalStyle] = useState();
    const [organization, setOrganization] = useState<Organization>(emptyOrganization);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    function toggleModalVisibility(){
      setIsModalOpen(!isModalOpen)
    }
    
    async function fetchOrganization(){
      const response = await axiosCookieClient.get(`/api/v1/organizations/${params.orgId}`)
      const _organization = await response.data
      setOrganization(_organization)
    }

    async function fetchProjects(){
      const response = await axiosCookieClient.get(`/api/v1/organizations/${params.orgId}/projects`)
      const data = await response.data
      setProjects(data)
    }

    async function deleteProject(projectId: string){
      const response = await axiosCookieClient.delete(`/api/v1/organizations/${params.orgId}/projects/${projectId}/`)
      if (response.status == 204){
        fetchProjects();
      }
    }

    useEffect(() => {
      fetchOrganization();
      fetchProjects();      
    }, [])

    return (
      <div className={"w-full h-screen flex flex-col items-center"}>
          <div className={"w-full h-12 flex bg-gray-700 sticky top-0"}>
              <TopNavbar style={"h-12"}/>
          </div>
          <ProjectCreateModal isModalOpen={isModalOpen} toggleModalVisibility={toggleModalVisibility} organizationId={String(params.orgId)} fetchProjects={fetchProjects}/>
          <div className={"w-5/6 flex flex-col flex-1 items-center"}>
              <div className={"h-24 flex justify-center items-center text-4xl"}>
                  { organization.name } projects
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="h-24 flex justify-center items-center">
                  <button className="w-32 h-12 bg-gray-700 text-gray-100 rounded-sm hover:cursor-pointer" onClick={toggleModalVisibility}>Create project</button>
                </div>
                <ul className="w-full grid grid-cols-5 gap-2">
                  {projects.map(project => <li key={project!.id} className="w-full h-48 flex justify-center hover:cursor-pointer"><ProjectCard project={project} orgId={String(params.orgId)} deleteProject={deleteProject}/></li>)}
                </ul>
              </div>        
          </div>            
      </div>
    )
  }


type ProjectCreateModalProps = {
  isModalOpen: boolean
  toggleModalVisibility: Function
  organizationId: string
  fetchProjects: Function
  
}

type ProjectCreateFormData = {
  name: string
}

function ProjectCreateModal(props: ProjectCreateModalProps){
  const [projectCreteFormData, setProjectCreateFormData] = useState<ProjectCreateFormData>({name: ''});

  async function submitProjectCreateForm(event: React.ChangeEvent<HTMLInputElement>){
    event.preventDefault();
    const response = await axiosCookieClient.post(`/api/v1/organizations/${props.organizationId}/projects/`, projectCreteFormData)
    if (response.status == 201){
      props.fetchProjects();
      props.toggleModalVisibility();
    }
  }

  function onChangeInput(event: any){
    const formState = {...projectCreteFormData}
    formState[event.target.name as keyof ProjectCreateFormData] = event.target.value
    setProjectCreateFormData({...formState})
  }

  if (!props.isModalOpen) {
    return (
      <></>
    )
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[rgba(255,255,255,0.9)] absolute upper-0 left-0 z-1">
      <div className="w-86 h-86 flex flex-col items-center justify-between bg-gray-200 rounded-md z-2">
        <div className="w-full h-10 flex justify-between items-center px-1">
          <div className="w-78 flex justify-center font-bold">Create project</div>
          <button className="w-8 h-8 flex relative hover:cursor-pointer" onClick={() => props.toggleModalVisibility()}>
            <Image className="object-contain" src={closeButtonSvg} alt="close button" fill></Image>
          </button>
        </div>
        <div className="w-76 h-66 flex justify-center pt-6">
          <form id="project-create-form" onSubmit={event => submitProjectCreateForm(event)}>
            <div>
              <div>
                <div>Name</div>
                <input className="rounded-sm bg-gray-100 px-1" type="text" name="name" onChange={onChangeInput}></input>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full h-10 flex justify-around">
          <button className="w-24 h-8 rounded-sm bg-gray-700 text-gray-100" form="project-create-form" type="submit">Create</button>
        </div>
      </div>
    </div>
  )
}