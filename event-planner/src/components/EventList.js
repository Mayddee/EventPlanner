import React, { useContext, useState } from "react";
import { Space, Calendar, Select } from "antd";
import { context } from "../App";
import axios from "axios";
import dayjs from "dayjs";

const EventList = () => {
    const {sortSelect, setSo} = useContext(context);
    const [events, setEvents] = useState([]);
    const getEventList = async() => {
        try{
            const response = await axios.get("http://localhost:3010/api/events");
            const data = response.data;
            setEvents(data);
        }catch(err){
            console.error("Error when handling event planning: ", err);
        }
    }


    return <div>
        <Select 
        value={sortSelect}
        // defaultValue="Date"
        style={{
            width: "200px"
        }}
        options={[
            {
                value: "date",
                label: "Date"
            },
            {
                value: "priority",
                label: "Priority"
            }
        ]}
        />
        {/* <Space>
            <div>No events planned...</div>
        </Space> */}

        
    </div>
}

export default EventList;