import React from 'react';

const IndustryComponent = ({data}) => {
    const item = data.acf;
    const url = item.image.url
    return (
        <div className="industry flex flex-row justify-between items-center">
            <div className="industryTexts pl-64 pr-40 " style={{flexBasis: "50%"}}>
                <div className="industryTag text-black font-bold ">
                    #{item.tag}
                </div>
                <div className="industryTitle text-6xl font-bold text-menuTextColor break-words leading-tight my-8">
                    {item.title}
                </div>
                <button
                    className="bg-transparent hover:bg-menuTextColor text-black text-sm font-semibold hover:text-white py-2 px-4 border border-menuTextColor hover:border-transparent rounded">
                    {item.button_label}
                </button>
            </div>
            <div className="capabilitiesImage " style={{flexBasis: "50%"}}>
                <img className="object-cover mb-10" src={url}/>
                <div className="text-sm w-2/3">{item.body}</div>
            </div>
        </div>
    );
};

export default IndustryComponent;