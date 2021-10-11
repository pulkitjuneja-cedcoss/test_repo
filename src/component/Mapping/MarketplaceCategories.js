import react from 'react';


const MarketplaceCategories = (props) => {

    const {marketCategories} = props;
    console.log(marketCategories);

    return (
        <div>
            <h3>Marketplace Category</h3>
            {
                console.log(marketCategories)
            }
            {
               marketCategories !== undefined ? (
                    Object.keys(marketCategories).map((e) => {
                        console.log('done', e);
                        return (<div>
                            <label>{e.charAt(0).toUpperCase() + e.slice(1)}</label>
                            <select>
                                <option value={marketCategories[e]}>{marketCategories[e]}</option>
                            </select>
                        </div>
                        )
                    })
                ) : (<></>)
            }
        </div>

    )

}


export default MarketplaceCategories