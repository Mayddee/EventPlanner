import React from "react";
import {Button} from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return <div className="header" style={{
        height: "100px",
        width: "100%",
        backgroundColor: "grey"
    }}>
        <Button onClick={()=> navigate("/signup")}>Signup</Button>


    </div>

}

export default Header;