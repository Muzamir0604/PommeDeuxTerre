import React from "react";


const Step2 = ({setForm, formData, navigation}) =>{

    const {previous, next} = navigation;
    return <React.Fragment><div>Step 2</div>
    <div>
    <button onClick={previous}>Previous</button>
        <button onClick={next}>Next</button>
    </div>
    </React.Fragment>
}

export default Step2;