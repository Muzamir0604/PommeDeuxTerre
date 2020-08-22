import React from "react";


const Step1 = ({setForm, formData, navigation}) =>{

    const {previous, next} = navigation;
    return <React.Fragment><div>Step 1</div>
    <div>
        <button onClick={next}>Next</button>
    </div>
    </React.Fragment>
}

export default Step1;