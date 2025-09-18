// src/components/Request.js
import React, { useState } from "react";

function Request({ dormitoryKey, dormitoryData, setDormitoryData }) {
    const [selectedIds, setSelectedIds] = useState([]);

    const residents = dormitoryData[dormitoryKey].residents;

    const toggleSelect = (id, excused) => {
        if (excused) return;
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const submit = () => {
        const newSubmitted = [
            ...dormitoryData[dormitoryKey].submitted,
            ...selectedIds
                .filter(
                    (id) => !dormitoryData[dormitoryKey].submitted.find((s) => s.residentId === id)
                )
                .map((id) => ({ residentId: id, completed: false })),
        ];

        setDormitoryData({
            ...dormitoryData,
            [dormitoryKey]: {
                ...dormitoryData[dormitoryKey],
                submitted: newSubmitted,
            },
        });

        setSelectedIds([]);
        alert("신청이 제출되었습니다.");
    };

    return (
        <div>
            <h3>{dormitoryKey} - 호실점검 신청</h3>
            {residents.map((res) => (
                <div key={res.id} style={{ marginBottom: "10px" }}>
                    <div>
                        {res.name} / {res.dept} / {res.studentNum}{" "}
                        {res.excused && <span style={{ color: "red" }}>불참</span>}
                    </div>
                    <button
                        onClick={() => toggleSelect(res.id, res.excused)}
                        disabled={res.excused}
                        style={{
                            backgroundColor: selectedIds.includes(res.id) ? "green" : "#3F7AB5",
                            color: "white",
                            cursor: res.excused ? "not-allowed" : "pointer",
                        }}
                    >
                        {selectedIds.includes(res.id) ? "선택됨" : "선택"}
                    </button>
                </div>
            ))}
            <button onClick={submit} disabled={selectedIds.length === 0}>
                제출
            </button>
        </div>
    );
}

export default Request;
