import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Alert, Form, Input } from 'antd';
import BookingFormPage from '../Booking/BookingFormPage';
import  { useSelector } from 'react-redux'
import { RootState } from '../reducers/store';
interface Room {
  room_id: number;
  room_name: string;
}


const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const token = useSelector((state: RootState ) => state.auth.token);
  const token1 = localStorage.getItem('access_token');


  const url: string = 'https://a71f-210-245-110-144.ngrok-free.app';

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/rooms`, {
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
      });
      setRooms(response.data.rooms);
      console.log(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      if (selectedRoom) {
        await axios.delete(`${url}/rooms/${selectedRoom.room_id}`,{
          headers: {
            Authorization: `Bearer ${token1}`
          }
        });
        fetchData();
        setShowDeleteModal(false);
        setAlertMessage('Xóa thành công!');
        setIsAlertVisible(true);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: number, name: string) => {
    setSelectedRoom({ room_id: id, room_name: name });
    setRoomName(name);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      if (selectedRoom) {
        await axios.put(`${url}/rooms/${selectedRoom.room_id}`, { room_name: roomName },{
          headers:{
            Authorization: `Bearer ${token1}`
          }
        });
        fetchData();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleToggleBookingForm = (room: Room) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
  };
  return (
    
    <div className="container">
      {isAlertVisible && <Alert message={alertMessage} type="success" />}
      <div className="action">
        <div className="card-group" style={{display:"flex"}}>
          {rooms.map((room, key) => {
            return (
              <Card key={key} className="room-card" style={{ width:"20%", height:"30%" ,margin: '10px', padding: '10px', border: '2px solid #dadada', borderRadius: '1rem' }}>
                <Card.Meta
                  title={<div>{room.room_name}</div>}
                  description={
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                      <Button onClick={() => handleToggleBookingForm(room)}>Booking</Button>
                      <Button danger onClick={() => setShowDeleteModal(true)}>
                        Delete
                      </Button>
                      <Button onClick={() => handleEdit(room.room_id, room.room_name)}>Edit</Button>
                    </div>
                  }
                />
              </Card>
            );
          })}
        </div>
      </div>

      <Modal title="Edit Room" visible={showEditModal} onCancel={handleCloseEditModal} footer={null}>
        <Form>
          <Form.Item>
            <Input type="text" value={roomName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleUpdate} style={{ marginRight: '5px' }}>
              Save Changes
            </Button>
            <Button onClick={handleCloseEditModal}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Delete Room" visible={showDeleteModal} onCancel={handleCloseDeleteModal} footer={null}>
        <p>Bạn có muốn xoá phòng này "{selectedRoom?.room_name}" hay không?</p>
        <Button danger onClick={handleDelete} style={{ marginRight: '5px' }}>
          Delete
        </Button>
        <Button onClick={handleCloseDeleteModal}>Cancel</Button>
      </Modal>

      {showBookingForm && (
        <BookingFormPage selectedRoom={selectedRoom}  />
      )}
    </div>
  );
};

export default Home;