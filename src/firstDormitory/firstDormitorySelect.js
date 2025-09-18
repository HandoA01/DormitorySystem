
import React from 'react';
import {useNavigate} from "react-router-dom";


function FirstDormitorySelect() {

    let navigate = useNavigate();

    return (
        <>
            <div className="welcome_style">FIRST DORMITORY</div>

            <div className="inspection_checklist">
                <button className="circlechecklist"
                        onClick={()=>{ navigate('/Request1/firstDormitory')}}>inspection
                    request</button>
                <button className="circlechecklist"
                        onClick={() => navigate('/firstDormitoryResult/139')}
                >result</button>
                <button className="circlechecklist"
                        onClick={() => navigate('/firstDormitoryStatement1')}
                >explanatory
                    statement</button>
            </div>
        </>
)
}

export default FirstDormitorySelect;