import React, {useContext, useEffect} from "react";
import {Button} from "antd";
import { useNavigate } from "react-router-dom";
import { context } from "../App";

const Header = () => {
    const { isAuthenticated, handleLogout
            } = useContext(context);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log("Is Authenticated in Header: ", isAuthenticated);

    }, [isAuthenticated]);

    return <div className="header" style={{
        height: "100px",
        width: "100%",
        backgroundColor: "grey"
    }}>
        {
            (!isAuthenticated) ? <div> <Button onClick={()=> navigate("/signup")}>Signup</Button>
            <Button onClick={()=> navigate("/login")}>Login</Button>
            </div> : <Button onClick={handleLogout}>Logout</Button>
        }
       

    </div>

}

export default Header;