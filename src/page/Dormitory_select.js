import {Router, Route, useNavigate} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../App";
import bg1 from '../room1.png';
import bg2 from '../room2.png';
import bg3 from '../room3.png';

function Dormitory_select(){

    let navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleClick = (path) => {
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }
        navigate(path);
    };

    return (

        <div className="dormitory_select">
            <button className="dormitory_button_style"
                    onClick={()=>{ handleClick('/firstDormitorySelect')}}
                >
                <div className="box1" style={{ backgroundImage: 'url(' + bg1 + ')' , backgroundSize: "cover"}}>.</div>
                FIRST DORMITORY</button>
            <button className="dormitory_button_style"
                    onClick={()=>{ handleClick('/secondDormitorySelect')}}
            >
                <div className="box1" style={{ backgroundImage: 'url(' + bg2 + ')', backgroundSize: "cover"}}>.</div>
                SECOND DORMITORY</button>
            <button className="dormitory_button_style"
                    onClick={()=>{ handleClick('/thirdDormitorySelect')}}
            >
                <div className="box1" style={{ backgroundImage: 'url(' + bg3 + ')' , backgroundSize: "cover"}}>.</div>
                THIRD DORMITORY</button>
        </div>
    )
}


export default Dormitory_select;