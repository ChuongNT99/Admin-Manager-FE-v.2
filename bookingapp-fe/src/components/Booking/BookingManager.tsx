import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Table, Row, Col, Space, Popconfirm, Tag } from 'antd';

import type { ColumnsType } from "antd/es/table";
const url = 'https://a71f-210-245-110-144.ngrok-free.app';

const BookingManager = () => {
    interface DataType {
        key: React.Key;
        booking_id: number;
        room_name: string;
        time_start: string;
        time_end: string;
        employee_name: string[];
    }
    const [booking, setBooking] = useState([] as DataType[]);
    const token1 = localStorage.getItem('access_token');

    const getData = async () => {
        await axios.get(url + '/bookings', {
            withCredentials: true,
            headers: {
                
                'cache-control': 'no-cache,private',
                Authorization: `Bearer ${token1}`,
              },
        }).then(res => {
            console.log("danh sach:", res.data.bookings);
            const bookingsWithKey = res.data.bookings.map((booking: { id: number, name: string, date: string }, index: number) => ({ ...booking, key: index }));
            setBooking(bookingsWithKey);
            
            
        })


    }

    useEffect(() => {
        getData()
    }
        , [])

    
    const handleDelete = (id: number) => {
        axios
          .delete(url + "/bookings/" +id,
          
          {
            headers: {
                Authorization: `Bearer ${token1}`,
              },
          }
          )
          .then((res) => {
            setBooking(res.data.bookings);
            console.log(res.data.bookings)
            console.log(id)
            alert("Reservation successfully deleted");
            window.location.reload();
          })
          .catch((er) => console.log(er));
      };
    const columns: ColumnsType<DataType> = [
        {
            title: "Room Name",
            dataIndex: "room_name",
            key: "room_name"
        },
        {
            title: "Time Start",
            dataIndex: "time_start",
            key: "time_start"
        },
        {
            title: "Time End",
            dataIndex: "time_end",
            key: "time_end"
        },
        {
            title: "Employees",
            dataIndex: "employee_name",
            key: "employee_name",
            // render: (_, {employee_name }) => (
            //     <>
            //       {employee_name.map((employee_name) => {
            //         let color = employee_name.length > 5 ? 'geekblue' : 'green';
            //         return (
            //           <Tag color={color} key={employee_name}>
            //             {employee_name.toUpperCase()}
            //           </Tag>
            //         );
            //       })}
            //     </>
            //   ),
        },
       
        {
            title: "Action",
            key: "action",
            render: (text, record) =>
            booking.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.booking_id)}>
                <a>Delete</a>
                </Popconfirm>
                
            ) : null
        }
  
    ];

    return (
        <div>
            <Table columns={columns} dataSource={booking} />;
        </div>
    )
}
export default BookingManager

