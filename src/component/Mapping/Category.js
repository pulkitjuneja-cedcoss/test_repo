// import React, { useEffect, useState } from "react";
// import axios from 'axios'
// import MappingSelectBox from "./MappingSelectBox";


// const Mapping = () => {

//     const [ category_level, setCategory_level ] = useState(-1);
//     const [ nextSelectBox, setNextSelectBox ] = useState({});

//     const [ level0, setLevel0 ] = useState([]);
//     const [ level1, setLevel1 ] = useState([]);
//     const [ level2, setLevel2 ] = useState([]);
//     const [ level3, setLevel3 ] = useState([]);
//     const [ level4, setLevel4 ] = useState([]);
//     const [ level5, setLevel5 ] = useState([]);
//     const [ level6, setLevel6 ] = useState([]);
//     const [ level7, setLevel7 ] = useState([]);


//     useEffect(() => { fetchCategories(); }, [])


//     const fetchCategories = ( prevSelectedCategory ) => {

//         console.log(prevSelectedCategory, "prevSelectedCategory")
//         let anotherSelectBoxExist = 1;
//         let nextCategoryLevel = category_level + 1;  ;
//         if(prevSelectedCategory !== undefined ){
//             prevSelectedCategory = JSON.parse(prevSelectedCategory);
//         }
//         console.log(prevSelectedCategory, "prevSelectedCategory")

//         console.log("category_level",category_level);
//         axios.get('https://demo.cedcommerce.com/woocommerce/woocommerce-test-demo/connector-data/categories.php?level=' + nextCategoryLevel )
//         .then((resp) => {
//             console.log(resp);
//             let selected_values = [];
//             if( prevSelectedCategory !== undefined ){

//                 console.log("elseeeeeee");
//                 resp.data.map((cat) => {
//                     if( prevSelectedCategory.oid === cat.parent_id ){
//                        selected_values.push(cat);
//                       anotherSelectBoxExist = 1;
//                        console.log("trueeeeeeeeeeeeeeeeeeeeeeee", anotherSelectBoxExist)
//                     }
//                 })

//                 console.log("current_category_level",category_level);

//                 setCategory_level(nextCategoryLevel);
//                 console.log("anotherSelectBoxExist",anotherSelectBoxExist )
//                 if(anotherSelectBoxExist === 1 ){
//                     console.log("nexttt trueeeeee")
//                     nextSelectBox[nextCategoryLevel] = 'level' + nextCategoryLevel;
//                     // let selectboxes = nextSelectBox.slice(0, nextCategoryLevel+ 1 );
//                     setNextSelectBox(nextSelectBox);
//                 }

//                 if(  nextCategoryLevel  === 1 ){ setLevel1(selected_values); }
//                 else if( nextCategoryLevel  === 2 ){ setLevel2(selected_values) }
//                 else if( nextCategoryLevel  === 3 ){ setLevel3(selected_values) }
//                 else if( nextCategoryLevel  === 4 ){ setLevel4(selected_values) }
//                 else if( nextCategoryLevel  === 5 ){ setLevel5(selected_values) }
//                 else if( nextCategoryLevel  === 6 ){ setLevel6(selected_values) }
//                 else if( nextCategoryLevel  === 7 ){ setLevel7(selected_values) }

//             }
//             else{
//                 console.log("current_category_level",category_level);

//                 let nextCategoryLevel = category_level + 1;  ;
//                 setCategory_level(nextCategoryLevel);
//                 console.log("anotherSelectBoxExist",anotherSelectBoxExist )
//                 if( nextCategoryLevel === 0 ){
//                     console.log("eolse   nexttt trueeeeee")
//                     nextSelectBox[nextCategoryLevel] = `level${nextCategoryLevel}`;
//                     setNextSelectBox(nextSelectBox);
//                 }
//                 console.log("else 0");

//                 nextCategoryLevel  === 0 ? setLevel0(resp.data) : setLevel0([])
//             }

//             // setCategories(resp.data);
//         }).catch((error) => {
//                console.log(error)
//         })


//     }

//     return(
//         <div>
//         <h>Mapping</h>
//         <div>
//             <label>Choose MarketPlace Category</label>
//            { console.log(nextSelectBox) }
//             {
//                 Object.values(nextSelectBox).map((e) =>{
//                     console.log(e);
//                     let x = e;
//                   return <MappingSelectBox data={ eval(x)} func={fetchCategories} />
//                 })
//             }
//         </div>
//         </div>
//     )

// }

// export default Mapping

















import React, { useEffect, useState } from "react";
import axios from 'axios'
import MappingSelectBox from "./MappingSelectBox";
import CategoryTable from './CategoryTable';
// import WoocommerceCategories from './WoocommerceCategories'
// import { useContext } from 'react';
// import { MyContext } from "../../context";
// import marketplaces from "../../data/marketplaces";
import { useSelector } from "react-redux";


const Category = () => {

    const [category_level, setCategory_level] = useState(-1);
    const [nextSelectBox, setNextSelectBox] = useState({});
    // const [noMoreBoxes, setNoMoreBoxes] = useState(false);
    const [marketplaceCategory, setMarketplaceCategory] = useState({})
    const [loading, setLoading ] = useState(true);
    const [allCategories, setAllCategories] = useState({})
    const [cedcommerceCategories, setCedcommerceCategories] = useState([]);
    // const [event, setEvent] = useState(false);

    const [level0, setLevel0] = useState([]);
    const [level1, setLevel1] = useState([]);
    const [level2, setLevel2] = useState([]);
    const [level3, setLevel3] = useState([]);
    const [level4, setLevel4] = useState([]);
    const [level5, setLevel5] = useState([]);
    const [level6, setLevel6] = useState([]);
    const [level7, setLevel7] = useState([]);

    const currentGlobalState = useSelector(state => state);

    const url = currentGlobalState.first.wordpress_details;
    const url_obj = currentGlobalState.first.wordpress_details;
    console.log(url_obj);

    useEffect(() => { 
        fetchCategories(); 
        setLoading(false);
    }, [])

    // const boxes = () => {
    //     setNoMoreBoxes(true);
    //     setEvent(!event);
    // }

    // let marketplace_category = {};

    const callbackFunction = (categories) => {
        console.log('categories',categories)
        setAllCategories(categories);
    }

    const fetchCategories = async (obj) => {

        setLoading(true);
        let prevSelectedCategory, nextCategoryLevel;

        if (obj !== undefined) {

            prevSelectedCategory = JSON.parse(obj[1]);
            nextCategoryLevel = parseInt(obj[0]) + 1;
            // marketplace_category['google'] = 'mapping' in prevSelectedCategory && 'google' in prevSelectedCategory.mapping ? prevSelectedCategory.mapping.google : '';
            // marketplace_category['walmart'] = 'mapping' in prevSelectedCategory && 'walmart' in prevSelectedCategory.mapping ? prevSelectedCategory.mapping.walmart : '';
            
            // if(obj[0] === "true" ){
            //     setNoMoreBoxes(true);
            // }
        }
        else { prevSelectedCategory = ''; nextCategoryLevel = 0; }

        // let prevSelectedCategory = obj !== undefined ?  obj[1] : '';
        //  let anotherSelectBoxExist = 1;
        //    let nextCategoryLevel = category_level + 1;  ;
        // let nextCategoryLevel = obj !== undefined ? ( obj[0] + 1) : 1;
        // console.log('marketplace_category', marketplace_category);
        // console.log("category_level", category_level);

        await axios.get('https://demo.cedcommerce.com/woocommerce/woocommerce-test-demo/connector-data/categories.php?level=' + nextCategoryLevel + '&marketplace=cedcommerce')
            .then((resp) => {
                console.log(resp);
                let selected_values = [];
                if (obj !== undefined) {
                    resp.data.map((cat) => {
                        if (prevSelectedCategory.oid === cat.parent_id) {
                            selected_values.push(cat);
                           // anotherSelectBoxExist = 1;
                           // console.log("trueeeeeeeeeeeeeeeeeeeeeeee", anotherSelectBoxExist)
                        }
                        return null;
                    })

                   // console.log("current_category_level", category_level);

                    setCategory_level(nextCategoryLevel);
                    setMarketplaceCategory(prevSelectedCategory);
                    cedcommerceCategories.push(prevSelectedCategory);
                    setCedcommerceCategories(cedcommerceCategories);
                    // console.log("anotherSelectBoxExist", anotherSelectBoxExist)

                   // if (anotherSelectBoxExist === 1) {
                        nextSelectBox[nextCategoryLevel] = 'level' + nextCategoryLevel;
                        
                        /** To handle conditions when USER goes back to LEVEL 1 SELECT BOX after LEVEL 3 SELECT BOX */
                        Object.keys(nextSelectBox).map((e) => {
                            //    let str = nextCategoryLevel + 1;
                            if (parseInt(e) > nextCategoryLevel) {
                                delete nextSelectBox[e];
                            }
                            return null
                        })
                        setNextSelectBox(nextSelectBox);
                   // }

                    if (nextCategoryLevel === 1) { setLevel1(selected_values); }
                    else if (nextCategoryLevel === 2) { setLevel2(selected_values) }
                    else if (nextCategoryLevel === 3) { setLevel3(selected_values) }
                    else if (nextCategoryLevel === 4) { setLevel4(selected_values) }
                    else if (nextCategoryLevel === 5) { setLevel5(selected_values) }
                    else if (nextCategoryLevel === 6) { setLevel6(selected_values) }
                    else if (nextCategoryLevel === 7) { setLevel7(selected_values) }

                }
                else {

                    if (nextCategoryLevel === 0) {
                        nextSelectBox[nextCategoryLevel] = `level${nextCategoryLevel}`;
                        setNextSelectBox(nextSelectBox);
                        setCategory_level(nextCategoryLevel);
                        setMarketplaceCategory(prevSelectedCategory);
                    }
                    nextCategoryLevel === 0 ? setLevel0(resp.data) : setLevel0([])
                }

            }).catch((error) => {
                console.log(error)
            })
            
            console.log("false")
            setLoading(false);
    }


    const saveMapping = () => {
        console.log(cedcommerceCategories, allCategories,cedcommerceCategories);
        // let profile_data = [
        //     'profile_name'           =>  cedcommerceCategories,       // $this->cedcommerce_category ,
        //     'profile_data'           =>  $this->profile_data ,
        //     'marketplace_categories' =>  allCategories.marketplace_categories, //$this->marketplace_category 
        //     'woo_categories'         =>  allcategories.woocommerce_categories, //$this->woo_cat_ids ,
        //     'ced_category'           =>  $this->ced_category ,
        // ];

        let profile_data = {
            'profile_name'           :  cedcommerceCategories,   
            'marketplace_categories' :  allCategories.marketplace_categories, 
            'woo_categories'         :  allCategories.woocommerce_categories, 
        };
    
    }

    return (
        <div class="ced_umb_wrapper">

            <div class="ced_umb_content">
                <div class="ced_umb_mapping_wrap">
                    <div class="ced_umb_mapping_child_element">
                        <label class="ced_umb_label">Choose MarketPlace Category</label><br></br>
                        <span class="cedcommerce-tip">[ Please choose the marketplace category in which you want to list your WooCommerce store products. ]</span>
                    </div>
                    <div class="ced_umb_mapping_child_element">
                    {
                        Object.keys(nextSelectBox).map((e) => {
                            console.log(e, typeof (e), nextSelectBox[e]);
                            let x = nextSelectBox[e];
                            
                            return <MappingSelectBox data={eval(x)} func={fetchCategories} keys={e} category_obj={marketplaceCategory} callback={callbackFunction}/>
                         })
                    }{
                        loading ? <img src={url_obj.app_path + '/build/images/loading.gif'} alt='Loading!!!...' width='30px' height='30px' />
                        : <></>
                    }
                    </div>

                </div>
                <div class="ced_umb_save_button ced_umb_mapping_save_button">
                    <button class="button-primary btn" id="ced_umb_save_mapping" onClick={()=>{saveMapping()}}>Save mapping</button>
                    <a class="button-primary" href="?page=ced_sales_channel">Cancel mapping</a>
                </div>

            </div>
            <CategoryTable />
        </div>
    )

}

export default Category


