import React,  { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card } from "antd";
import {
  // SettingOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { EmployeeType } from "./EmployeeType";
import AddEmployee from "./AddEmployees";

const { Meta } = Card;
const url = "https://a71f-210-245-110-144.ngrok-free.app/";
const EmployeesManager = () => {
  const [employees, setEmployees] = useState([] as EmployeeType[]);
// get data from api
  useEffect(  () => {
     axios
      .get(url + "/employees", {
        withCredentials: true,
      })
      .then((res) => {
        setEmployees(res.data.employee);
        console.log(res.data.employee)
      });
  }, []);
  return (
    <>
      <div className="container ">
            <div className="grid-container ">
            <Card style={{ border: "none", margin: "auto" ,marginTop: 15, height:145 }} className="grid-item ">
              <AddEmployee />
            </Card>
            {employees.map((employee) => {
              return (
                <>
                  <Card
                    hoverable
                    className="grid-item"
                    key={employee.employees_id}
                    style={{ width: 350, margin: "auto", marginTop: 15 }}
                    actions={[
                      // <SettingOutlined />,
                      <EditOutlined  />,
                      <DeleteOutlined />,
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
            
          </div>

      </div>
      
    </>
  );
};

export default EmployeesManager;