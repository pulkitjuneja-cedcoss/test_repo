import react, { useEffect, useState } from 'react'
import NewTemplate from './NewTemplate';
import SavedTemplate from './SavedTemplate';
// import introJs from 'intro.js';
// import 'intro.js/minified/introjs.min.css'
import 'intro.js/introjs.css';
// import { Steps, Hints } from 'intro.js-react';
// import { useContext } from 'react';
import { MyHints } from '../../context';
import Header from '../Header';


const Template = () => {

    const [section, setSection] = useState('new_template');
    const [checked, setChecked] = useState(true)

    const switchFunc = () => {
        switch (section) {
            case "saved_template": return <SavedTemplate />
            default: return <NewTemplate />;
        }
    }

    // const hints = [ ];
    // useEffect(()=>{
    //     const intro =  introJs();
    //     intro.setOptions({
    //         hints: [
    //             { hint: 'First hint', element: '#hint-1', hintButtonLabel: 'OK' },
    //             { hint: 'Second hint', element: '#hint-2', hintAnimation: false },
    //             { hint: 'new', element: '.btn', hintAnimation: false, hintPosition:'middle-middle' }
    //         ]
    //     });
    //     // intro.setOption("hintButtonLabel", "OKkk");
    //     intro.addHints();
    // },[])

    return (
        <MyHints.Provider value={checked} >

            <div class="ced_umb_wrapper">
                {/* <Hints enabled={true} hints={hints} /> */}

                <Header name='Templates' />
                <input type="checkbox" checked={checked} onChange={() => { setChecked(!checked) }} />
                <label>Turn On Hints</label> 
                <div class="ced_umb_page_sections_wrap">
                    <button class="ced_umb_page_sections" id='hint-1' onClick={() => setSection('new_template')}>New Template</button>
                    <button class="ced_umb_page_sections" id="hint-2" onClick={() => setSection('saved_template')}>Saved Template</button>
                </div>

                {switchFunc()}

            </div>
        </MyHints.Provider>

    )
}

export default Template