
import react, { useEffect, useState } from 'react'
import { DetailsSaved, UpdateDetails } from "../../marketplace/walmart/authentication";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const ActiveMarketplaces = (props) => {

    const [userExist, setUserExist] = useState(false);
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const [walmartMessage, setWalmartMessage] = useState('');
    const [newCredentials, setNewCredentials] = useState({ 'key': '', 'value': false });
    const [event, setEvent] = useState(false);
    const [walmartSelectOption, setWalmartSelectOption] = useState('')
    const [marketplaceModal, setMarketplaceModal] = useState('')
    const [clientAuthKey, setClientAuthKey] = useState('');
    const [message, setMessage] = useState('');
    const [verificationObj, setVerificationObj] = useState({})
    
    const currentGlobalState = useSelector(state => state);
    const dispatch = useDispatch();

    const url_obj = currentGlobalState.first.wordpress_details;

    // console.log(url_obj.app_path);


    const verifyClient = async () => {
        console.log(clientAuthKey, marketplaceModal);

        if (clientAuthKey !== '' ) {

           await axios.post(url_obj.app_path + 'admin/api/testapi2.php', {
               'domain': process.env.REACT_APP_SITE_URL, 
               'email_id': process.env.REACT_APP_ADMIN_EMAIL, 
               'marketplace': marketplaceModal, 
               'auth_key': clientAuthKey
           },{
            headers: {
                Authorization: 'ced:123456'
            }
        }).then((response) => {
                    console.log(response.data);
                    dispatch({ type: "validation_details_exist", validation_details: response.data })
                    setMessage('Verified Successfully');
                })
                .catch((error) => {
                    console.log(error);
                    setMessage('Verification Failed')
                })

            // verificationObj[marketplace] = true;
            // setVerificationObj(verificationObj)

        } else {
            if (clientAuthKey === '') { setMessage('Please Enter Authentication Key') }
          
        }

    }

    // useEffect(() => {
    //     let api = DetailsSaved(props.data);
    //     api.then((resp) => {
    //         console.log(resp)
    //         if (resp.walmart_client_id !== '' && resp.walmart_client_secret !== '') {
    //             setUserExist(true);
    //             setClientId(resp.data.walmart_client_id);
    //             setClientSecret(resp.data.walmart_client_secret)
    //         }

    //     }).catch((error) => {
    //         console.log(error)
    //     })

    // }, [])


    useEffect(() => {
        console.log(currentGlobalState.second);
        if( currentGlobalState.second && currentGlobalState.second.validation_obj !== undefined && Object.keys(currentGlobalState.second.validation_obj.length > 0 )){
            axios.get(url_obj.app_path + 'admin/api/testapi.php',{
                headers: { Authorization: 'ced:123456' }
            }).then((response) => {
                console.log(response);
                dispatch({ type: "validation_details_exist", validation_details: response.data })
            }).catch((error) => {
                console.log(error);
            })

        }

    }, [])


    const connectToMarketplace = async (name) => {

        console.log('connect');

        if (name === 'walmart') {
            if (clientSecret !== '' && clientId !== '') {
                setLoading(true)
                let api = UpdateDetails({ 'url_obj': props.data, 'client_id': clientId, 'client_secret': clientSecret });
                await api.then((resp) => {
                    console.log(resp.data, resp.data.status, typeof (resp.data.status))
                    // setInvalidCredentials(false)
                    switch (resp.data.status) {
                        case 400: setWalmartMessage('Invalid Credentials'); break;
                        case 200: setWalmartMessage('Logged In Succesfully'); setUserExist(true); props.callback({ 'client_id': clientId, 'client_secret': clientSecret, 'userExist': true }); break;
                        case '400': setWalmartMessage('Invalid'); break;
                        default: setWalmartMessage('here i amm')
                    }
                }).catch((error) => { console.log(error) })
                setLoading(false)

            } else { setWalmartMessage('Please fill all the Details'); }
        }
    }


    const UpdateCurrentCredentials = (credentials) => {
        setClientId(credentials.client_id);
        setClientSecret(credentials.secret_key)
        newCredentials['key'] = 1;
        newCredentials['value'] = true;
        setNewCredentials(newCredentials);
        setEvent(!event);

    }


    const renderModalBody = () => {

        switch (walmartSelectOption) {
            case 'saved_accounts': return <div class="modal-body">
                {/* row1 */}
                <h6>Account 1</h6>

                <label>Client ID</label>
                <input type="text" value='fgbhhbtddttyt' readonly />
                <label>Secret Key</label>
                <input type="text" value='ythytdyeyhbythtyd' readonly />
                {
                    newCredentials.key === 0 ? (
                        <button type="button" class="btn btn-primary validate" onClick={() => { connectToMarketplace('walmart') }}>Confirm</button>

                    ) : (
                        <button class="btn btn-primary" onClick={() => { UpdateCurrentCredentials({ 'client_id': 'fgbhhbtddttyt', 'secret_key': 'fgbhhbtddttyt', 'key': 0 }) }}>Set</button>

                    )
                }

                {/* row2 */}
                <h6>Account 2</h6>

                <label>Client ID</label>
                <input type="text" value='fgbhhbtddttyt' readonly />
                <label>Secret Key</label>
                <input type="text" value='ythytdyeyhbythtyd' readonly />
                {
                    newCredentials.key === 1 ? (
                        <button type="button" class="btn btn-primary Validate" onClick={() => { connectToMarketplace('walmart') }}>Confirm</button>

                    ) : (
                        <button class="btn btn-primary" onClick={() => { UpdateCurrentCredentials({ 'client_id': 'fgbhhbtddttyt', 'secret_key': 'fgbhhbtddttyt', 'key': 0 }) }}>Set</button>

                    )
                }

                <div class="modal-footer">
                    <button type="button" class='btn btn-danger' data-bs-dismiss="modal">Close</button>
                    <button type="button" class='btn btn-secondary' onClick={() => { setWalmartSelectOption('') }}>Back</button>
                </div>

            </div>
                break;

            default: return <div>
                {
                    loading ? (
                        <div class="loader">
                            <img src={props.data.app_path + '/build/images/loading.gif'} alt='Loading' width='50px' height='50px' />
                            <span>Please Wait!!!.....</span>
                        </div>) : (
                        <div>
                            <div class="modal-body">
                                <label>Client ID</label>
                                <input type="text" onChange={(e) => { console.log(e.target.value); setClientId(e.target.value) }} />
                                <label>Secret Key</label>
                                <input type="text" onChange={(e) => { console.log(e.target.value); setClientSecret(e.target.value) }} />
                            </div>

                            {walmartMessage !== '' ? <p class="incomplete_details">{walmartMessage}</p> : <></>}

                            {walmartMessage === 'Logged In Succesfully' ? <></> : <button type="button" class="btn btn-primary validate" onClick={() => { connectToMarketplace('walmart') }}>Validate</button>}
                        </div>
                    )
                }

                <div class="modal-footer">
                    <button type="button" class='btn btn-danger' data-bs-dismiss="modal">Close</button>
                    <button type="button" class='btn btn-secondary' onClick={() => { setWalmartSelectOption('') }}>Back</button>
                </div>

            </div>
                break;
        }




    }


    return (
        <div class="cards">
            {
                Object.keys(currentGlobalState.first.wordpress_details.marketplaces).map((marketplace_name) => {
                    if (currentGlobalState.first.wordpress_details.marketplaces[marketplace_name]['exists']) {
                        return (
                            <>
                                <div class="card marketplace_card" >
                                    <img src={currentGlobalState.first.wordpress_details.app_path + '/build/marketplace-images/' + marketplace_name + '-card.png'} class="card-img-top" alt={marketplace_name} />
                                    <div class="card-body">
                                        <h5 class="card-title">{marketplace_name.charAt(0).toUpperCase() + marketplace_name.slice(1)}</h5>
                                        { console.log(currentGlobalState.second.validation_obj) }
                                        {
                                            !currentGlobalState.second.validation_obj[marketplace_name] ? <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => {setMarketplaceModal(marketplace_name)}}>
                                                Verify
                                            </button> : (<div>
                                                {
                                                    marketplace_name === 'walmart' ? (
                                                        <div >
                                                            <button type="button" class="btn btn-primary cnt" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setWalmartSelectOption('') }}>
                                                                Connect
                                                            </button>
                                                            {
                                                                userExist ? (
                                                                    <>
                                                                        <button type="button" class="btn btn-primary config_buttons" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { console.log('view coonc acc'); setWalmartMessage(''); setWalmartSelectOption('saved_accounts'); }}>
                                                                            View All Accounts
                                                                        </button>
                                                                        <button class="btn btn-primary walmart_cfg" >Configure</button>
                                                                    </>
                                                                ) : (<></>)
                                                            }

                                                        </div>

                                                    ) : (<button class="btn btn-primary" >Connect</button>)
                                                }
                                            </div>)
                                        }

                                    </div>
                                </div>
                            </>
                        )

                    }

                    return null;

                })
            }


            {/* Modal to Connect Client from MarketPlace */}

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Credentials</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {renderModalBody()}

                    </div>
                </div>
            </div>


            {/* Modal To Verify Client Key */}

            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Credentials</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class='modal-body'>

                            <label>Authentication Key</label>
                            <input type='text' onChange={(e) => { setClientAuthKey(e.target.value) }} />

                            { message !== '' ? <p class='verification_message'>{message}</p> : <></> }
                            <button class='btn btn-primary' onClick={() => { verifyClient() }}>Submit</button>
                     
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" class="btn btn-primary" onClick={() => { connectToMarketplace('walmart') }}>Validate</button> */}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )


}

export default ActiveMarketplaces;








