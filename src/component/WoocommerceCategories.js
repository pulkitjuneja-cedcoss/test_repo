import React, { useEffect, useState } from "react";
import axios from "axios";

const WoocommerceCategories = (props) => {

    const [wooCat, setWooCat] = useState([])
    const [selectedWoocommerceCatagories, setSelectedWoocommerceCatagories] = useState([])
    const [event, setEvent] = useState(false)

    const woo_cat = () => {

        axios.get('https://demo.cedcommerce.com/woocommerce/woocommerce-test-demo/connector-data/woocat.php')
            .then((resp) => {
                let cat_array = [];
                Object.values(resp.data).map( (cat) => { cat_array.push(cat) })
                setWooCat(cat_array)

            }).catch((error) => { console.log(error) })
    }

    useEffect(() => { woo_cat() }, [])

    // let selectedWoocommerceCatagories = [];

    const removeCat = (index, cat) => {
        console.log(index, cat);
        selectedWoocommerceCatagories.splice(index, 1);
        // delete selectedWoocommerceCatagories.
        wooCat.push(cat);
        // wooCat[index]=cat;
        console.log(wooCat);
        console.log(selectedWoocommerceCatagories)
        setSelectedWoocommerceCatagories(selectedWoocommerceCatagories);
        setWooCat(wooCat);
        setEvent(!event);
        props.callback(selectedWoocommerceCatagories);

    }

    const tags = (selected_cat) => {
        let category = JSON.parse(selected_cat);
        let index = category.index;

        selectedWoocommerceCatagories.push(category['cat']);
        wooCat.splice(category['index'], 1);
        //  delete wooCat[index];
        setSelectedWoocommerceCatagories(selectedWoocommerceCatagories);
        setWooCat(wooCat);
        setEvent(!event);
        props.callback(selectedWoocommerceCatagories);
    }

    return (
        <div>
            <h3>Choose Woocommerce Category</h3>
            <select value="select" onChange={(e) => { tags(e.target.value) }}>
                <option value="select">Select</option>
                {/* { console.log(wooCat)} */}
                {
                    wooCat.map((cat, key) => {
                        if (!selectedWoocommerceCatagories.includes(cat.name)) {
                            // let cat = JSON.stringify(cat);
                            let cat_obj = { 'index': key, 'cat': cat };
                            return (<option value={JSON.stringify(cat_obj)}>{cat.name}</option>)
                        }
                        return null;
                    })
                }
            </select>
            {/* { console.log(selectedWoocommerceCatagories) } */}
            <div class="selected_category_div">
            {
                selectedWoocommerceCatagories.map((cat, key) => {
                    console.log("woocat", key, cat)
                    return (
                        <div class="tags_main">
                            <span class="tags">
                               <label >{cat.name}</label>
                               <span onClick={() => { removeCat(key, cat) }}><i class="fa fa-times" aria-hidden="true"></i></span>
                            </span>
                        </div>
                    )

                })
            }
            </div>

        </div>
    )


}

export default WoocommerceCategories