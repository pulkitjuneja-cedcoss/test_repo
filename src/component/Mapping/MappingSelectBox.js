import React, { useState, useEffect } from "react";
import WoocommerceCategories from '../WoocommerceCategories'
import MarketplaceCategories from "./MarketplaceCategories";
import axios from 'axios'

const MappingSelectBox = (props) => {

    console.log(props, "mappselectbox");
    const [marketCategories, setMarketCategories] = useState({})
    const [event, setEvent] = useState(false)


    const callbackFunction = (wooCategories) => {
        console.log(wooCategories);
        props.callback({ 'woocommerce_categories': wooCategories, 'marketplace_categories': marketCategories });

    }

    const fetchMarketplaceCategory = () => {

        console.log('inside fetch ')
        let marketCat_obj = {};
        Object.keys(props.category_obj.mapping).map((key) => {
            /** to check number  exist or not in string */
            console.log('keyyy', key)

            if (/\d/.test(props.category_obj.mapping[key])) {
                console.log('ifffffff')
                axios.get('https://demo.cedcommerce.com/woocommerce/woocommerce-test-demo/connector-data/categories.php?level=' + props.category_obj.level + '&marketplace=' + key)
                    .then((resp) => {
                        console.log(resp)
                        console.log( props.category_obj.mapping[key], props.category_obj.mapping[key][0]  )
                        resp.data.map((cat) => {
                            if (cat.oid === props.category_obj.mapping[key][0]) {
                                console.log('matchedddddddd')
                                console.log(cat, "cat");
                                console.log('market_cat', marketCat_obj)
                                marketCat_obj[key] = cat.full_path;
                                console.log(cat.name);
                                setMarketCategories(marketCat_obj);
                                setEvent(!event);
                            }
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
            }
            else {
                console.log('elseeeeeeee')
                marketCat_obj[key] = props.category_obj.mapping[key][0];
                setMarketCategories(marketCat_obj);
            }

        });

        console.log(marketCat_obj, "mmmmm")
        // setMarketCategories(marketCat_obj);
        // return marketCat_obj;

    }

    useEffect(() => {
        if (props.data.length === 0 && Object.keys(props.category_obj).length > 0) {
            fetchMarketplaceCategory()
        }

    }, [])

    if (props.data.length > 0) {

   // if ( 'mapping' in props.category_obj && props.category_obj.mapping.length === 0 ) {    

        return (
            <select name="marketplace_cat" onChange={(e) => { console.log(e, e.target.value); props.func([props.keys, e.target.value]) }}>
                <option value="select">Select</option>
                {
                    props.data.map((cat) => {
                        return <option value={JSON.stringify(cat)}>{cat.name}</option>
                    })

                }
            </select>
        )
    }

    else {
        return (
            <div class="woocommerce_categories">
                <WoocommerceCategories callback={callbackFunction}/>
                <MarketplaceCategories marketCategories={marketCategories}/>
              
            </div>
        )
    }


}

export default MappingSelectBox