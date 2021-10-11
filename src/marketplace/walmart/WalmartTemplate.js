
import react, { useState } from 'react'
import SavedTemplate from '../../component/Templates/SavedTemplate';
import data from '../../json/walmart-required-fields.json'

const WalmartTemplate = () => {

    const [templateData, setTemplateData] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    console.log(data);

    let requiredFields = [];

    const saveData = (data) => {
        console.log('saveData', data);
        templateData[data.label] = data.value;
        setTemplateData(templateData);
    }

    const SavedTemplateData = () => {
        let callApi = true, initialKey = true ;
        console.log(templateData, "templateData");
        requiredFields.map((key) => {
            let exist = key.code in templateData;
            console.log(key, exist);
            if(exist){
               let temp = key.code; 
               console.log("temp",temp,"mn",templateData[temp],"okkkkk",templateData.temp)
              if (templateData[temp] === '') { 
                  console.log('inside if', key );
                  initialKey = false;
                  setErrorMessage('Please Enter ' + key.label + 'Value') }
            }
            if (!exist && callApi && initialKey) {
                console.log("iiiiiiiiiiiiiiiiiiiiiiiiinnnnnnnnnnnnnnnnnnnnnnnnn")
                callApi = false;
                setErrorMessage('Please Enter ' + key.label + 'Value');
            }
        })

        if (callApi) {
            console.log("save data api called");
        }
    }

    return (
        <div class="walmart_required_fields">
            <h3>Required Fields</h3>{
                data.map((field) => {

                    if (field.required) {
                        requiredFields.push({ 'code': field.code, 'label': field.label });
                    }

                    return (
                        <div class="walmart_required_field">
                            <label>{field.label}</label>
                            {
                                field.type === 'LIST' ? (
                                    <select onChange={(e) => { console.log(e.target.value); saveData({ 'label': field.code, 'value': e.target.value }) }}>
                                        <option value="">Select</option>
                                        {console.log(field.values_list)}
                                        {field.values_list.map((opt) => {
                                            { console.log(opt, opt.code, opt.label) }
                                            return <option value={opt.code}>{opt.label}</option>
                                        })}
                                    </select>) : (<></>)
                            }
                            {
                                field.type === 'TEXT' ? (<input type="text" onChange={(e) => { console.log(e.target.value); saveData({ 'label': field.code, 'value': e.target.value }) }} />) : (<></>)
                            }
                        </div>
                    )
                })
            }
            {
                errorMessage !== '' ? (
                    <span>{errorMessage}</span>
                    // <div class="position-fixed bottom-0 end-0 p-3 test" >
                    //     <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    //         <div class="toast-header">
                    //             <img src="..." class="rounded me-2" alt="..." />
                    //             <strong class="me-auto">Bootstrap</strong>
                    //             <small>11 mins ago</small>
                    //             <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    //         </div>
                    //         <div class="toast-body">
                    //             Hello, world! This is a toast message.
                    //         </div>
                    //     </div>
                    // </div>
                ) : <></>
            }
            {/* // <span>{errorMessage}</span> */}
            <button class="btn btn-primary" onClick={() => { console.log(templateData); SavedTemplateData() }}>Save</button>
        </div>
    )
}
export default WalmartTemplate