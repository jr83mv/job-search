import { useEffect, useState } from "react";
import FilterSidePanel from "../components/filterSidePanel";
import JobCardPage from "../components/jobCardPage";
import Navbar from "../components/navbar";
import React from "react";

function MainPage(props: any) {

  const [positionsData, setPositionsData] = useState([]);
  const [filterFiledsData, setFilterFiledsData] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [selectedFilterData, setSelectedFilterData] = useState({ "education": [], "skills": [], "location": [],"company":[] });
  const [searchData, setSearchData] = useState(undefined);
  const [pageNo, setPageNo] = useState(1);

  const fetchData = async () => {
    try {
      setSelectedFilterData(selectedFilterData);
      setSearchData(searchData);
      console.log(searchData)
      let reqBody = { filter: selectedFilterData, sort: sortData, searchQuery: searchData,pageSize:10,page:pageNo };
      const response = await fetch('http://localhost:3000/positions-filter', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPositionsData(data.positions);
          if (data.filterFileds) {
            setFilterFiledsData(data.filterFileds)
          }

        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortData, searchData,pageNo]);

  return (<div className="h-[100%]">
    <Navbar searchDetails={searchData} setSearchDetails={setSearchData}  />
    <div className="flex py-3 gap-5 px-5 h-[90%]">
      <FilterSidePanel data={filterFiledsData} handleSubmit={() => fetchData()} data1={selectedFilterData} />
      <JobCardPage data={positionsData} sortDetails={sortData} setSortDetails={setSortData} setPageDetail={setPageNo} pageDetail={pageNo}/>
    </div></div>

  );
}

export default MainPage;