import logo from './logo.svg';
import './App.css';
import { Modal, Flex, Space, Input, DatePicker, TimePicker, Radio, Button } from "antd";
import "dayjs";
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import EventList from './components/EventList';

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
  }, [sortSelect])

  return (
    <div className="App">
      <h1>ddd</h1>
      <Button onClick={showModal}>Plan Event</Button>


     <context.Provider value={{sortSelect, setSortSelect}}>
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
     </context.Provider>
      
      
      
      
    </div>
  );
}

export default App;
