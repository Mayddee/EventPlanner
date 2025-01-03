import React, { useContext } from "react";
import { Space, Calendar, Select } from "antd";
import { context } from "../App";

const EventList = () => {
    const {sortSelect, setSo} = useContext(context);

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