import react, { useState } from 'react'
// import marketplaces from '../../data/marketplaces';
import WalmartTemplate from '../../marketplace/walmart/WalmartTemplate';
import EtsyTemplate from '../../marketplace/etsy/EtsyTemplate'
import 'intro.js/introjs.css';
import { Steps, Hints } from 'intro.js-react';
import { useContext } from 'react';
import { MyHints } from '../../context';

const NewTemplate = () => {

    const [displayTemplate, setDisplayTemplate] = useState('');
    const [ event, setEvent ] = useState(false);

    const checkbox = useContext(MyHints);

    const showTemplate = (marketplace) => {
        setDisplayTemplate(marketplace)
    }

    const hin = [
         { hint: 'First hint', element: '#hint-1', hintButtonLabel: 'OK' },
         { hint: 'Second hint', element: '#hint-2', hintAnimation: false },
        { hint: 'new', element: '.btn', hintAnimation: false, hintPosition:'middle-middle' }
    ];

    const hint = checkbox ? hin : [];

    return (
        <div>
             <Hints enabled={true} hints={hint} />

            {
                !event ? <button class="btn btn-primary" onClick={()=>{setEvent(true)}}>Add New Template</button> : (
            <div class="select_template_options">
                <select onChange={(e) => { showTemplate(e.target.value) }}>
                    <option value="Select">Select</option>
                    <option value="Walmart">Walmart</option>
                    <option value="Etsy">Etsy</option>
                </select>
                <button class="btn btn-primary" onClick={()=>{ setEvent(false); setDisplayTemplate('') }}>Cancel</button>
            </div>
            )
            }

            {displayTemplate === 'Walmart' ? <WalmartTemplate /> : <></>}
            {displayTemplate === 'Etsy' ? <EtsyTemplate /> : <></>}
        </div>
    )

}

export default NewTemplate;