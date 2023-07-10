import FieldsFilter from "./fieldsFilter";

function FilterSidePanel(props: any) {
    const entries = Object.entries(props.data ? props.data : []);

    return (
        <div className="gap-5 flex flex-col px-10 border rounded-xl py-3 w-[30%] h-[90vh]">
            <div className="flex gap-40 items-center justify-between">
                <div className="font-bold">Filter by</div>
                <button className="font-bold">Clear</button>
            </div>
            <div className="flex gap-10 flex-col overflow-y-auto h-[88vh]">

                {entries?.map((fieldsData: any) => {
                    return (<div className="flex flex-col">
                        <p className="font-semibold">{fieldsData[0]}</p>
                        {fieldsData[1]?.slice(0, 4).map((fieldData: any) => (
                            <FieldsFilter data={fieldData} data1={props.data1} key1={fieldsData} />
                        ))}
                    </div>)
                })}
            </div>
            <button className="border rounded-xl border-green-600 font-semibold flex max-w-[150px] text-center items-center justify-center self-center px-3" onClick={props.handleSubmit}>Apply Filter</button>
        </div>
    );
}

export default FilterSidePanel;

// {
//     "filter": { "education": [ "Bachelors"], "skills": [], "location": [] },
//     "sort": {}
//   }