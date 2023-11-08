import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card, Form, Input, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { EmployeeType } from "./EmployeeType";
import AddEmployee from "./AddEmployees";

const { Meta } = Card;
const url = "https://a71f-210-245-110-144.ngrok-free.app";

const EmployeesManager = () => {
  const [employees, setEmployees] = useState([] as EmployeeType[]);
  const [employee_name, setEditName] = useState("");
  const [email, setEditEmail] = useState("");
  const [employee_number, setEditNumber] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const token1 = localStorage.getItem('access_token');


  useEffect(() => {
    axios
      .get(url + "/employees", {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Ngrok-Trace-Id': 'bc47d5235e969cbcdd63082f9efdeb9c',
          Server: 'Werkzeug/3.0.0 Python/3.12.0',
          'cache-control': 'no-cache,private',
          Authorization: `Bearer ${token1}`,
        },
      })
      .then((res) => {
        setEmployees(res.data.employees);
        console.log(res.data.employees);
      });
  }, []);

  const handleDelete = (id: any) => {
    axios
      .delete(url + "/employees/" + id,
      {
        headers: {
          Authorization: `Bearer ${token1}`
        }
      }
      )
      .then((res) => {
        setEmployees(res.data.employee);
        alert("Successfully delete employees");
        window.location.reload();
      })
      .catch((er) => console.log(er));
  };

  const handleUpdate = () => {
    if (selectedEmployee) {
      const { employee_id } = selectedEmployee;
      axios
        .put(url + "/employees/" + employee_id, {
          employee_name,
          email,
          phone_number: employee_number,
        },
        {
          headers:{
            Authorization: `Bearer ${token1}`
          }
        })
        .then((res) => {
          setEmployees(res.data.employee);
          console.log(res.data.employee);
          alert("Successfully edited new employees");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleToggleEdit = (employee: EmployeeType) => {
    setSelectedEmployee(employee);
    setEditName(employee.employee_name);
    setEditEmail(employee.email);
    setEditNumber(employee.phone_number);
    setIsModalOpen(true);
    setIsEditing(true);
    console.log(employee.employee_name, employee.email, employee.phone_number);
  };

  const onchangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const onchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(e.target.value);
  };

  const onchangephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNumber(e.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  return (
    <>
      <div className="container">
        <AddEmployee />

        <div className="grid-container">
          {employees.map((employee) => {
            return (
              <Card
                hoverable
                className="grid-item"
                key={employee.employee_id}
                style={{ width: 350, margin: "auto", marginTop: 15 }}
                actions={[
                  <EditOutlined onClick={() => handleToggleEdit(employee)} />,
                  <DeleteOutlined
                  style={{color: "#ff4d4f"}}
                     onClick={() => handleDelete(employee.employee_id)
                    
                    } 
                    // onClick={()=>{
                    //   <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(employee.employee_id)}>
                    //   <a>Delete</a>
                    // </Popconfirm>

                    // } }
                  />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
                  title={employee.employee_name}
                  description={employee.email}
                />
              </Card>
            );
          })}
        </div>
      </div>

      <Modal
        title="Edit Employee Information"
        open={isModalOpen}
        onOk={handleUpdate}
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
            <Form.Item label="Name" name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input
                defaultValue={employee_name}
                value={employee_name}
                onChange={onchangeName} required
              />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[
              { required: true, message: 'Please input your email!' },
              {
                pattern: /^[\w-]+(\.[\w-]+)*@hotmail\.com$|^[\w-]+(\.[\w-]+)*@outlook\.com$|^[\w-]+(\.[\w-]+)*@gmail\.com$/,
                message: 'Please enter a valid email address!'
              }
            ]} >
              <Input
                defaultValue={email}
                value={email} type="email"
                onChange={onchangeEmail} required />
            </Form.Item>

            <Form.Item label="Phone Number" name="number" rules={[{ required: true }]}>
              <Input

                defaultValue={employee_number}
                value={employee_number}
                pattern="[0-9]{1,10}"
                type="tel"
                maxLength={10}
                onChange={onchangephone}
                required
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default EmployeesManager;
