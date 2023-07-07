import { useState } from "react";

function FieldsFilter(props:any) {

    // console.log("-------",props)

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setChecked(checked);
      if(checked){
        props.data1[props.key1[0]].push(props.data)
      }
      else{
        props.data1[props.key1[0]].splice(props.data,1)
      }
    };

    
    return (
        <div className="flex gap-3 py-1">
            <input type="checkbox" name="amazon" checked={checked} onChange={handleCheckboxChange}/>
            <div>{props.data}</div>
        </div>
    );
}

export default FieldsFilter;
