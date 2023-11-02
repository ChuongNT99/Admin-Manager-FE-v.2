import { React, useEffect, useState } from "react";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {  Form, Input, Button, } from "antd";
const url = "https://c0dc-210-245-110-144.ngrok-free.app";

const EditEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editname, seEditName] = useState("");
  const [editemail, setEditEmail] = useState("");
  const [editnumber, setEditNumber] = useState(" ");
  const [editData, setEditData] = useState({
    employees_id: '',
    employees_name: ' ',
    email: '',
    phone_number: ' '
  })
  useEffect(() => {
    axios
      .get(url + "/employee", {
        withCredentials: true,
      })
      .then((res) => {
        setEmployees(res.data.employee);
        // console.log(res.data.employee)
      });
  }, []);
//   useEffect(() => {
//     if (selectEmployee) {
//       setEditData(prevData => ({
//         ...prevData,
//         employees_id: selectEmployee.employees_id,
//       }));
//     }
//   }, [selectEmployee]);
  const handleEditDataChange = e => {
    setEditData(prevData => ({
      ...prevData,
      employees_name: editname,
      email: editemail,
      phone_number: editnumber
    }));
  };

//   const [openDialog, handleDisplay] = useState(false);

//   const handleClose = () => {
//     handleDisplay(false);
//   };
//   const openDialogBox = () => {
//     handleDisplay(true);
//   };
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = employees.length + 1;
    axios
      .post(url + "/employee", {
        employees_id: id,
        employees_name: editname,
        email: editemail,
        phone_number: editnumber,
      })
      .then((res) => {
        setEmployees(res.data.employee);
        // handleDisplay(false);
        alert("Successfully eddited new employees ")
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

 
  return (
    <>
        {/* <EditOutlined onClick={openDialogBox} /> */}
      {/* <Dialog onClose={handleClose} open={openDialog}> */}
      <Dialog >

        <DialogTitle style={{ width: "500px", textAlign: "center"}}>
          {" "}
          Edit Employee Infomation {" "}
        </DialogTitle>
        <div style={{ padding:20}}>
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
              <Input  onChange={e => handleEditDataChange(e.target.value)}  required />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input required  type="email"  onChange={e => handleEditDataChange(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="number"
              rules={[{ required: true }]}
            >
              <Input  required pattern="[0-9]{1,10}"  type="tel" maxLength={10 }   onChange={e => handleEditDataChange(e.target.value)}/>
            </Form.Item>

            <Form.Item label=" ">
              <Button type="primary" htmlType="submit"  onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Dialog>
    </>
  );
};

export default EditEmployee;
