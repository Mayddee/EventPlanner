import logo from './logo.svg';
import './App.css';
import "dayjs";
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import EventList from './components/EventList';
import Header from './components/Header';
import axios from "axios";
import { Outlet, useNavigate } from 'react-router-dom';

export const context = createContext({});

function App() {
  const [date, setDate] = useState(dayjs());
  const timeFormat = "HH:mm";
  const [time, setTime] = useState(dayjs("12:00", timeFormat));
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState('high');
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortSelect, setSortSelect] = useState("Priority");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  

  const handleRegister = async () => {
    try{
      console.log("Registering user: ", username);
      const response = await axios.post(
        "http://localhost:3010/api/register", 
        { username, password }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
            const data = await response.data;
      alert(data.message)
      setUsername("");
      setPassword("");
      navigate("/home");

    }catch(err){
      console.error("Error: ", err.response ? err.response.data : err);
    alert("Error: ", err.response ? err.response.data.error : err);
    }
  }

  const handleLogin = async () => {
    try{
      const response = await axios.post( 
        "http://localhost:3010/api/login", 
        { username, password });
        const data = await response.data;
        if(data.user){
          localStorage.setItem("userId", data.user._id);
        }
        // alert(data.message);
        setIsAuthenticated(true);
        navigate("/");
        
    } catch(err){
      console.error("Error: ", err.response ? err.response.data : err);
      alert("Error: ", err.response ? err.response.data.error : err);
    }

  }

  const handleLogout = async () => {
    try{
      const response = await axios.get("/api/logout");
      const data = await response.data;
      setIsAuthenticated(false);
      console.log("User logged out successfully: ", data);
      navigate("/home");
    }
    catch(err){
      console.error(err.response ? err.response.data : err);
    }
  }
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSortSelect = useCallback((event) => {
    setSortSelect(event.target.value);
  }, [sortSelect]);

  useEffect(()=> {
    console.log("User authenticated: ", isAuthenticated);

  }, [isAuthenticated])

  const contextValues = useMemo(()=> {
    return { sortSelect, 
     setSortSelect,
     showModal,
     handleCancel,
     handleOk,
     isModalOpen,
     setIsModalOpen,
     title,
     setTitle,
     date,
     setDate,
     time,
     setTime,
     timeFormat,
     priority,
     setPriority,
     description,
     setDescription,
     username,
     setUsername,
    password,
    setPassword,
     handleRegister,
     handleLogin,
     isAuthenticated,
     handleLogout
    }
 
   }, [ sortSelect, 
     setSortSelect,
     showModal,
     handleCancel,
     handleOk,
     isModalOpen,
     title,
     setTitle,
     date,
     setDate,
     time,
     setTime,
     timeFormat,
     priority,
     setPriority,
     description,
     setDescription,
     username, 
     password,
     setPassword,
     handleRegister,
     handleLogin,
     isAuthenticated
    ]);

  return (
    <div className="App">
      <Header />
     <context.Provider value={contextValues}>
      <Outlet />
      
     </context.Provider>
      
      
      
      
    </div>
  );
}

export default App;
