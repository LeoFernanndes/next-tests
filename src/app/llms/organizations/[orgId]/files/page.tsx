'use client'

import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation"

import TopNavbar from "@/app/llms/components/topNavbar"
import axiosCookieClient from "@/services/axiosCookieClient";
import {File} from '@/app/llms/organizations/types/file'
import {FileCard} from "@/app/llms/organizations/components/fileCard";
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

export default function OrganizationFilesPage() {
    const params = useParams(); 
    const [modalStyle, setModalStyle] = useState();
    const [organization, setOrganization] = useState<Organization>(emptyOrganization);
    const [files, setFiles] = useState<File[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    function toogleModalVisibility(){
      setIsModalOpen(!isModalOpen)
    }
    
    async function deleteFile(file_id: string){
      const response = axiosCookieClient.delete(`api/v1/organizations/${params.orgId}/files/${file_id}/`)
      fetchFiles()
    }

    async function fetchOrganization(){
      const response = await axiosCookieClient.get(`/api/v1/organizations/${params.orgId}`)
      const _organization = await response.data
      setOrganization(_organization)
    }

    async function fetchFiles(){
      const response = await axiosCookieClient.get(`/api/v1/organizations/${params.orgId}/files`)
      const data = await response.data
      setFiles(data)
    }

    useEffect(() => {
      fetchOrganization();
      fetchFiles();      
    }, [])

    return (
      <div className={"w-full h-screen flex flex-col items-center"}>
          <div className={"w-full h-12 flex bg-gray-700 sticky top-0"}>
              <TopNavbar style={"h-12"}/>
          </div>
          <div className={"w-5/6 flex flex-col flex-1 items-center"}>
              <div className={"h-24 flex justify-center items-center text-4xl"}>
                  { organization.name } files
              </div>
              <div className="w-full flex flex-col items-center">
                <ImageUploadModal isModalOpen={isModalOpen} toggleModalVisibility={toogleModalVisibility} orgId={String(params.orgId)} fetchFiles={fetchFiles}/>
                <div className="h-24 flex justify-center items-center">
                  <button className="w-32 h-12 bg-gray-700 text-gray-100 rounded-sm" onClick={toogleModalVisibility}>Upload file</button>
                </div>
                <ul className="w-full grid grid-cols-5 gap-2">
                  {files.map(file => <li key={file!.id} className="w-full h-48 flex justify-center hover:cursor-pointer"><FileCard file={file} orgId={String(params.orgId)} deleteFileFunction={deleteFile} /></li>)}
                </ul>
              </div>        
          </div>            
      </div>
    )
  }

type ImageUploadModalProps = {
    isModalOpen: boolean
    toggleModalVisibility: Function
    orgId: string,
    fetchFiles: Function
}

function ImageUploadModal(props: ImageUploadModalProps){
// TODO: criar uma sequencia de requisições para o upload de uma imagem de perfil
// 1. gerar um presegned url
// 2. fazer upload do arquivo na presigned url
// 3. fazer o post para criar o arquivo  na api contendo bucket e key
// 4. fazer o update do usuário com o id do arquivo da imagem 
// [ ] cuidado com o tratamento de erros no encadeamento de requisições 
  const [fileContent, setFileContent] = useState<File | null>();

  if (!props.isModalOpen){
    return <></>
  }

  async function submitFile(orgId){
    const urlResponse = await axiosCookieClient.post(`/api/v1/organizations/${orgId}/generate-file-upload-presigned-url`, {filename: fileContent!.name, mime_type: fileContent!.type}, {headers: {'Content-Type': 'application/json'}})
    if (urlResponse.status == 200){
      const presignedUrl = urlResponse.data['url']
      const fileId = urlResponse.data['file_id']

      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': fileContent!.type },
          body: fileContent,
        };
    
        const response = await fetch(presignedUrl, requestOptions);
        console.log(response)
        if (response.status == 200){
          props.toggleModalVisibility();
          props.fetchFiles();
        }
      } catch(e){
        console.log(e)
      }
    } else {
        console.log("Failed to get presigned url")
    }
  }

  function onChangeInput(event: ChangeEvent<HTMLInputElement>){
    setFileContent(event.target.files![0]);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[rgba(255,255,255,0.9)] absolute upper-0 left-0">
      <div className="w-86 h-86 flex justify-center bg-gray-200 rounded-md">
        <form className={"flex flex-col justify-around"} onSubmit={() => submitFile(props.orgId)}>
          <div className="flex justify-center">
            <input type={"file"} name="profile-image" onChange={e => onChangeInput(e)}></input>
          </div>                    
          <div className={"w-full flex justify-around"}>
            <button type={"button"} onClick={() => submitFile(props.orgId)}>select</button>
            <button onClick={e => props.toggleModalVisibility(e)}>Close</button>
          </div>
        </form>                   
      </div>
    </div>
  )
}