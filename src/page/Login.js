// // import React, { useState, useContext } from "react";
// // import { db } from "../firebase";
// // import { collection, query, where, getDocs } from "firebase/firestore";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../App";
// //
// // function Login() {
// //     const [studentId, setStudentId] = useState("");
// //     const [password, setPassword] = useState("");
// //     const { setUser } = useContext(AuthContext);
// //     const navigate = useNavigate();
// //
// //     // const handleLogin = async () => {
// //     //     const q = query(
// //     //         collection(db, "firstDormitory"), // 기숙사별로 수정 가능
// //     //         where("studentNumber", "==", studentId),
// //     //         where("password", "==", password)
// //     //     );
// //     //     const snapshot = await getDocs(q);
// //     //
// //     //     if (!snapshot.empty) {
// //     //         const userData = snapshot.docs[0].data();
// //     //         setUser(userData); // 로그인 정보 저장
// //     //         sessionStorage.setItem("loggedIn", "true"); // 10분 지속
// //     //         setTimeout(() => {
// //     //             sessionStorage.removeItem("loggedIn");
// //     //             setUser(null);
// //     //         }, 10 * 60 * 1000); // 10분 후 자동 로그아웃
// //     //
// //     //         alert("로그인 성공!");
// //     //         navigate("/"); // 홈으로 이동
// //     //     } else {
// //     //         alert("학번 또는 생년월일이 잘못되었습니다.");
// //     //     }
// //     // };
// //
// //
// //
// //     return (
// //         <div style={{ padding: "50px", color: "white" }}>
// //             <h2>로그인</h2>
// //             <input
// //                 placeholder="학번"
// //                 value={studentId}
// //                 onChange={(e) => setStudentId(e.target.value)}
// //             /><br/><br/>
// //             <input
// //                 placeholder="생년월일 (예: 050108)"
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //             /><br/><br/>
// //             <button onClick={handleLogin}>로그인</button>
// //         </div>
// //     );
// // }
// //
// // export default Login;
//
// import React, { useState, useContext } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../App";
//
// function Login() {
//     const [studentId, setStudentId] = useState("");
//     const [password, setPassword] = useState("");
//     const { setUser } = useContext(AuthContext);
//     const navigate = useNavigate();
//
//     const dormitoryDocId = "139";  // 고정하거나, 선택 가능하도록 바꾸기
//
//     const handleLogin = async () => {
//         try {
//             const dormitoryDocId = "139"; // 혹은 실제 ID로 교체
//             const docRef = doc(db, "firstDormitory", dormitoryDocId);
//             const dormDoc = await getDoc(docRef);
//
//             if (!dormDoc.exists()) {
//                 alert("기숙사 문서가 존재하지 않습니다.");
//                 return;
//             }
//
//             const dormData = dormDoc.data();
//             const studentsMap = dormData.students || {};
//
//             const trimmedStudentId = studentId.trim();
//             const trimmedPassword = password.trim();
//
//             const studentInfo = studentsMap[trimmedStudentId];
//
//             if (!studentInfo) {
//                 alert("학번이 존재하지 않습니다.");
//                 return;
//             }
//
//             // 여기를 birthDate -> birth로 변경!
//             if (studentInfo.birth === trimmedPassword) {
//                 setUser({ ...studentInfo, studentNumber: trimmedStudentId });
//                 sessionStorage.setItem("loggedIn", "true");
//                 setTimeout(() => {
//                     sessionStorage.removeItem("loggedIn");
//                     setUser(null);
//                 }, 10 * 60 * 1000);
//                 alert("로그인 성공!");
//                 navigate("/");
//             } else {
//                 alert("생년월일이 잘못되었습니다.");
//             }
//         } catch (error) {
//             console.error("로그인 중 오류 발생:", error);
//             alert("로그인 중 오류가 발생했습니다.");
//         }
//     };
//
//
//
//     return (
//         <div style={{ padding: "50px", color: "white" }}>
//             <h2>로그인</h2>
//             <input
//                 placeholder="학번"
//                 value={studentId}
//                 onChange={(e) => setStudentId(e.target.value)}
//             /><br/><br/>
//             <input
//                 placeholder="생년월일 (예: 050108)"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             /><br/><br/>
//             <button onClick={handleLogin}>로그인</button>
//         </div>
//     );
// }
//
// export default Login;

import React, { useState, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function Login() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const dormitoryDocId = "139";
            const docRef = doc(db, "firstDormitory", dormitoryDocId);
            const dormDoc = await getDoc(docRef);

            if (!dormDoc.exists()) {
                alert("기숙사 문서가 존재하지 않습니다.");
                return;
            }

            const dormData = dormDoc.data();
            const studentsMap = dormData.students || {};

            const trimmedStudentId = studentId.trim();
            const trimmedPassword = password.trim();

            const studentInfo = studentsMap[trimmedStudentId];

            if (!studentInfo) {
                alert("학번이 존재하지 않습니다.");
                return;
            }

            if (studentInfo.birth === trimmedPassword) {
                setUser({ ...studentInfo, studentNumber: trimmedStudentId });
                sessionStorage.setItem("loggedIn", "true");
                setTimeout(() => {
                    sessionStorage.removeItem("loggedIn");
                    setUser(null);
                }, 10 * 60 * 1000);
                alert("로그인 완료");
                navigate("/");
            } else {
                alert("생년월일이 잘못되었습니다.");
            }
        } catch (error) {
            console.error("로그인 중 오류 발생:", error);
            alert("로그인 중 오류가 발생했습니다.");
        }
    };

    return (
        <div style={{
            backgroundColor: "#000",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Pretendard', sans-serif"
        }}>
            <div style={{
                width: "360px",
                padding: "40px",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                color: "#fff"
            }}>
                {/* 상단 탭 메뉴 */}
                <div style={{ display: "flex", marginBottom: "30px" }}>
                    <div style={{
                        flex: 1,
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "#fff",
                        borderBottom: "2px solid #297BE6",
                        paddingBottom: "10px",
                        textAlign: "center"
                    }}>
                        SIGN IN
                    </div>


                </div>


                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                        <label style={{ fontSize: "14px", color: "#aaa" }}>USERNAME</label>
                        <input
                            placeholder="학번"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            style={{
                                width: "100%",
                                marginTop: "5px",
                                padding: "12px 16px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "none",
                                borderRadius: "20px",
                                color: "#fff",
                                outline: "none"
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: "14px", color: "#aaa" }}>PASSWORD</label>
                        <input
                            placeholder="생년월일 (예: 050108)"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                marginTop: "5px",
                                padding: "12px 16px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "none",
                                borderRadius: "20px",
                                color: "#fff",
                                outline: "none"
                            }}
                        />
                    </div>
                </div>

                {/* 로그인 버튼 */}
                <button
                    onClick={handleLogin}
                    style={{
                        marginTop: "30px",
                        width: "100%",
                        padding: "14px 0",
                        border: "none",
                        borderRadius: "28px",
                        background: "linear-gradient(to right, #297BE6, #5E9BFF)",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    SIGN IN
                </button>

                {/* 하단 링크 */}
                <div style={{
                    marginTop: "30px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#888"
                }}>
                    Forgot Password?
                </div>
            </div>
        </div>
    );
}

export default Login;
