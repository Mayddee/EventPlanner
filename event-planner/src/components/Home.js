import React, { useContext } from "react";
import { Modal, Flex, Space, Input, DatePicker, TimePicker, Radio, Button } from "antd";
import EventList from './EventList';
import TextArea from 'antd/es/input/TextArea';
import { context } from "../App";

const Home = () => {
    const { sortSelect, 
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
        setDescription} = useContext(context);

    return <div className="home">

        <h1>ddd</h1>
        <Button onClick={showModal}>Plan Event</Button>
        <EventList />
             <Modal 
              title="Plan a new event"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button onClick={handleCancel}>Cancel</Button>,
                <Button type="primary" key="submit">Add Event</Button>
              ]}
              >
              <Space direction="vertical">
             
             <div>
             <Flex vertical gap={12}>
               <label htmlFor="event-name">Event name</label>
               <Input id="event-name" placeholder="Enter event name" value={title} onChange={(e) => setTitle(e.target.value)} />
               {/* <Input placeholder="Event title" value={date} /> */}
               
             </Flex>
             </div>
             <div>
             <label htmlFor="date-time" >Choose event date and time</label>
             <div id="date-time">
               <DatePicker value={date} onChange={setDate} />
               <TimePicker value={time} onChange={(v) => setTime(v)} format={timeFormat} />
             </div>
        
             </div>
             <div>
             <label htmlFor="priority">Prority</label>
             <Radio.Group id="priority" value={priority} onChange={(v) => setPriority(v.target.value)}>
                   <Radio value="low">Low</Radio>
                   <Radio value="medium">Medium</Radio>
                   <Radio value="high">High</Radio>
                 </Radio.Group>
             </div>
             <div>
               <label htmlFor="textarea">Description</label>
               <TextArea id="textarea" placeholder="Describe your event..." value={description} onChange={(e) => setDescription(e.target.value)} />
        
             </div>
                 
             </Space>
              </Modal>
    </div>
}

export default Home;