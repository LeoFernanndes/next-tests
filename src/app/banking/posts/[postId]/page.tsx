'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"

import { BlogPostType } from "../../components/blogCard";
import TopNavbar from "@/app/banking/components/topNavbar";
import bankingPosts from '@/app/banking/bankingPosts.json'


const initialCard = {
  "title": "",
  "author": "",
  "date": "",
  "category": "",
  "tags": [],
  "summary": "",
  "content": "",
  "read_time": 0,
  "image": ""
}


export default function BlogPostPage() {
    const params = useParams(); 
    const [ post, setPost ] = useState<BlogPostType>(initialCard);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setPost(bankingPosts[Number(params.postId)])
      console.log(bankingPosts[Number(params.postId)])
    }, [])

    const toggleMenu = () => setIsOpen(!isOpen);
    
    return (
      <div className={"flex flex-col items-center pb-15"}>
        <TopNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
        
        <div className="w-full xl:w-300">
          <div className="xl:h-100 mt-10">
            <img className="w-full h-full object-cover" src={post.image == "" ? undefined : post.image}></img>
          </div>
          <div className="xl:h-16 flex justify-center items-center xl:text-3xl text-gray-700">
            {post.title}
          </div>
          <div className="flex justify-center">
            {post.summary}
          </div>
          <div className="flex my-5">
            {post.content}
          </div>
        </div>
      </div>
    )
  }