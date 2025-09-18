import {Router, Route, useNavigate} from "react-router-dom";

function InspectionChecklist(){

    return (

        <div className="inspection_checklist">
            <div className="circlechecklist">호실<hr/>개인책상, 옷장 위, 방바닥, 머리카락</div>
            <div className="circlechecklist">세면대<hr/>물때, 곰팡이, 거울, 거름망</div>
            <div className="circlechecklist">샤워실<hr/>물때, 곰팡이, 하수구 배수통</div>
            <div className="circlechecklist">화장실<hr/>변기, 커버, 바닥</div>
            <div className="circlechecklist">출입구<hr/>신발장, 출입구, 머리카락</div>
            <div className="circlechecklist">창틀<hr/>먼지</div>
        </div>
    )
}


export default InspectionChecklist;