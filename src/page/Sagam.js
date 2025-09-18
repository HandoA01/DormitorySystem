import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // firebase.js 경로 맞게 조정
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    orderBy,
} from 'firebase/firestore';

function Sagam() {
    // 점검 신청된 방 리스트 상태
    const [applicationData, setApplicationData] = useState([]);

    // 선택된 방 번호 상태
    const [selectedRoom, setSelectedRoom] = useState(null);

    // 체크리스트 상태 (체크 여부)
    const [checklist, setChecklist] = useState({
        세면대: false,
        샤워실: false,
        호실: false,
        창틀: false,
        출입구: false,
        화장실: false,
    });

    // Firestore에서 참여했지만 아직 종료되지 않은 점검 신청 데이터 불러오기
    useEffect(() => {
        const q = collection(db, 'firstDormitory');

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs
                .filter((doc) => {
                    const d = doc.data();
                    return d.participated === true && d.completed === false;
                })
                .map((doc) => ({
                    id: doc.id,          // ← "139" 같은 호실번호
                    ...doc.data()
                }));

            setApplicationData(data);
        });

        return () => unsubscribe();
    }, []);


    // 방 버튼 클릭 시 해당 방 체크리스트 보여주기
    const handleRoomClick = (room) => {
        console.log("Clicked room:", room);
        setSelectedRoom(room);

        const roomInfo = applicationData.find((item) => item.id === room);
        console.log("Found roomInfo:", roomInfo);

        if (roomInfo && roomInfo.checklistResult) {
            const filteredResult = Object.fromEntries(
                Object.entries(roomInfo.checklistResult).filter(([key]) =>
                    ["세면대", "샤워실", "창틀", "출입구", "호실", "화장실"].includes(key)
                )
            );

            setChecklist({
                세면대: false,
                샤워실: false,
                창틀: false,
                출입구: false,
                호실: false,
                화장실: false,
                ...filteredResult, // ← 유효한 데이터만 덮어쓰기
            });
        }

    };



    // 체크박스 변경 이벤트
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setChecklist((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // 종료 버튼 클릭 시 체크리스트 저장 & 버튼 삭제
    const handleFinish = async () => {
        if (!selectedRoom) return;

        try {
            const docRef = doc(db, 'firstDormitory', selectedRoom);

            await updateDoc(docRef, {
                checklistResult: checklist,
                completed: true,
                completedAt: new Date()
            });

            alert(`${selectedRoom}호 점검이 완료되었습니다!`);
            setSelectedRoom(null);
            setChecklist({
                샤워실: false,
                세면대: false,
                창틀: false,
                출입구: false,
                호실: false,
                화장실: false,
            });

        } catch (error) {
            console.error('점검 완료 처리 중 오류 발생:', error);
            alert('점검 완료 처리에 실패했습니다.');
        }
    };


    return (

        <div style={{ padding: '20px', color: 'white' }}>
            <h1>사감 점검 페이지</h1>

            {/* 점검 신청된 방 리스트 버튼 */}
            <div style={{ marginBottom: '20px' }}>
                {applicationData.length === 0 && <p>현재 점검 신청된 방이 없습니다.</p>}

                {applicationData.map((item) => (
                    <button
                        key={item.id}
                        style={{
                            marginRight: '10px',
                            marginBottom: '10px',
                            padding: '10px 15px',
                            backgroundColor: selectedRoom === item.roomNumber ? '#3F7AB5' : '#555',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleRoomClick(item.id)}
                    >
                        {item.id}호 점검
                    </button>
                ))}
            </div>

            {/* 체크리스트 영역 */}
            {selectedRoom && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh', // 중앙 정렬 효과를 위한 최소 높이
                }}
                     >
                <div
                    style={{
                        backgroundColor: '#222',
                        padding: '20px',
                        borderRadius: '10px',
                        maxWidth: '400px',
                    }}
                >
                    <h2>{selectedRoom}호 점검 체크리스트</h2>

                    <label>
                        <input
                            type="checkbox"
                            name="세면대"
                            checked={checklist.세면대}
                            onChange={handleCheckboxChange}
                        />
                        세면대 점검
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="샤워실"
                            checked={checklist.샤워실}
                            onChange={handleCheckboxChange}
                        />
                        샤워실 점검
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="창틀"
                            checked={checklist.창틀}
                            onChange={handleCheckboxChange}
                        />
                        창틀 점검
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="출입구"
                            checked={checklist.출입구}
                            onChange={handleCheckboxChange}
                        />
                        출입구 점검
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="호실"
                            checked={checklist.호실}
                            onChange={handleCheckboxChange}
                        />
                        호실 점검
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="화장실"
                            checked={checklist.화장실}
                            onChange={handleCheckboxChange}
                        />
                        화장실 점검
                    </label>
                    <br />

                    <button
                        onClick={handleFinish}
                        style={{
                            marginTop: '15px',
                            padding: '10px 20px',
                            backgroundColor: '#3F7AB5',
                            borderRadius: '30px',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        종료
                    </button>
                </div>
                </div>
            )}
        </div>
    );
}

export default Sagam;
//
// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
//
// function Sagam() {
//     const dorm = 'firstDormitory';
//     const [rooms, setRooms] = useState([]);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const fetch = async () => {
//             const snap = await getDocs(collection(db, dorm));
//             setRooms(
//                 snap.docs
//                     .map(d => ({ id: d.id, ...d.data() }))
//                     .filter(r => r.participated && !r.completed)
//             );
//         };
//         fetch();
//     }, []);
//
//     return (
//         <div>
//             <h2>점검 신청된 호실</h2>
//             {rooms.length === 0 ? (
//                 <p>신청된 방이 없습니다.</p>
//             ) : (
//                 rooms.map(r => (
//                     <button key={r.id} onClick={() => navigate(`/checklist/${r.id}`)}>
//                         {r.id}호
//                     </button>
//                 ))
//             )}
//         </div>
//     );
// }
//
// export default Sagam;

