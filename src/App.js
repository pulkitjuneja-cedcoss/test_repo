import './App.css';
import Header from './component/Header';
import MarketplaceCard from './component/MarketplaceCard';
import Footer from './component/Footer';
import Mapping from './component/Mapping/Mapping'
import Configuration from './component/Configuration/Configuration.js';
import Products from './component/Product/Products'
import Category from './component/Mapping/Category'
import General from './component/Mapping/General';
import Template from './component/Templates/Template'
import Orders from './component/order/Orders'
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App(props) {

  const [ reactPage, setReactPage] = useState('');
  const currentGlobalState = useSelector(state => state);
  console.log(currentGlobalState)
  const dispatch = useDispatch();
  const url_obj = JSON.parse(props.data);

  let page = window.location.href.replace(url_obj.app_url + '/wp-admin/admin.php?page=', "");
  let index = page.indexOf('&');
  let current_page = index > 0 ? page.slice(0, index) : page;
  let { data } = props;
  let wordpress_urls = JSON.parse(data);

  useEffect(() => {
    console.log('called useffect')
    dispatch({ type: "details_exist", details: wordpress_urls })
    setReactPage(current_page)
  }, [])

  console.log("appppppp", props.data) 
  console.log(page);
  console.log("indexof", index)
  console.log(current_page);
  console.log(url_obj);
  console.log(wordpress_urls);
  console.log(currentGlobalState)
  console.log(currentGlobalState.first.wordpress_details)
  console.log(reactPage);


  return (

    <div className="App">
        { reactPage === 'ced_sales_channel' && <><Header name='CEDCOMMERCE INTEGRATIONS' /> <MarketplaceCard />  <Footer /> </> }
        { reactPage === 'configuration' && <Configuration /> }
        { reactPage === 'mapping' && <Mapping /> }
        { reactPage === 'products' && <Products /> }
        { reactPage === 'mapping&section=category' && <Category />}
        { reactPage === 'mapping&section=general' && <General /> }
        { reactPage === 'templates' && <Template /> }
        { reactPage === 'orders' && <Orders />}
        { reactPage === '' && <></> }

    </div>
    
  );
}

export default App;
