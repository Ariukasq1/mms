import React from 'react';

const CapabilitiesComponent = ({data}) => {
    const item = data.acf;
    const url = item.image.url
    return (
        <div className="capabilities flex flex-row justify-between items-center">
            <div className="capabilitiesTexts pl-64 pr-40 " style={{flexBasis: "50%"}}>
                <div className="capabilitiesTag text-black font-bold">
                    #{item.tag}
                </div>
                <div className="capabilitiesTitle text-3xl font-bold text-menuTextColor leading-8 my-8">
                    {item.title}
                </div>
                <div className="capabilitiesBody mb-8 font-light text-lg">
                    {item.body}
                </div>
                <button
                    className="bg-transparent hover:bg-menuTextColor text-black text-lg font-semibold hover:text-white py-2 px-4 border border-menuTextColor hover:border-transparent rounded">
                    {item.button_label}
                </button>
            </div>
            <div className="capabilitiesImage w-full h-screen"  style={{flexBasis: "50%"}}>
                <img className="object-cover h-full w-full" src={url}/>
            </div>
        </div>
    );
};

export default CapabilitiesComponent;