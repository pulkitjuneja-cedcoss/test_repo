
import react,{ useState} from 'react'
import data from '../../json/etsy.json'

const EtsyTemplate = () => {

    const [ templateData, setTemplateData ] = useState({})
    const [ errorMessage, setErrorMessage ] = useState('')

    console.log(data);

    let  requiredFields=[];

    const saveData = (data) => {
        console.log('saveData',data);
        templateData[data.label] = data.value;
        setTemplateData(templateData);
    }


    const SavedTemplateData = () => {
        let callApi = true, initialKey = true;
        console.log(templateData,"templateData");
        requiredFields.map((key) => {
            let exist = key.id in templateData;
            console.log(key,exist);
            if(exist){
                let temp = key.id; 
                console.log("temp",temp,"mn",templateData[temp],"okkkkk",templateData.temp)
               if (templateData[temp] === '') { 
                   console.log('inside if', key );
                   initialKey = false;
                   setErrorMessage('Please Enter ' + key.label + 'Value') 
                }
             }
            if( !exist && callApi && initialKey ){
                console.log("iiiiiiiiiiiiiiiiiiiiiiiiinnnnnnnnnnnnnnnnnnnnnnnnn")
                callApi = false;
                setErrorMessage('Please Enter ' + key.label + 'Value' );
            } 
        })

        if(callApi){
            console.log("save data api called");
        }
    } 

    return (
        <div class="walmart_required_fields">
            <h3>Required Fields</h3>{
                data.map((field) => {

                    if(field.fields.is_required){
                        requiredFields.push({'id': field.id, 'label': field.fields.label.___$string});
                    } 

                    return (
                        <div class="walmart_required_field">

                            {
                                field.type === '_hidden' ? <></> : (
                                    <div>
                                        {/* {console.log(field.fields.label.___$string)} */}
                                        <label>{field.fields.label.___$string}</label>
                                        {
                                            field.type === '_select' ? (
                                                <select onChange={(e)=>{ console.log(e.target.value);saveData({'label': field.id,'value': e.target.value})}}>
                                                    <option value="">Select</option>
                                                    {console.log(field.fields.options)}
                                                    {Object.keys(field.fields.options).map((opt) => {
                                                        // {console.log(field.fields.options[opt])}
                                                        // { console.log(opt.___$string) }
                                                        return <option value={opt}>{field.fields.options[opt]}</option>
                                                    })}
                                                </select>
                                            ) : (<></>)
                                        }
                                        {
                                            field.type === '_text_input' ? (<input type="text" onChange={(e)=>{console.log(e.target.value); saveData({'label': field.id,'value': e.target.value})}} />) : (<></>)
                                        }
                                    </div>
                                )
                            }

                        </div>
                    )
                })
            }
             {
                errorMessage !== '' ? <span>{errorMessage}</span> : <></>
            }
            <button class="btn btn-primary" onClick={()=>{console.log(templateData);SavedTemplateData()}}>Save</button>
            </div>
    )
}
export default EtsyTemplate









 // {
  //   "type": "_select",
  //   "id": "_ced_etsy_shipping_profile",
  //   "fields": {
  //     "id": "_ced_etsy_shipping_profile",
  //     "label": {
  //       "___$isLiteral": true,
  //       "___$string": "Shipping Profile"
  //     },
  //     "desc_tip": true,
  //     "description": {
  //       "___$isLiteral": true,
  //       "___$string": "Shipping profile to be used for products while uploading on etsy"
  //     },
  //     "type": "select",
  //     "is_required": true,
  //     "class": "wc_input_price"
  //   }
  
  // },


//   {
//     "type": "_select",
//     "id": "_ced_etsy_shop_section",
//     "fields": {
//       "id": "_ced_etsy_shop_section",
//       "label": {
//         "___$isLiteral": true,
//         "___$string": "Shop Section"
//       },
//       "desc_tip": true,
//       "description": {
//         "___$isLiteral": true,
//         "___$string": "Shop section for the products . The products will be listed in the section on etsy if selected"
//       },
//       "type": "select",
//       "is_required": false,
//       "class": "wc_input_price"
//     }
//   },