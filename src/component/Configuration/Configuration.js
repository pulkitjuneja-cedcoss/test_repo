import React,{ useState } from "react";
import CedMarketplaces from "./CedMarketplaces";
import ActiveMarketplaces from "./ActiveMarketplaces";
// import { DetailsSaved, UpdateDetails } from "../../marketplace/walmart/authentication";
import { useSelector } from "react-redux";
import Header from "../Header";

const Configuration = (props) => {

    const [ section, setSection ] = useState('active_marketplaces');
    const currentGlobalState = useSelector(state => state);
    const url_obj = currentGlobalState.first.wordpress_details;

    console.log(url_obj);

    const callbackFunc = (walmartAccountData) => {
        console.log('configggggg',walmartAccountData)
        props.parentCallback(walmartAccountData);

    }


    const switchFunc = () => {
        switch (section) {
            case "ced_marketplaces": return <CedMarketplaces />
            default: return <ActiveMarketplaces callback={callbackFunc} data={url_obj} />;
        }
    }


    return (
         <div class="ced_umb_wrapper">
            <Header name='Configuration' />
            <div class="ced_umb_page_sections_wrap">
                <button class="ced_umb_page_sections" onClick={()=>setSection('active_marketplaces')} >Active MarketPlaces</button>
                <button class="ced_umb_page_sections" onClick={()=>setSection('ced_marketplaces')} >Cedcommerce MarketPlaces</button>
            </div>
            { switchFunc() }
        </div>

    )

}


export default Configuration