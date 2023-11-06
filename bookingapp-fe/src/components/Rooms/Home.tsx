import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form, Alert, Input } from 'antd';
// import { useNavigate } from 'react-router-dom';

interface Room {
  room_id: number;
  room_name: string;
}

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  // const history = useNavigate();

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

  const handleEdit = (id: number, name: string) => {
    setEditId(id);
    setRoomName(name);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${url}/rooms/${editId}`, { room_name: roomName });
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedRoom) {
        await axios.delete(`${url}/rooms/${selectedRoom.room_id}`);
        fetchData();
        setShowDeleteModal(false);
        setAlertMessage('Xóa thành công!');
        setIsAlertVisible(true);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleToggleDeleteModal = (room: Room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleToggleBookingForm = (room: Room) => {
    // history('/booking', { state: { selectedRoom: room } });
  };

  return (
    <div className="container">
      {isAlertVisible && <Alert message={alertMessage} type="success" />}
      <div className="action">
        <div className="card-group">
          {rooms.map((room, key) => {
            return (
              <Card key={key} className="room-card" style={{ margin: '10px', padding: '10px', border:"2px solid #dadada", borderRadius:'3rem' }}>
                <Card.Meta
                  title={
                    editId === room.room_id ? (
                      <Form>
                        <Form.Item>
                          <Input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" onClick={handleUpdate} style={{ marginRight: '5px' }}>
                            Update
                          </Button>
                          <Button onClick={handleCloseEditModal}>Cancel</Button>
                        </Form.Item>
                      </Form>
                    ) : (
                      room.room_name
                    )
                  }
                  description={
                    <div>
                      {editId !== room.room_id && (
                        <div>
                          <Button onClick={() => handleEdit(room.room_id, room.room_name)} style={{ marginRight: '5px' }}>
                            Edit
                          </Button>
                          <Button onClick={() => handleToggleBookingForm(room)}>
                            Booking
                          </Button>
                          <Button danger onClick={() => handleToggleDeleteModal(room)}>
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  }
                />
                <Button onClick = {() => handleToggleBookingForm(room)}>Booking</Button>
              </Card>
            );
          })}
        </div>
      </div>

      <Modal title="Edit Room" visible={showEditModal} onCancel={handleCloseEditModal} footer={null}>
        <Form>
          <Form.Item>
            <Input type="text" value={roomName} onChange={(e:any) => setRoomName(e.target.value)} />
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
        <p>Bạn có muốn xoá phòng này  "{selectedRoom?.room_name}" hay không ?</p>
        <Button danger onClick={handleDelete} style={{ marginRight: '5px' }}>
          Delete
        </Button>
        <Button onClick={handleCloseDeleteModal}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default Home;