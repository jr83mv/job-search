import Card from "./card";
import React, { useEffect, useState } from 'react';

function JobCardPage(props: any) {

    const cardsData=props.data;

    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event:any) => {
        const sortType=event.target.value;
        setSelectedValue(event.target.value);
     props.setSortDetails( JSON.parse(sortType))
    };

    const handleNextPage = () => {
        props.setPageDetail( props.pageDetail + 1);
      };
    
      const handlePreviousPage = () => {
        if (props.pageDetails > 1) {
            props.setPageDetail(props.pageDetail - 1);
        }
        
      };

    return (
        <div className="border rounded-xl px-10 py-3 items-center h-[90vh]">
            <div className="flex gap-64">
                <div className="">
                    <div className="font-bold"> SEARCH RESULTS /JOBS - {cardsData.length} results</div>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="font-bold">Sort by </div>
                    <select name="sort" id="cars" value={selectedValue} onChange={handleSelectChange} >
                        <option value='{"postedDate":1}'>Date ⬆</option>
                        <option value='{"postedDate":-1}'>Date ⬇</option>
                        <option value='{"name":1}'>Name ⬆</option>
                        <option value='{"name":-1}'>Name ⬇</option>
                    </select>
                </div>
            </div>
            <div className="overflow-y-auto h-[80vh]">
            {cardsData.map((cardData:JSON)=>(
                    <Card data={cardData} />
                ))}
            </div>
            <div className="flex gap-12 pt-2 justify-center">
                <img src="./left-arrow.png" alt="" className={`w-[30px] ${props.pageDetail === 1 ? 'opacity-30' : 'opacity-100'}`} onClick={handlePreviousPage}/>
                <img src="./right-arrow.png" alt="" className="w-[30px]" onClick={handleNextPage}/>
            </div>
        </div>
    );
}

export default JobCardPage;
