import React from 'react';
import Link from "next/link";
import mainStore from "../stores";

const CapabilitiesComponent = ({data}) => {
    const item = data.acf;
    const url = item.image.url
    const {language} = mainStore()

    return (
        <div className="capabilities flex xl:flex-row md:flex-col sm:flex-col justify-between items-center">
            <div className="capabilitiesTexts pl-64 pr-40 md:pl-24 sm:px-16 sm:pr-8" style={{flexBasis: "50%"}}>
                <div className="capabilitiesTag text-black font-bold sm:text-base">
                    #{item.tag}
                </div>
                <div className="capabilitiesTitle text-3xl font-bold text-menuTextColor leading-8 my-8 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
                    {item.title}
                </div>
                <div className="capabilitiesBody mb-8 font-light text-lg sm:text-base">
                    {item.body}
                </div>
                <Link href={{pathname: `${data.slug}`, query: {lang: language}}}>
                    <a
                        className="bg-transparent hover:bg-menuTextColor text-black text-lg font-semibold hover:text-white py-2 px-4 border border-menuTextColor hover:border-transparent rounded">
                        {item.button_label}
                    </a>
                </Link>
            </div>
            <div className="capabilitiesImage w-full h-screen sm:hidden" style={{flexBasis: "50%"}}>
                <img className="object-cover h-full w-full" src={url}/>
            </div>
        </div>
    );
};

export default CapabilitiesComponent;