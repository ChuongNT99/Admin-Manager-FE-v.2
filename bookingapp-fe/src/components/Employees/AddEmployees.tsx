import React,{  useEffect, useState } from "react";
import axios from "axios";
import {  Form, Input, Button, Modal } from "antd";
import { EmployeeType } from "./EmployeeType";
const url = "https://a71f-210-245-110-144.ngrok-free.app/";

const AddEmployee = () => {
  const [employees, setEmployees] = useState([] as EmployeeType []);
  const [addname, setAddName] = useState("");
  const [addemail, setAddEmail] = useState("");
  const [addnumber, setAddNumber] = useState(" ");
 
 
  useEffect(() => {
    axios
      .get(url + "/employees", {
        withCredentials: true,
      })
      .then((res) => {
        setEmployees(res.data.employee);
        console.log(employees)
      });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    const newEmployee = {
        employees_id : employees.length +1,
        addname ,
        addemail,
        addnumber
    };
    axios
      .post(url + "/employees", {
        newEmployee
      }) .then((res) => {
        setEmployees(res.data.employees);
        console.log("add",employees)
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  const onchangeName = (e: any) =>{
    setAddName(e.target.value)
  }
  const onchangeEmail = (e: any) =>{
    setAddEmail(e.target.value)
  }
  const onchangephone = (e: any) =>{
    setAddNumber(e.target.value)
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
  return (
    <>    
      <Button  style={{height: 100, }} onClick={showModal}>
        Add employee
      </Button>
      <Modal
        title="Employee Infomation"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        style={{ width: "500px", textAlign: "center" }}
      >
        <div style={{ padding: 20 }}>
          <Form
            name="wrap"
            labelCol={{ flex: "150px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input value={addname} onChange={onchangeName} required />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input value={addemail} type="email" onChange={onchangeEmail} required />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="number"
              rules={[{ required: true }]}
            >
              <Input value={addnumber} pattern="[0-9]{1,10}" type="tel" maxLength={10} onChange={onchangephone} required />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      
    </>
  );
};

export default AddEmployee;