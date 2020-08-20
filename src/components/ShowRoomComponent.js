import React from 'react';
import arrowImage from '../public/images/arrow.png'
import mainStore from "../stores";
import Link from "next/link";

const ShowRoomComponent = ({data}) => {
    const item = data.acf;
    const url = item.image.url
    const {language} = mainStore()

    return (
        <div className="showRoom ml-24 flex flex-row-reverse justify-start items-center">
            <div className="showRoomTexts  pr-40 sm:px-16 sm:pr-8" style={{flexBasis: "50%"}}>
                <div className="ml-20 showRoomTag text-black font-bold sm:ml-0 sm:text-base">
                    #{item.tag}
                </div>
                <div className="ml-20 showRoomTitle text-3xl font-bold text-black leading-8 my-8 break-words sm:ml-0 sm:my-4">
                    {item.title}
                </div>
                <div className="ml-20 showRoomBody mb-8 text-black font-light text-lg sm:ml-0">
                    {item.body}
                </div>
                <Link href={{pathname: `${data.slug}`, query: {lang: language}}}>
                    <a
                        className="ml-20 w-auto bg-transparent text-black text-base lowercase hover:text-menuTextColor flex flex-row sm:ml-0">
                        {item.button_label}
                        <img className="object-contain ml-4" src={arrowImage}/>
                    </a>
                </Link>
                <div className="showRoomChildren flex flex-row ml-0 mt-20">
                    {item.sub_categories.map((category, index) => (
                        <div className="flex flex-col justify-between items-start text-white w-40 h-40" key={index}
                             style={{background: category.color}}>
                            <span className="p-5 leading-4 text-base font-semibold">{category.tag}</span>
                            <span className="p-5 text-xs font-light text-gray-300">#{item.tag}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="showRoomImage w-1/2 w-full h-screen sm:hidden" style={{flexBasis: "50%"}}>
                <img className="object-cover h-full w-full" src={url}/>
            </div>
        </div>
    );
};

export default ShowRoomComponent;