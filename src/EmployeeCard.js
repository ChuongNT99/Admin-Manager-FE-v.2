import { React, useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card } from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const { Meta } = Card;
const { setID } = " ";
const url = "https://c0dc-210-245-110-144.ngrok-free.app";
const EmployeeCard = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [number, setNumber] = useState(" ");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  useEffect(() => {
    axios
      .get(url + "/employee", {
        withCredentials: true,
      })
      .then((res) => {
        setEmployees(res.data.employee);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(url + "/employee/" + id, {
        employees_id: id,
        employees_name: name,
        email: email,
        phone_number: number,
      })
      .then((res) => {
        setEmployees(res.data.employee);
        window.location.reload();
      })
      .catch((er) => console.log(er));
  };
  const handleToggleEdit = (editemployee) => {
    setSelectedEmployee(editemployee);
    setShowEditForm(true);
    console.log(editemployee)
  };
  const handleHideEdit = () => {
    setShowEditForm(false);
  };

  return (
    <>
      <div className="container">
        {!showEditForm && (
            <div className="grid-container">
            {employees.map((employee) => {
              return (
                <>
                  <Card
                    hoverable
                    className="grid-item"
                    key={employee.employees_id}
                    style={{ width: 250, margin: "auto", marginTop: 15 }}
                    actions={[
                      <SettingOutlined />,
                      <EditOutlined onClick={() => handleToggleEdit(employee)} />,
                      // <EditEmployee onClick = {() => handleToggleEdit(employee)} />,
                      <DeleteOutlined onClick={() => handleDelete(employee.employees_id)}/>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                      }
                      title={employee.employees_name}
                      description={employee.email}
                    />
                  </Card>
                </>
              );
            })}
            <Card style={{ border: "none" }} className="grid-item ">
              <AddEmployee />
            </Card>
          </div>
        )}
        {showEditForm && (
        <EditEmployee
          selectedEmployee={selectedEmployee}
          onHideEditForm={handleHideEdit}
        />
      )}
      </div>
      
    </>
  );
};

export default EmployeeCard;
