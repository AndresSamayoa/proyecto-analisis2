import './ComboboxSearch.css'

import { useState } from 'react';

export default function ComboboxSearch (props) {

    const [isOpen, setIsOpen] = useState(false); 

    const changeSearcher = (e) => {
        props.setSearcher(e.target.value)
    }

    return <div className="chbxSearcher">
        <input 
            className="chbxSearcherInput"
            value={props.searcher}
            onChange={changeSearcher}
            onFocus={()=>setIsOpen(true)}
            onBlur={()=>setIsOpen(false)}
        />
        <div>
        {
            (() => {
                const data = [];
                for (const element of props.elements) {
                    data.push(
                        <div 
                            className="chbxSearcherElement"
                            key={`${element.label}-${element.value}`}
                            onClick={()=>{props.setValue(element.value)}}
                        >
                            {element.label}
                        </div>
                    );
                }

                return <div className={`chbxSearcherElementList chbxSearcher${isOpen ? 'open' : 'hidden'}`}>{data}</div>
            })()
        }
        </div>
    </div>
} 
