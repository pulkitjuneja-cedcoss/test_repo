import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [perPage, setPerPage] = useState('5');
    const [pageNumber, setPageNumber] = useState(1);
    const [event, setEvent] = useState(false);
    const [event2, setEvent2] = useState(false);
    const [urlParams, setUrlParams] = useState({});
    const [allCheckboxes, setAllCheckboxes] = useState({ 'checkbox-0': false, 'checkbox-1': false, 'checkbox-2': true, 'checkbox-3': false, 'checkbox-4': false, 'checkbox-5': false, 'checkbox-6': false, 'checkbox-7': false, 'checkbox-8': false, 'checkbox-9': false, 'checkbox-10': false })
   
    const currentGlobalState = useSelector(state => state);
    // const dispatch = useDispatch();

    const url_obj = currentGlobalState.first.wordpress_details;

    

    const fetchData = async () => {

        let urlString2 = '';
        let urlString1 = 'per_page=' + perPage + '&page=' + pageNumber + '&';

        Object.keys(urlParams).map((parameter) => {
            if (urlParams[parameter] !== '') {
                if( parameter === 'before' || parameter === 'after' ){
                    urlString2 = urlString2 + parameter + '=' + urlParams[parameter] + 'T00:00:00&';  
                }
                else{
                    urlString2 = urlString2 + parameter + '=' + urlParams[parameter] + '&';
                }
            }
            return null
        })

        setIsLoadingMore(true);

        await axios.get(
            'https://demo.cedcommerce.com/woocommerce/woocommerce-headless/wp-json/wc/v3/orders?' + urlString1 + urlString2 + 'consumer_key=ck_ac7fab728e45ffbce1e4cb1aa00e2c62e7fca84d&consumer_secret=cs_570f0302d78f09d0a73410991296fe79d208d314'
        ).then((response) => {
            console.log(response.data)
            setOrders(response.data);
            setTotalPages(parseInt(response.headers['x-wp-totalpages']));

        }).catch((error) => { console.log(error) })

        setIsLoadingMore(false);
    }

    useEffect(() => { fetchData(); }, [event, pageNumber, perPage])
  
    const setFilter = (obj) => {
        console.log("object", obj);
        Object.keys(obj).map((key) => { urlParams[key] = obj[key]; })
        setPageNumber(1);
        setUrlParams(urlParams);
        // setEvent(!event);
    }

    const ResetAllFilter = () => {
        setPageNumber(1);
        setUrlParams({});
        setEvent(!event);
    }

    // const woo_cat = () => {

    //     axios.get('https://demo.cedcommerce.com/woocommerce/woocommerce-test-demo/connector-data/woocat.php')
    //         .then((resp) => {
    //             console.log(resp);
    //             setWooCat(resp.data)

    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }

    const setIndividualCheckbox = (check) => {
        console.log('checkbox', check);
        let temp = check[0];
        allCheckboxes[temp] = check[1];
        setAllCheckboxes(allCheckboxes);
        setEvent2(!event2);
    }

    const all_checked = (value) => {
        Object.keys(allCheckboxes).map((item) => {
            allCheckboxes[item] = value
        })
        setAllCheckboxes(allCheckboxes);
        setEvent2(!event2);
    }


    return (
        !isLoadingMore ?
            (<div>
                <div class="filters">
                    <div class="row3">
                        <label>Per Page</label>
                        <select onChange={(e) => { setPerPage(e.target.value) }}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='5'>5</option>
                        </select>

                        <input type='text' placeholder='Search By Name' onChange={(e) => { setFilter({ 'search': e.target.value }) }} />
                        <button class="btn btn-primary" onClick={() => { fetchData() }}>Search</button>


                        <button className="btn btn-primary" onClick={() => {

                            if (pageNumber > 1) {
                                console.log("prevoius page data");
                                let currentPage = pageNumber - 1;
                                setPageNumber(currentPage);
                            }
                        }}><i className="fa fa-angle-left" >{''}Previous Page</i></button>
                        {/* <li>  */} {pageNumber} {/* </li> */}

                        <button className="btn btn-primary next_page" onClick={() => {
                            if (totalPages > pageNumber) {
                                let currentPage = pageNumber + 1;
                                setPageNumber(currentPage);
                            }
                        }}><i className="fa fa-angle-right">{''}Next Page</i></button>

                    </div>
                    <div class="row4">
                        <label class="label_before">Before</label>
                        <input type="date" value={'before' in urlParams ? urlParams['before'] : ''} onChange={(e) => { setFilter({ 'before': e.target.value }); setEvent2(!event2); }} />

                        <label>After</label>
                        <input type="date" value={'after' in urlParams ? urlParams['after'] : ''} onChange={(e) => { setFilter({ 'after': e.target.value }); setEvent2(!event2); }} />

                        <select value={'orderby' in urlParams ? urlParams['orderby'] : ''} onChange={(e) => { setFilter({ 'orderby': e.target.value }); setEvent2(!event2); }}>
                            <option value=''>Sort By </option>
                            <option value='date'>Date</option>
                            <option value='id'>Id</option>
                            {/* <option value='include'>Include</option> */}
                            <option value='title'>Title</option>
                            <option value='slug'>Slug</option>
                        </select>
                        <select value={'status' in urlParams ? urlParams['status'] : ''} onChange={(e) => { setFilter({ 'status': e.target.value }); setEvent2(!event2); }}>
                            <option value=''>Filter By Order Status</option>
                            <option value='pending'>Pending</option>
                            <option value='processing'>Processing</option>
                            <option value='on-hold'>On-Hold</option>
                            <option value='completed'>Completed</option>
                            <option value='cancelled'>Cancelled</option>
                            <option value='refunded'>Refunded</option>
                            <option value='failed'>Failed</option>
                        </select>

                        <button class="btn btn-primary" onClick={() => { fetchData() }}>Filter</button>
                        <button class="btn btn-danger reset_filter2" onClick={() => { ResetAllFilter() }}>Reset Filters</button>

                    </div>
                </div>

                <table id="example" className="display">
                    <thead>
                        <tr>
                            <th><input type='checkbox' onChange={(e) => { console.log(e.target.checked); all_checked(e.target.checked) }} /></th>
                            <th>Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(((item, key) =>

                            <tr>
                                <td><input type="checkbox" id={'checkbox-' + key} checked={allCheckboxes['checkbox-' + key]}
                                    onChange={(e) => { console.log(e, e.target.checked); setIndividualCheckbox(['checkbox-' + key, e.target.checked]); }} /></td>
                                <td >{item.id}</td>
                                <td>{item.date_created}</td>
                                <td>{item.status.charAt(0).toUpperCase() + item.status.slice(1)} </td>
                                <td> {item.currency_symbol}{item.total}</td>
                            </tr>

                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-primary" onClick={() => {

                    if (pageNumber > 1) {
                        console.log("prevoius page data");
                        let currentPage = pageNumber - 1;
                        setPageNumber(currentPage);
                    }
                }}><i className="fa fa-angle-left" >{''}Previous Page</i></button>
                {/* <li>  */} {pageNumber} {/* </li> */}

                <button className="btn btn-primary next_page" onClick={() => {
                    if (totalPages > pageNumber) {
                        let currentPage = pageNumber + 1;
                        setPageNumber(currentPage);
                    }
                }}><i className="fa fa-angle-right">{''}Next Page</i></button>

            </div>) : (<img src={url_obj.app_path + '/build/images/loading.gif'} alt='Loading' width='50px' height='50px' />)
    )
}

export default Orders
