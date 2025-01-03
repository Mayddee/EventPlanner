import React, { useContext } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { context } from "../App";

const SignupForm = () => {
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
            setDescription,
            username,
            setUsername,
            password,
            setPassword,
            handleRegister
    } = useContext(context);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <div className="signup">
         <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input value={username} onChange={(e)=> setUsername(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password value={password} onChange={(e)=> setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" onClick={handleRegister}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        
    </div>
}
export default SignupForm;