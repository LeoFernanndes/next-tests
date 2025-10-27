import Image from 'next/image'
import calendarSvg from '../../../../../public/calendar.svg'
import relogioSvg from '../../../../../public/relogio.svg'


export type BlogPostType = {
    "title": string,
    "author": string,
    "date": string,
    "category": string,
    "tags": string[],
    "summary": string,
    "content": string,
    "read_time": number,
    "image": string
}


export default function BlogPost(postData: BlogPostType){

    return (
        <div className="w-full h-full flex border border-gray-100 hover:border-gray-700 duration-200 rounded-md">
            <div className="w-full h-full flex flex-col items-center">
                <div className="h-2/12 flex justify-center items-center mx-5 mt-5 pb-2 text-center text-gray-700 font-semibold">{postData.title}</div>
                <div className="w-5/6 h-4/12 flex justify-center items-center overflow-hidden rounded-lg">
                    <img className="w-full h-full object-cover" src={postData.image}></img>
                </div>
                <div className="h-3/12 flex justify-center items-center px-4 pt-2">{postData.summary}</div>
                <div className="w-3/4 h-2/12 flex justify-around items-center">
                    <div className="w-2/5 flex items-center justify-around text-center"><Image src={calendarSvg} alt="relogio logo" width={24} height={12}/> {postData.date}</div>
                    <div className="w-1/5 flex items-center text-center"><Image src={relogioSvg} alt="relogio logo" width={24} height={12}/>{postData.read_time}<span>min.</span></div>
                </div>
            </div>
        </div>
    )

}