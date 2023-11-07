import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Modal } from "antd";
import { EmployeeType } from "./EmployeeType";
const url = "https://a71f-210-245-110-144.ngrok-free.app";

const AddEmployee = () => {
  const [employees, setEmployees] = useState([] as EmployeeType[]);
  const [employee_name, setAddName] = useState("");
  const [email, setAddEmail] = useState("");
  const [phone_number, setAddNumber] = useState(" ");
  const [password, setAddpass] = useState(" ");



  useEffect(() => {
    axios
      .get(url + "/employees", {
        withCredentials: true,
      })
      .then((res) => {
        setEmployees(res.data.employees);
        console.log(employees)
      });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    // const newEmployee = {
    //     employee_id : employees.length +1,
    //     employee_name ,
    //     email,
    //     phone_number,
    //     password
    // };
    axios
      .post(url + "/employees", {
        employee_id: employees.length + 1,
        employee_name,
        email,
        phone_number,
        password
      }).then((res) => {
        setEmployees(res.data.employees);
        console.log("add", employees)
        alert('Successfully added new employees')
        setIsModalOpen(false);
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  const onchangeName = (e: any) => {
    setAddName(e.target.value)
  }
  const onchangeEmail = (e: any) => {
    setAddEmail(e.target.value)
  }
  const onchangephone = (e: any) => {
    setAddNumber(e.target.value)
  }
  const onchangepass = (e: any) => {
    setAddpass(e.target.value)
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
      <Button onClick={showModal}>
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
              <Input value={employee_name} onChange={onchangeName} required />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[
              { required: true, message: 'Please input your email!' },
              { pattern: /^[\w-]+(\.[\w-]+)*@hotmail\.com$|^[\w-]+(\.[\w-]+)*@outlook\.com$|^[\w-]+(\.[\w-]+)*@gmail\.com$/, message: 'hãy nhập email có dang @gmail.com!' }
            ]} >
              <Input value={email} type="email" onChange={onchangeEmail} required />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="number"
              rules={[{ required: true }]}
            >
              <Input value={phone_number} pattern="[0-9]{1,10}" type="tel" maxLength={10} onChange={onchangephone} required />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input value={password} type="password" onChange={onchangepass} required />
            </Form.Item>
          </Form>
        </div>
      </Modal>

    </>
  );
};

export default AddEmployee;