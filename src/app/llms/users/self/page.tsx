'use client'

import { useEffect, useState, } from "react";

import { User } from "../types";
import axiosCookieClient from "@/services/axiosCookieClient";
import TopNavbar from "@/app/llms/components/topNavbar";


type ApiFile = {
    id: string
    presigned_url: string
    filename: string
    filetype: string
    bucket: string
    location: string
}


type SelfUser = {
    id: string
    date_joined: string
    email: string
    first_name: string
    is_active: boolean
    last_login: string
    last_name: string
    username: string
    main_profile_image_url : string
}

type UserFormData = {
    first_name: string
    last_name: string
    main_profile_image_url : string
}

export default function UserSelf(){

    const nullUser = {
        id: '',
        date_joined: '',
        email: '',
        first_name: '',
        is_active: false,
        last_login: '',
        last_name: '',
        username: '',
        main_profile_image_url: 'placeholder'
    }

    const nullProfileImage = {
        id: 'string',
        presigned_url: 'string',
        filename: 'string',
        filetype: 'string',
        bucket: 'string',
        location: 'string'
    }


    const [ selfUser, setSelfUser ] = useState<SelfUser>(nullUser);
    const [ userProfileImage, setUserProfileImage ] = useState<ApiFile>(nullProfileImage);
    const [ formData, setFormData ] = useState<UserFormData>({first_name: '', last_name: '', main_profile_image_url: ''});
    const [ isModalOpen, setIsModalOpen ] = useState(false)

    async function fetchSelfUser(){
        const response = await axiosCookieClient.get('/api/v1/users/retrieve_self')
        const data = await response.data
        console.log(data)
        const user = {
            id: data.id,
            date_joined: data.date_joined,
            email: data.email,
            first_name: data.first_name,
            is_active: data.is_active,
            last_login: data.last_login,
            last_name: data.last_name,
            username: data.username,
            main_profile_image_url: data.main_profile_image_url
        }
        setSelfUser(user)
        
        const imageResponse = await axiosCookieClient.get(`/api/v1/files/${ user.main_profile_image_url }`)
        if (imageResponse.status == 200){
            const imageData = await imageResponse.data
            console.log(imageData)
            if (userProfileImage.presigned_url.split("?")[0] !== imageData.presigned_url.split("?")[0]){
                setUserProfileImage(imageData)
            }            
        }
        
        setFormData({first_name: user.first_name, last_name: user.last_name, main_profile_image_url: user.main_profile_image_url})

    }

    useEffect(() => {        
        fetchSelfUser()
    }, [userProfileImage])


    const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const state = {...formData}
        state[event.target.name as keyof UserFormData] = event.target.value
        setFormData({...state})
        console.log(state)
    }

    const submitForm = async (event: any) => {
        event.preventDefault();
        const response = await axiosCookieClient.post('/api/v1/users/update_self/', formData)
        const data = response.data
        console.log(data)
    }

    function toogleModalVisibility(){
        setIsModalOpen(!isModalOpen)
    }


    return (        
        <div className={"w-full min-h-screen flex flex-col bg-gray-100"}>
            <div className={"flex h-12 sticky top-0"}>
                <TopNavbar />
            </div>
            <ImageUploadModal isModalOpen={isModalOpen} toggleModalVisibility={toogleModalVisibility} selfUser={selfUser} fetchSelfUser={fetchSelfUser}/>
            <div className={"w-full flex flex-col flex-1 items-center overflow-y-auto"}>
                <div className={"w-32 h-32 flex justify-center items-center overflow-hidden mt-10 mb-5 md:w-64 md:h-64 "}>
                    <img className={"h-full  rounded-lg border border-gray-700"} alt="user profile image" src={userProfileImage.presigned_url ? userProfileImage.presigned_url : "placeholder"}></img>
                </div>
                <form className={"flex flex-col items-center"} onSubmit={submitForm}>
                    <div className={"flex flex-col items-center mt-2"}>
                        <div className={"text-gray-700 font-bold"}>Username</div>
                        <div>{selfUser.username}</div>
                    </div>
                    <div className={"flex flex-col items-center mt-2"}>
                        <div className={"text-gray-700 font-bold"}>First Name</div>
                        <input className={"text-center rounded-md border border-gray-300"} defaultValue={selfUser.first_name} name={"first_name"} onChange={updateForm}></input>
                    </div>
                    <div className={"flex flex-col items-center mt-2"}>
                        <div className={"text-gray-700 font-bold"}>Last Name</div>
                        <input className={"text-center rounded-md border border-gray-300"} defaultValue={selfUser.last_name} name={"last_name"} onChange={updateForm}></input>
                    </div>
                    <div className={"flex flex-col items-center mt-2"}>
                        <div className={"text-gray-700 font-bold"}>Email</div>
                        <div>{selfUser.email}</div>
                    </div>
                    <div className={"flex flex-col items-center mt-2"}>
                        <div className={"text-gray-700 font-bold"}>Active</div>
                        <div>{selfUser.is_active ? "true" : "false" }</div>
                    </div>
                    <div className={"flex flex-col items-center mt-2"}>
                        <div className={"text-gray-700 font-bold"}>Last Login</div>
                        <div>{selfUser.last_login ? selfUser.last_login : "Null"}</div>
                    </div>
                    <div className={"flex flex-col items-center mt-2"}>
                        <div className={"text-gray-700 font-bold"}>Date Joined</div>
                        <div>{selfUser.date_joined}</div>
                    </div>
                    <div className={"w-48 h-24 flex flex-col justify-around items-center mt-5 mb-15 md:w-142 md:h-12 md:flex-row md:justify-between md:mb-5"}>
                        <button className={"w-42 rounded-md bg-gray-700 hover:bg-gray-800 text-gray-100"}>Update</button>
                        <button className={"w-42 rounded-md bg-gray-700 hover:bg-gray-800 text-gray-100"} type={"button"}>Change Password</button>
                        <button className={"w-42 rounded-md bg-gray-700 hover:bg-gray-800 text-gray-100"} onClick={toogleModalVisibility}>Change Image</button>
                    </div>
                </form>               
            </div>            
        </div>
    )
}


type ImageUploadModalProps = {
    isModalOpen: boolean
    toggleModalVisibility: Function
    selfUser: SelfUser
    fetchSelfUser: Function
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

    async function submitImage(){
        const urlResponse = await axiosCookieClient.post('/api/v1/users/generate-upload-profile-image-presigned-url', {filename: fileContent!.name, content_type: fileContent!.type}, {headers: {'Content-Type': 'application/json'}})
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
                    const updateSelfUser = await axiosCookieClient.post('/api/v1/users/update_self/', {first_name: props.selfUser.username, last_name: props.selfUser.last_name, main_profile_image_url: fileId}, {headers: {'Content-Type': 'application/json'}})
                    await props.fetchSelfUser()
                    props.toggleModalVisibility()
                }
            } catch(e){
                console.log(e)
            }
        } else {
            console.log("Failed to get presigned url")
        }
    }

    function onChangeInput(event){
        setFileContent(event.target.files[0]);
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[rgba(255,255,255,0.9)] absolute upper-0 left-0">
            <div className="w-86 h-86 flex justify-center bg-gray-200 rounded-md">
                <form className={"flex flex-col justify-around"} onSubmit={submitImage}>
                    <div className="flex justify-center">
                        <input type={"file"} name="profile-image" onChange={onChangeInput}></input>
                    </div>                    
                    <div className={"w-full flex justify-around"}>
                        <button type={"button"} onClick={submitImage}>select</button>
                        <button onClick={props.toggleModalVisibility}>Close</button>
                    </div>
                </form>                   
            </div>
        </div>
    )
}