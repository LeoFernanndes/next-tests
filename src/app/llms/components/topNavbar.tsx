'use client'

import { MouseEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axiosCookieClient from '@/services/axiosCookieClient'


type Props = {
    style?: string
}

export default function TopNavbar(props: Props) {

    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {

        async function getSelfUser() {
            axiosCookieClient.get('api/v1/users/retrieve_self/')
            .then(selfUserResponse => {
                if (selfUserResponse.status == 200){
                    const selfUserResponseData = selfUserResponse.data;
                    if (!userData){
                        setUserData(selfUserResponse.data)
                    }
                    else if(userData && selfUserResponseData.id != userData!.id) {
                        setUserData(selfUserResponse.data)
                    }
                    else{
                        console.log(selfUserResponse.data)
                    }
                } else {
                    console.log(selfUserResponse)
                }
            })
            .catch(error => {
                console.log('unauthentiucated')
            })
            
        }
        getSelfUser();
    }, [userData])

    function navigate(url: string){
        router.push(url)
    }

    function logout() {
        axiosCookieClient.post('/api/v1/users/auth/logout/', {})
        .then(logoutResponse => {
            if (logoutResponse.status == 200) {
                router.push('/')
            } else{
                console.log('failed to logout user')
            }
        })
        .catch(error => {
            console.log('failed lo logout user')
        })           
    }


    if (userData){
        return (
            <AuthenticatedTopNavbar style={props.style} navigate={navigate} logout={logout} />
        )
    } else {
        return (
            <UnAuthenticatedTopNavbar style={props.style} navigate={navigate} />
        )
    }

    
}



type AuthenticatedTopNavbarProps = {    
    style?: string
    navigate: Function
    logout: MouseEventHandler
}

function AuthenticatedTopNavbar(props: AuthenticatedTopNavbarProps) {
    
    const [showMenu, setShowMenu] = useState(false)
    const [userProfileImageUrl, setUserProfileImageUrl] = useState('pĺaceholder')

    useEffect(() => {
        async function fetchUserProfileImage(){
            try {
                const userDataResponse = await axiosCookieClient.get('/api/v1/users/retrieve_self/');
                const userData = userDataResponse.data;
                const userProfileResponse = await axiosCookieClient.get(`/api/v1/files/${ userData.main_profile_image_url }`);
                if (userProfileResponse.status == 200){
                    const userProfileImage = await userProfileResponse.data;
                    setUserProfileImageUrl(userProfileImage.presigned_url);
                }
            } catch(error) {
                console.log(error);
            }

        }
        fetchUserProfileImage();
    }, [])

    function toogleShowMenu(){
        setShowMenu(!showMenu)
    }
    
    return (
        <div className={`${props.style} w-dvw flex justify-between bg-gray-700 text-gray-100`}>
            <div className={"w-36 flex justify-evenly"}>
                <div className={"w-32 flex justify-center items-center rounded-md hover:bg-gray-800 cursor-pointer"} onClick={() => props.navigate('/llms')}>Home</div>
            </div>
            <div className={"flex justify-evenly"}>
                <div className={"w-24 flex justify-center items-center"} onClick={toogleShowMenu}>
                    <img className={"h-10 rounded-full cursor-pointer"} src={userProfileImageUrl ? userProfileImageUrl : "https://avatar.iran.liara.run/public/7"}></img>
                </div>
                {showMenu ? 
                    <div className={"w-48 bg-gray-600 absolute top-12 right-0"}>
                        <div className={"h-12 flex justify-center items-center bg-gray-600 rounded-md hover:bg-gray-800 cursor-pointer"} onClick={() => props.navigate('/llms/organizations')}>Organizations</div>
                        <div className={"h-12 flex justify-center items-center bg-gray-600 rounded-md hover:bg-gray-800 cursor-pointer"} onClick={() => props.navigate('/llms/users/self')}>Profile</div>
                        <div className={"h-12 flex justify-center items-center bg-gray-600 rounded-md hover:bg-gray-800 cursor-pointer"} onClick={props.logout}>Logout</div>
                    </div>:
                    <></>  
                }
            </div>
        </div>
    )
}


type UnAuthenticatedTopNavbarProps = {    
    style?: string
    navigate: Function
}

function UnAuthenticatedTopNavbar(props: UnAuthenticatedTopNavbarProps) {
    return (
        <div className={`${props.style} w-dvw flex justify-between bg-gray-700 text-gray-100`}>
            <div className={"w-36 flex justify-evenly"}>
                <div className={"w-32 flex justify-center items-center rounded-md hover:bg-gray-800 cursor-pointer"} onClick={() => props.navigate('/')}>Home</div>
            </div>
            <div className={"w-48 flex justify-evenly"}>
                <div className={"w-32 flex justify-center items-center rounded-md hover:bg-gray-800 cursor-pointer"} onClick={() => props.navigate('/llms/login')}>Login</div>
            </div>
        </div>
    )
}

