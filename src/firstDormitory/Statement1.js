import React, { useState } from 'react';

function Statement1() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert("파일을 선택해주세요.");
            return;
        }
    };

    return (
        <div style={{color: "white", padding: "30px"}}>
            <h2>불참 사유서 업로드</h2>

            <input
                type="file"
                accept=".pdf,.jpg,.png,.doc,.docx"
                onChange={handleFileChange}
                style={{marginTop: "20px", marginBottom: "20px"}}
            />
            {selectedFile && (
                <div>선택된 파일: {selectedFile.name}</div>
            )}

            <br />

            <button
                onClick={handleUpload}
                style={{
                    backgroundColor: "#3F7AB5",
                    width: "120px",
                    height: "40px",
                    borderRadius: "30px",
                    border: "none",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                업로드
            </button>
        </div>
    );
}

export default Statement1;
