// src/page/CheckRoom.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const items = ["호실", "세면대", "샤워실", "화장실", "출입구", "창틀"];

function CheckRoom() {
    const { roomNumber, appId } = useParams();
    const [checkedItems, setCheckedItems] = useState({});
    const navigate = useNavigate();

    const toggleItem = (item) => {
        setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
    };

    const handleFinish = async () => {
        const appRef = doc(db, "applications", appId);
        await updateDoc(appRef, {
            checklistResult: checkedItems,
            completed: true
        });
        alert("체크리스트 저장 및 종료 처리되었습니다.");
        navigate("/Sagam"); // 돌아가기
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>호실점검 – {roomNumber}</h2>
            {items.map(item => (
                <div key={item}>
                    <label>
                        <input
                            type="checkbox"
                            checked={checkedItems[item] || false}
                            onChange={() => toggleItem(item)}
                        /> {item}
                    </label>
                </div>
            ))}
            <br />
            <button onClick={handleFinish} style={{ padding: "10px 20px" }}>종료</button>
        </div>
    );
}

export default CheckRoom;
