import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

const CedMarketplaces = () => {

    const currentGlobalState = useSelector(state => state);

    console.log(currentGlobalState)
    // const dispatch = useDispatch();

    const url_obj = currentGlobalState.first.wordpress_details;
    console.log(url_obj);


    return (

        <div class="cards">
            {
                Object.keys(url_obj.marketplaces).map((marketplace_name) => {

                    if (!url_obj.marketplaces[marketplace_name]['exists']) {
                        return (
                            <>
                                <div class="card marketplace_card" >
                                    <img src={url_obj.app_path + '/build/marketplace-images/' + marketplace_name + '-card.png'} class="card-img-top" alt={marketplace_name} />
                                    <div class="card-body">
                                        <h5 class="card-title">{marketplace_name.charAt(0).toUpperCase() + marketplace_name.slice(1)}</h5>

                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Verify
                                        </button>

                                        {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Connect
                                        </button> */}

                                    </div>
                                </div>
                            </>
                        )
                    }

                    return null

                })
            }

          
        </div >

    )
}


export default CedMarketplaces;