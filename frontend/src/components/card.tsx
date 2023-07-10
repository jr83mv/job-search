import React from "react";

function Card(props: any) {
    const daysSincePosted = (postedDate: string) => {
        return Math.round((new Date().getTime() - new Date(postedDate).getTime()) / (1000 * 3600 * 24));
    }
    return (
        <div className="my-10 flex-col flex ">
            <div className="flex bg-slate-700 items-center gap-48 px-10 rounded-t-xl py-5 flex-row">
                <div className="gap-16 flex">
                    <img src="./appleLogo.png" alt="" className="w-20 h-20" />
                    <div className="flex flex-col text-white">
                        <p className="font-bold">{props.data.name}</p>
                        <p>{props.data.company}</p>
                        <p>{props.data.location}</p>
                    </div>
                </div>
                <img src="./skillMatchIcon.png" alt="" />
            </div>
            <div className="flex bg-slate-600 px-10 gap-40 rounded-b-xl py-2 flex-row justify-between items-center">
                <div className="flex text-white items-center gap-2">
                    <div>Posted {daysSincePosted(props.data.postedDate)} day ago</div>
                    <div className="text-3xl">•</div>
                    <div>{props.data.applicants} Applicants</div>
                </div>
                <div className="flex gap-10 items-center">
                    <button className="bg-green-400 rounded-[47px] text-white text-sm py-1 px-2">APPLY NOW</button>
                    <img src="./saveIcon.png" alt="" className="w-[20px] h-[30px]" />
                </div>
            </div>
        </div>
    );
}

export default Card;
//   {props.data.position}
//{props.data.company}
//{props.data.location}
