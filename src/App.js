import logo from './logo.svg';
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, Link, useNavigate, Outlet, useParams} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';

import Welcome from './page/welcome';
import Dormitory_select from './page/Dormitory_select'
import InspectionChecklist from './page/InspectionChecklist.js';
import Sagam from './page/Sagam';
import FirstDormitorySelect from "./firstDormitory/firstDormitorySelect";
import SecondDormitorySelect from "./secondDormitory/secondDormitorySelect";
import ThirdDormitorySelect from "./thirdDormitory/thirdDormitorySelect";
import Request1 from './firstDormitory/request1.js';
import Result1 from './firstDormitory/Result1.js';

import RequestComponents from './page/RequestComponents.js';
import Statement1 from './firstDormitory/Statement1.js';
import { createContext } from "react";
import Login from './page/Login'; // 상단에 추가
import CheckRoom from "./page/CheckRoom";


export const AuthContext = createContext();


function App() {

  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [dormitoryData, setDormitoryData] = useState({});

  return (
      <AuthContext.Provider value={{ user, setUser }}>
    <div className="App">
      <Navbar bg="black" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">GACHON</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/Contact')}}>Contact</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/Sagam')}}>Sagam</Nav.Link>
            <button style={{backgroundColor:"#3F7AB5", width:"100px", height:"40px", borderRadius:"30px", borderStyle:"none"}} onClick={()=>{ navigate('/login')}}>LOGIN</button>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<div className="main-container">
          <>
          <Welcome/> <Dormitory_select/> <InspectionChecklist/>
            <Footer/>
          </></div>} />

        <Route path="/Sagam" element={<Sagam/>} />
        <Route path="/firstDormitorySelect" element={<FirstDormitorySelect/>}/>
        <Route path="/secondDormitorySelect" element={<SecondDormitorySelect/>}/>
        <Route path="/thirdDormitorySelect" element={<ThirdDormitorySelect/>}/>
        <Route path="/request1" element={<Request1/>}/>

        <Route path="/request1/:dormitoryKey" element={<Request1 dormitoryData={dormitoryData} setDormitoryData={setDormitoryData} />} />
        <Route path="/firstDormitoryResult" element={<Result1 />} />
        <Route path="/firstDormitoryStatement1" element={<Statement1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sagam/check/:roomNumber/:appId" element={<CheckRoom />} />
        <Route path="/firstDormitoryResult/:dormitoryKey" element={<Result1 />} />

      </Routes>



    </div>
      </AuthContext.Provider>
  );
}

function Footer() {
  return (
      <div>
        <br/><br/>
        글로벌캠퍼스 : (13120) 경기도 성남시 수정구 성남대로 1342 TEL : 031-750-5114 <br/>
        메디컬캠퍼스 : (21936) 인천광역시 연수구 함박뫼로 191 TEL : 032-820-4000
        <br/><br/>
      </div>
  );
}



export default App;