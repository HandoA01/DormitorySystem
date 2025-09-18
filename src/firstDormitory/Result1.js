// //
// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { db } from "../firebase";
// // import { doc, getDoc } from "firebase/firestore";
// //
// // function Result() {
// //     const { dormitoryKey } = useParams();
// //     const [checklistResult, setChecklistResult] = useState(null);
// //     const [completed, setCompleted] = useState(false);
// //     const [loading, setLoading] = useState(true);
// //
// //     useEffect(() => {
// //         const fetchResult = async () => {
// //             try {
// //                 const docRef = doc(db, "firstDormitory", '139');
// //                 const docSnap = await getDoc(docRef);
// //
// //                 if (docSnap.exists()) {
// //                     const data = docSnap.data();
// //                     setChecklistResult(data.checklistResult || null);
// //                     setCompleted(data.completed || false);
// //                 } else {
// //                     console.warn("해당 도미토리 문서가 없습니다.");
// //                 }
// //             } catch (error) {
// //                 console.error("결과 데이터 로드 실패:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //
// //         fetchResult();
// //     }, [dormitoryKey]);
// //
// //     if (loading) return <div>로딩중...</div>;
// //
// //     if (!completed) {
// //         return <div>점검이 아직 완료되지 않았습니다.</div>;
// //     }
// //
// //     if (!checklistResult) {
// //         return <div>점검 결과가 없습니다.</div>;
// //     }
// //
// //     return (
// //         <div>
// //             <h2>점검 결과</h2>
// //             {/* checklistResult 내용을 예쁘게 보여주기 */}
// //             <pre>{JSON.stringify(checklistResult, null, 2)}</pre>
// //         </div>
// //     );
// // }
// //
// // export default Result;
//
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import {
//     doc,
//     getDoc,
//     collection,
//     query,
//     where,
//     orderBy,
//     getDocs
// } from "firebase/firestore";
//
// function Result() {
//     const { dormitoryKey } = useParams();
//     const [checklistResult, setChecklistResult] = useState(null);
//     const [participated, setParticipated] = useState(false);
//     const [completed, setCompleted] = useState(false);
//     const [inspectionOrder, setInspectionOrder] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchResult = async () => {
//             try {
//                 const docRef = doc(db, "firstDormitory", dormitoryKey); // 예: '139'
//                 const docSnap = await getDoc(docRef);
//
//                 if (docSnap.exists()) {
//                     const data = docSnap.data();
//                     setChecklistResult(data.checklistResult || null);
//                     setParticipated(data.participated || false);
//                     setCompleted(data.completed || false);
//
//                     // 만약 participated는 true이고 completed는 false라면 대기 순서 가져오기
//                     if (data.participated && !data.completed) {
//                         const dormCollection = collection(db, "firstDormitory");
//                         const q = query(
//                             dormCollection,
//                             where("participated", "==", true),
//                             where("completed", "==", false),
//                             orderBy("timestamp", "asc")
//                         );
//                         const snapshot = await getDocs(q);
//                         const dormList = snapshot.docs.map((doc) => ({
//                             id: doc.id,
//                             ...doc.data()
//                         }));
//
//                         const idx = dormList.findIndex((d) => d.id === dormitoryKey);
//                         if (idx !== -1) {
//                             setInspectionOrder(idx + 1);
//                         }
//                     }
//                 } else {
//                     console.warn("해당 도미토리 문서가 없습니다.");
//                 }
//             } catch (error) {
//                 console.error("결과 데이터 로드 실패:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchResult();
//     }, [dormitoryKey]);
//
//     if (loading) return <div>로딩중...</div>;
//
//     if (!participated && !completed) {
//         return <div>점검 신청이 되지 않았습니다.</div>;
//     }
//
//     if (participated && !completed) {
//         return (
//             <div>
//                 <div>점검이 아직 완료되지 않았습니다.</div>
//                 {inspectionOrder !== null && (
//                     <div>현재 <strong>{inspectionOrder}</strong>번째로 대기 중입니다.</div>
//                 )}
//
//             </div>
//         );
//     }
//
//     if (participated && completed) {
//         return (
//             <div>
//                 <h2>점검 결과</h2>
//                 {checklistResult ? (
//                     <pre>{JSON.stringify(checklistResult, null, 2)}</pre>
//                 ) : (
//                     <div>점검 결과가 없습니다.</div>
//                 )}
//             </div>
//         );
//     }
//
//     return <div>예상치 못한 상태입니다.</div>;
// }
//
// export default Result;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs
} from "firebase/firestore";

function Result() {
    const { dormitoryKey } = useParams();
    const [checklistResult, setChecklistResult] = useState(null);
    const [participated, setParticipated] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [inspectionOrder, setInspectionOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const docRef = doc(db, "firstDormitory", dormitoryKey);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setChecklistResult(data.checklistResult || null);
                    setParticipated(data.participated || false);
                    setCompleted(data.completed || false);

                    if (data.participated && !data.completed) {
                        const dormCollection = collection(db, "firstDormitory");
                        const q = query(
                            dormCollection,
                            where("participated", "==", true),
                            where("completed", "==", false),
                        );
                        const snapshot = await getDocs(q);
                        const dormList = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }));

                        console.log("대기중인 방 목록:", dormList.map(d => d.id));
                        console.log("현재 dormitoryKey:", dormitoryKey);

                        const idx = dormList.findIndex((d) => d.id === dormitoryKey);
                        console.log("내 순서 인덱스:", idx);

                        if (idx !== -1) {
                            setInspectionOrder(idx + 1);
                        }
                    }
                } else {
                    console.warn("해당 도미토리 문서가 없습니다.");
                }
            } catch (error) {
                console.error("결과 데이터 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [dormitoryKey]);

    if (loading) return <div>로딩중...</div>;

    if (!participated && !completed) {
        return <div>점검 신청이 되지 않았습니다.</div>;
    }

    if (participated && !completed) {
        return (
            <div>
                <div>점검이 아직 완료되지 않았습니다.</div>
                {inspectionOrder !== null ? (
                    <div>현재 <strong>{inspectionOrder}</strong>번째로 대기 중입니다.</div>
                ) : (
                    <div>대기 순서를 불러오는 중 문제가 발생했습니다.</div>
                )}
            </div>
        );
    }

    // if (participated && completed) {
    //     return (
    //         <div style={{ padding: '30px', textAlign: 'center' }}>
    //             <h2 style={{ marginBottom: '30px', color: '#3F7AB5' }}>🎉 점검 결과 확인</h2>
    //             {checklistResult ? (
    //                 <div style={{
    //                     display: 'flex',
    //                     flexWrap: 'wrap',
    //                     justifyContent: 'center',
    //                     gap: '20px'
    //                 }}>
    //                     {Object.entries(checklistResult).map(([item, result], index) => (
    //                         <div
    //                             key={index}
    //                             style={{
    //                                 border: '2px solid #ddd',
    //                                 borderRadius: '10px',
    //                                 padding: '20px',
    //                                 width: '200px',
    //                                 backgroundColor: result === '불량' ? '#ffe6e6' : '#e6ffe6',
    //                                 boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
    //                             }}
    //                         >
    //                             <h4 style={{ marginBottom: '10px' }}>{item}</h4>
    //                             <p style={{
    //                                 color: result === '불량' ? '#cc0000' : '#006600',
    //                                 fontWeight: 'bold',
    //                                 fontSize: '16px'
    //                             }}>
    //                                 {result}
    //                             </p>
    //                         </div>
    //                     ))}
    //                 </div>
    //             ) : (
    //                 <div>점검 결과가 없습니다.</div>
    //             )}
    //         </div>
    //     );
    // }
    if (participated && completed) {
        return (
            <div style={{
                padding: '40px',
                fontFamily: "'Pretendard', sans-serif",
                backgroundColor: 'black',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '100vh',   // 수직 가운데 정렬을 위한 높이
                boxSizing: 'border-box'
            }}>
                {/* 구분선 */}
                <div style={{
                    height: '2px',
                    backgroundColor: '#444',
                    marginBottom: '20px'
                }} />

                {/* 제목 */}
                <h2 style={{
                    marginBottom: '30px',
                    fontSize: '32px',
                    fontWeight: '800',
                    background: 'linear-gradient(to right, #3F7AB5, #9BA9FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    점검 결과 확인
                </h2>

                {/* 카드 영역 */}
                {checklistResult ? (
                    <div className="checklist-scroll-container"
                        style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '20px',
                        paddingBottom: '10px'
                    }}>
                        {Object.entries(checklistResult).map(([item, result], index) => (
                            <div
                                key={index}
                                className="checklist-card"
                                style={{
                                    minWidth: '240px',
                                    flex: '0 0 auto',
                                    borderRadius: '20px',
                                    backgroundColor: '#1a1a1a',
                                    borderTop: `8px solid ${result === false ? '#FFD6D6' : '#D6FFE6'}`,
                                    padding: '20px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                <h4 style={{
                                    fontSize: '18px',
                                    marginBottom: '10px',
                                    color: '#ffffff',
                                    fontWeight: '600'
                                }}>{item}</h4>
                                <p style={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: result === false ? '#FF5A5A' : '#00CC66',
                                }}>
                                    {result === false ? '재검' : '통과'}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>점검 결과가 없습니다.</div>
                )}
            </div>
        );
    }




    return <div>예상치 못한 상태입니다.</div>;
}

export default Result;
