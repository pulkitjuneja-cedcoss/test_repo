
import React, { useState } from "react";
import General from "./General";
import Category from './Category';
import Header from "../Header";


const Mapping = () => {

    const [section, setSection] = useState('new_template');
    
    const switchFunc = () => {
        switch (section) {
            case "general": return <General />
            default: return <Category />;
        }
    }

    return (
        <div class="ced_umb_wrapper">
            <Header name='Mapping' />
            <div class="ced_umb_page_sections_wrap">
                <button class="ced_umb_page_sections" onClick={() => setSection('category')} >Category</button>
                <button class="ced_umb_page_sections" onClick={() => setSection('general')} >General</button>
            </div>
            { switchFunc() }
        </div>
        
    )

}

export default Mapping


