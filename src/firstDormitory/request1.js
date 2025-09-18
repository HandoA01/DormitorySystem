import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { db } from '../firebase.js'; // firebase.js 파일 경로
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore'; // 추가 필요


function Request1({ dormitoryData, setDormitoryData }) {
    const { dormitoryKey } = useParams();

    const [students, setStudents] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    // const handleSubmit = async () => {
    //     const updatedStudents = students.map(s =>
    //         selectedIds.includes(s.id)
    //             ? { ...s, participated: true }
    //             : { ...s, participated: false }
    //     );
    //
    //     setDormitoryData({
    //         ...dormitoryData,
    //         [dormitoryKey]: updatedStudents
    //     });
    //
    //     alert("참여 상태 업데이트 완료!");
    //     setSelectedIds([]);
    // };

    const handleSubmit = async () => {
        if (!dormitoryKey) {
            alert('호실 정보가 없습니다.');
            return;
        }

        try {
            const updatedStudents = students.map(s => ({
                ...s,
                participated: selectedIds.includes(s.id),
            }));

            const updatedStudentsMap = {};
            updatedStudents.forEach(({ id, ...info }) => {
                updatedStudentsMap[id] = info;
            });

            const docRef = doc(db, 'firstDormitory', '139');
            // 이 위 코드 오류 고쳐야함
            // 제출 했으니까 participated 최상위 필드도 true로 변경되게만들자
            await updateDoc(docRef, {
                students: updatedStudentsMap,
                participated: true,  // submit 눌렀으니 true로 변경 주의
                completed: false,
                timestamp: new Date()
            });

            alert("참여 상태가 저장되었습니다.");
            setSelectedIds([]);
            setStudents(updatedStudents);

        } catch (error) {
            console.error("점검 요청 처리 중 오류:", error);
            alert("점검 요청 처리에 실패했습니다." + error.message);
        }//예외처리 오류가 뭐니
    };



    // 업데이트 해야되는 부분
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'firstDormitory', "139"); // ← 문서 ID
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const studentsMap = docSnap.data().students || {};
                const studentList = Object.entries(studentsMap).map(([id, info]) => ({
                    id,
                    ...info
                }));
                setStudents(studentList);
            } else {
                console.warn("문서가 존재하지 않습니다.");
            }
        };

        fetchData();
    }, [dormitoryKey]);



    return (
        <div className="dormitory_select">
            {students
                .filter(student => student.name && student.id)  // 이름과 학번이 모두 존재할 때만 표시
                .map(student => (
                    <div key={student.id} className="dormitory_people_style">                    <div className="text">
                        {student.name}<br/>
                        {student.major || student.department}<br/>
                        {student.id}<br/>
                        <button
                            onClick={() => toggleSelect(student.id)}
                            style={{
                                backgroundColor: "#3F7AB5",
                                width: "100px",
                                height: "30px",
                                borderRadius: "30px",
                                borderStyle: "none",
                            }}
                        >
                            {selectedIds.includes(student.id) ? "선택됨" : "SELECT"}
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={handleSubmit}
                style={{
                    backgroundColor: "#3F7AB5",
                    width: "100px",
                    height: "30px",
                    borderRadius: "30px",
                    borderStyle: "none",
                    marginTop: "20px",
                    cursor: selectedIds.length === 0 ? "not-allowed" : "pointer"
                }}
                disabled={selectedIds.length === 0}
            >
                SUBMIT
            </button>
        </div>
    );
}

export default Request1;

