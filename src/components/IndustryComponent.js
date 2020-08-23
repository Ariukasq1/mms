import React from 'react';
import mainStore from "../stores";
import Link from "next/link";

const IndustryComponent = ({data}) => {
    const item = data.acf;
    const url = item.image.url
    const {language} = mainStore()

    return (
        <div className="industry flex flex-row justify-between items-center sm:flex-col">
            <div className="industryTexts pl-64 pr-40 xl:pl-24 lg:pr-12 lg:pl-24 sm:px-16 sm:pr-8 md:pl-24 md:pr-4" style={{flexBasis: "50%"}}>
                <div className="industryTag text-black font-bold sm:text-base">
                    #{data.slug}
                </div>
                <div className="industryTitle text-6xl font-bold text-menuTextColor break-words leading-tight my-8 sm:text-3xl sm:my-2 md:text-5xl">
                    {item.title}
                </div>
                <Link href={{pathname: `${data.slug}`, query: {lang: language}}}>
                    <a
                        className="bg-transparent hover:bg-menuTextColor text-black text-sm font-semibold hover:text-white py-2 px-4 border border-menuTextColor hover:border-transparent rounded">
                        {item.button_label}
                    </a>
                </Link>
            </div>
            <div className="capabilitiesImage  md:pr-8" style={{flexBasis: "50%"}}>
                <img className="object-cover mb-24 xl:mb-12  sm:w-48 sm:m-auto sm:my-8 lg:w-3/4 lg:mb-12 xl:w-5/6" src={url}/>
                <div className="text-base w-2/3 sm:w-full sm:px-16 sm:pr-8 md:w-full lg:w-3/4 xl:w-5/6">{item.body}</div>
            </div>
        </div>
    );
};

export default IndustryComponent;