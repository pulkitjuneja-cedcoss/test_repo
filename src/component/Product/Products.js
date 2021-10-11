import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";


const Products = () => {

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [perPage, setPerPage] = useState('10');
    const [pageNumber, setPageNumber] = useState(1);
    const [event, setEvent] = useState(false);
    const [event2, setEvent2] = useState(false);
    const [urlParams, setUrlParams] = useState({});
    const [wooCat, setWooCat] = useState([])
    const [allCheckboxes, setAllCheckboxes] = useState({  })
    const [marketplaceExist, setMarketplacesExist] = useState([])
    const [selectedMarketplaces, setSelectedMarketplaces] = useState([])
    const [action, setAction] = useState('')

    const currentGlobalState = useSelector(state => state);
    // const dispatch = useDispatch();

    const url_obj = currentGlobalState.first.wordpress_details;

    console.log('allChecboxes', allCheckboxes)

    const fetchData = async () => {

        let urlString2 = '';
        let urlString1 = 'per_page=' + perPage + '&page=' + pageNumber + '&';

        Object.keys(urlParams).map((parameter) => {
            if (urlParams[parameter] !== '') {
                urlString2 = urlString2 + parameter + '=' + urlParams[parameter] + '&';
            }
            return null
        })

        setIsLoadingMore(true);

        await axios.get(
            // 'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/products?' + urlString1 + urlString2 + '&consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314'
            'https://localhost/web4/wordpress/wp-json/wc/v3/products?' + urlString1 + urlString2 + '&consumer_key=ck_0e649e865bd3e276bcd5bf7517bff2c84cc4778f&consumer_secret=cs_2871384cf9396a7fb113cb53eb3afe7ebdce245d'
        
            ).then((response) => {
            console.log(response.data)
            setProducts(response.data);
            setTotalPages(parseInt(response.headers['x-wp-totalpages']));

        }).catch((error) => { console.log(error) })

        setIsLoadingMore(false);

    }

    useEffect(() => { fetchData(); }, [event, pageNumber, perPage])

    useEffect(() => {
        woo_cat();
        let marketplace_exists = [];

        /** Preparing array of markeplaces that user has subscribed */
        Object.keys(url_obj.marketplaces).map((marketplace_name) => {
            if (url_obj.marketplaces[marketplace_name]['exists']) {
                marketplace_exists.push(marketplace_name)
            }
            return null;
        })
        setMarketplacesExist(marketplace_exists)

    }, [])

    // useEffect(()=>{
    //   $(document).ready(function () {
    //     $('#example').DataTable();
    // });

    //   axios.get( basicPath + 'products',{
    //     headers: {
    //     Authorization: 'ced:123456'
    //     }
    //     }).then((resp) => {
    //         console.log(resp.data)
    //         setProducts(resp.data.product_data)
    //     }).catch((error) =>{
    //         console.log(error)
    //     })
    //  },[])

    const setFilter = (obj) => {
        console.log("object", obj);
        /** Inserting parameters to filter products*/
        Object.keys(obj).map((key) => { urlParams[key] = obj[key]; })
        setPageNumber(1);
        setUrlParams(urlParams);
        // setEvent(!event);
    }

     /** To Reset all filters */
    const ResetAllFilter = () => {
        setPageNumber(1);
        setUrlParams({});
        setEvent(!event);
    }

    /**  Fetching Woocommerce Categories */
    const woo_cat = () => {
        axios.get('https://demo.cedcommerce.com/woocommerce/woocommerce-test-demo/connector-data/woocat.php')
            .then((resp) => { setWooCat(resp.data) })
            .catch((error) => { console.log(error) })
    }

    /** To set value of individual checkbox */
    const setIndividualCheckbox = (check) => {
        console.log('checkbox', check);
        let temp = check[0];
        allCheckboxes[temp] = check[1];
        setAllCheckboxes(allCheckboxes);
        setEvent2(!event2);
    }
    

    /**  To Check and UnCheck all select boxes*/
    const all_checked = (value) => {
        // Object.keys(allCheckboxes).map((item) => { allCheckboxes[item] = value })
        products.map((item) => {
            allCheckboxes[ 'checkbox-' + item.id ] = value;
        })
        setAllCheckboxes(allCheckboxes);
        setEvent2(!event2);
    }

    /**  To Create tags of selected marketplaces */
    const createTags = (selected_marketplace) => {
        let index = marketplaceExist.indexOf(selected_marketplace);
        selectedMarketplaces.push(selected_marketplace);
        marketplaceExist.splice(index, 1);
        setSelectedMarketplaces(selectedMarketplaces);
        setMarketplacesExist(marketplaceExist);
        setEvent2(!event2);
    }

    /**  To Remove tags of selected marketplaces */
    const removeTags = (index, marketplace_name) => {
        console.log(index, marketplace_name);

        marketplaceExist.push(marketplace_name);
        selectedMarketplaces.splice(index, 1);
        setSelectedMarketplaces(selectedMarketplaces);
        setMarketplacesExist(marketplaceExist);
        setEvent2(!event2);

    }

    return (
        !isLoadingMore ?
            (<div>
                <div class='upload_section'>
                    <select onChange={(e)=>{setAction(e.target.value)}}>
                        <option value=''>Select Marketplace Action</option>
                        <option value='upload'>Upload</option>
                        <option value='update'>Update</option>
                        <option value='update_inventory'>Update Inventory</option>
                        <option value='assign_templates'>Assign Templates</option>
                    </select>
                    <select value="Select Marketplace" onChange={(e) => { createTags(e.target.value) }}>
                        <option value=''>Select Marketplace</option>
                        {
                            marketplaceExist.map((marketplace_name) => {
                                if (url_obj.marketplaces[marketplace_name]['exists']) {
                                    return <option value={marketplace_name}>{marketplace_name.charAt(0).toUpperCase() + marketplace_name.slice(1)}</option>
                                }
                                return null;
                            })
                        }
                    </select>
                    {
                        selectedMarketplaces.length > 0 ? (
                            selectedMarketplaces.map((marketplace_name, key) => {
                                return <div class="tags_main">
                                    <span class="tags">
                                        <label >{marketplace_name.charAt(0).toUpperCase() + marketplace_name.slice(1)}</label>
                                        <span onClick={() => { removeTags(key, marketplace_name) }}><i class="fa fa-times" aria-hidden="true"></i></span>
                                    </span>
                                </div>
                            })
                        ) : (<></>)
                    }
                    <button class='btn btn-primary' onClick={()=>{console.log(action,selectedMarketplaces)}}>Confirm</button>
                </div>

                {/* Filters section starts from here */}
                <div class="filters">
                    {/* ROW1 of Filters section starts from here */}
                    <div class="row1">
                        <label>Per Page</label>
                        <select onChange={(e) => { setPerPage(e.target.value) }}>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='50'>50</option>
                        </select>

                        <input type='text' placeholder='Search By Name' onChange={(e) => { setFilter({ 'search': e.target.value }) }} />
                        <button class="btn btn-primary" onClick={() => { fetchData() }}>Search</button>
                    </div>
                    {/* ROW1 of Filters section ends from here */}

                    {/* ROW2 of Filters section starts from here */}
                    <div class="row2">
                        <select class="select_category" value={'category' in urlParams ? urlParams['category'] : ''} onChange={(e) => { setFilter({ 'category': e.target.value }); setEvent2(!event2) }}>
                            <option value=''>Select By Category</option>
                            {
                                Object.values(wooCat).map((cat) => {
                                    return <option value={cat.slug}>{cat.name}</option>
                                })
                            }
                        </select>
                        <select value={'type' in urlParams ? urlParams['type'] : ''} onChange={(e) => { setFilter({ 'type': e.target.value }); setEvent2(!event2) }}>
                            <option value=''>Filter By Product Type</option>
                            <option value='simple'>simple</option>
                            <option value='variable'>Variable</option>
                            <option value='grouped'>Grouped</option>
                            <option value='external'>External</option>
                        </select>
                        <select value={'stock_status' in urlParams ? urlParams['stock_status'] : ''} onChange={(e) => { setFilter({ 'stock_status': e.target.value }); setEvent2(!event2) }}>
                            <option value=''>Filter By Stock Status</option>
                            <option value='instock'>In Stock</option>
                            <option value='outofstock'>Out Of Stock</option>
                            <option value='onbackorder'>On BackOrder</option>
                        </select>

                        <button class="btn btn-primary" onClick={() => { fetchData() }}>Filter</button>
                        <button class="btn btn-danger reset_filter1" onClick={() => { ResetAllFilter() }}>Reset Filters</button>

                        <button className="btn btn-primary" onClick={() => {

                            if (pageNumber > 1) {
                                console.log("prevoius page data");
                                let currentPage = pageNumber - 1;
                                setPageNumber(currentPage);
                            }
                        }}>Previous Page</button>
                        {pageNumber}

                        <button className="btn btn-primary next_page" onClick={() => {
                            if (totalPages > pageNumber) {
                                let currentPage = pageNumber + 1;
                                setPageNumber(currentPage);
                            }
                        }}>Next Page</button>
                    </div>
                    {/* ROW2 of Filters section starts from here */}
                </div>
                {/* Filters section ends from here */}

                {/* Product Table starts from here  */}
                <table id="example" className="display">
                     {/* Head section of Table starts from here  */} 
                    <thead>
                        <tr>
                            <th><input type='checkbox' onChange={(e) => { console.log(e.target.checked); all_checked(e.target.checked) }} /></th>
                            <th>Product Image</th>
                            <th scope="col"> Name</th>
                            <th scope="col">SKU</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Categories</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                      {/* Head section of Table ends here  */} 

                       {/* Body section of Table starts from here  */} 
                    <tbody>
                        {products.map((item, key) =>

                            <tr>
                                <td><input type="checkbox" id={'checkbox-' + key} checked={ 'checkbox-' + item.id in allCheckboxes ? allCheckboxes['checkbox-' + item.id] : false }
                                    onChange={(e) => { console.log(e, e.target.checked); setIndividualCheckbox(['checkbox-' + item.id, e.target.checked]); }} /></td>
                                <td><img src={item.images.length > 0 ? item.images[0].src : ''} width='50px' height="50px" alt="product_image" ></img></td>
                                <td >{item.name}</td>
                                <td>{item.sku}</td>
                                <td>{item.stock_status.charAt(0).toUpperCase() + item.stock_status.slice(1)} </td>
                                <td> ${item.price}</td>
                                <td>{item.categories.map((cat) => {
                                    return <span>{cat.name},</span>
                                })}</td>
                                <td>{item.tags.map((tag) => {
                                    return <span>{tag.name},</span>
                                })}</td>
                                <td> {item.date_created}</td>

                            </tr>

                        )}
                    </tbody>
                      {/* Body section of Table ends here  */} 

                       {/* Foot section of Table starts from here  */} 
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th scope="col"> Name</th>
                            <th scope="col">SKU</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Categories</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Date</th>
                        </tr>
                    </tfoot>
                      {/* Foot section of Table ends here  */}  
                </table>
                  {/* Product Table ends here  */}
             
                 {/* Pagination starts from here */}
                <button className="btn btn-primary" onClick={() => {

                    if (pageNumber > 1) {
                        console.log("prevoius page data");
                        let currentPage = pageNumber - 1;
                        setPageNumber(currentPage);
                    }
                }}>Previous Page</button>
                {pageNumber}
                <button className="btn btn-primary next_page" onClick={() => {
                    if (totalPages > pageNumber) {
                        let currentPage = pageNumber + 1;
                        setPageNumber(currentPage);
                    }
                }}>Next Page</button>
                 {/* Pagination ends from here */}
            </div>) 
            : 
            // Loading section
            (<img src={url_obj.app_path + '/build/images/loading.gif'} alt='Loading' width='50px' height='50px' />)
    )
}

export default Products
