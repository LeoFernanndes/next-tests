'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import BlogPost, { BlogPostType } from './components/blogCard';
import TopNavbar from './components/topNavbar';
import eagleSvg from '../../../public/eagle.svg'
import bankSvg from '../../../public/bank.svg'
import bankingPosts from './bankingPosts.json'


export default function banking(){
    const [isOpen, setIsOpen] = useState(false);
    const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([])
    const router = useRouter();

    useEffect(() => {
        setBlogPosts(bankingPosts)
        console.log(bankingPosts)
    }, [])
 
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="w-full flex flex-col items-center pb-15 bg-gray-100">
            <div className="w-full flex flex-col items-center">
                               
                <TopNavbar isOpen={isOpen} toggleMenu={toggleMenu} />

                <div className="w-full flex">
                    <div className="w-full">
                        <img className="z-0 object-contain" src="https://www.itau.com.br/media/dam/m/1535ae8afad76903/original/Reneg_Rotativo_desktop_1920x540px.png"></img>
                    </div>                    
                    <div className="h-48 absolute z-10 left-5 top-20 xl:left-48 xl:top-48 flex flex-col justify-between">
                        <div>
                            <div className="text-2xl text-gray-200">Voted the best investment bank</div>
                            <div className="text-2xl text-gray-200">for young entrepeneurs.</div>
                        </div>
                        <div>
                            <span className="text-5xl text-gray-200 font-semibold hidden md:block">Create your account!</span>
                        </div>
                    </div>
                </div>                
            </div>
            <div className="w-full xl:w-300 md:w-200 flex flex-col">
                <div className="w-full flex justify-center">
                    <span className="h-16 flex items-center text-gray-800 text-3xl font-semibold m-2">Blog</span>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-12 gap-4 place-items-center">
                        { blogPosts.map((b, i) => {
                            return(   
                                <div className="w-full h-108 col-span-12 md:col-span-6 xl:col-span-4" key={i} onClick={() => router.push(`/banking/posts/${i}`)}>
                                    <BlogPost {...b} />  
                                </div>                                                 
                            )                            
                        }) }
                    </div>
                </div>
            </div>
        </div>
    )
}