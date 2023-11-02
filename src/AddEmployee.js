import { React, useEffect, useState } from "react";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {  Form, Input, Button } from "antd";
const url = "https://c0dc-210-245-110-144.ngrok-free.app";

const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [addname, setAddName] = useState("");
  const [addemail, setAddEmail] = useState("");
  const [addnumber, setAddNumber] = useState(" ");
  useEffect(() => {
    axios
      .get(url + "/employee", {
        withCredentials: true,
      })
      .then((res) => {
        setEmployees(res.data.employee);
      });
  }, []);
  const [openDialog, handleDisplay] = useState(false);

  const handleClose = () => {
    handleDisplay(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = employees.length + 1;
    axios
      .post(url + "/employee", {
        employees_id: id,
        employees_name: addname,
        email: addemail,
        phone_number: addnumber,
      })
      .then((res) => {
        setEmployees(res.data.employee);
        handleDisplay(false);
        alert("Successfully added new employees ")
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  const openDialogBox = () => {
    handleDisplay(true);
  };
  return (
    <>
      <Button style={{height: 100}}
        onClick={openDialogBox}
      >
        <div>
          <div style={{ marginTop: 8 }}>Add Employee</div>
        </div>
      </Button>
      <Dialog onClose={handleClose} open={openDialog}>
        <DialogTitle style={{ width: "500px", textAlign: "center"}}>
          {" "}
          Employee Infomation{" "}
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
              <Input   required />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input required  type="email" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="number"
              rules={[{ required: true }]}
            >
              <Input  required pattern="[0-9]{1,10}"  type="tel" maxLength={10}/>
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

export default AddEmployee;
