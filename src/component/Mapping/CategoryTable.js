import React, { useEffect } from "react";
// import axios from 'axios'


const CategoryTable = () => {

    const fetchCategories = async () => {
        console.log("ok")
        // await axios.get(
        //     //   ' https://demo.cedcommerce.com/woocommerce/woocommerce-test-demo/connector-data/categories.php?level=' + nextCategoryLevel 
        // )
        // .then((resp) => {
        //     console.log(resp);
        // }).catch((error) => {
        //     console.log(error)
        // })
    }

    useEffect(() => {
       fetchCategories();
    },[])


    return (

        <div>
            <div class="tablenav top">

                <div class="alignleft actions bulkactions">
                </div>
                <div class="tablenav-pages one-page"><span class="displaying-num">6 items</span>
                    <span class="pagination-links"><span class="tablenav-pages-navspan button disabled" aria-hidden="true">«</span>
                        <span class="tablenav-pages-navspan button disabled" aria-hidden="true">‹</span>
                        <span class="paging-input"><label for="current-page-selector" class="screen-reader-text">Current Page</label>
                            <input class="current-page" id="current-page-selector" type="text" name="paged" value="1" size="1" aria-describedby="table-paging" />
                            <span class="tablenav-paging-text"> of <span class="total-pages">1</span></span></span>
                        <span class="tablenav-pages-navspan button disabled" aria-hidden="true">›</span>
                        <span class="tablenav-pages-navspan button disabled" aria-hidden="true">»</span></span>
                </div>
                <br class="clear" />
            </div>
            <table class="category_table">
                <tr>
                    <th>CedCommerce category</th>
                    <th>Marketplace categories</th>
                    <th>WooCommerce categories</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </table>
            <div class="tablenav bottom">

                <div class="alignleft actions bulkactions">
                </div>
                <div class="tablenav-pages one-page"><span class="displaying-num">6 items</span>
                    <span class="pagination-links"><span class="tablenav-pages-navspan button disabled" aria-hidden="true">«</span>
                        <span class="tablenav-pages-navspan button disabled" aria-hidden="true">‹</span>
                        <span class="screen-reader-text">Current Page</span><span id="table-paging" class="paging-input"><span class="tablenav-paging-text">1 of <span class="total-pages">1</span></span></span>
                        <span class="tablenav-pages-navspan button disabled" aria-hidden="true">›</span>
                        <span class="tablenav-pages-navspan button disabled" aria-hidden="true">»</span></span></div>
                <br class="clear" />
            </div>
        </div >

    )
}

export default CategoryTable