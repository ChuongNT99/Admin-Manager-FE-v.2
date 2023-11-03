import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import {  Card, Modal, Button, Form, Alert } from 'antd';

const url = 'https://c0dc-210-245-110-144.ngrok-free.app';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [editId, setEditId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(url + '/rooms',{
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          'ngrok-skip-browser-warning': 'any',
          "Content-Type": "application/x-www-form-urlencoded",
          "Ngrok-Trace-Id":"bc47d5235e969cbcdd63082f9efdeb9c",
          "Server": "Werkzeug/3.0.0 Python/3.12.0",
          "cache-control": 'no-cache,private',
        }
      }).then(res => {
        setRooms(res.data.rooms);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id, name) => {
    setEditId(id);
    setRoomName(name);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(url + '/rooms/' + editId, { room_name: roomName });
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(url + '/rooms/' + selectedRoom.room_id);
      fetchData();
      setShowDeleteModal(false);
      setAlertMessage('Xóa thành công!');
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleToggleDeleteModal = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      {isAlertVisible && <Alert variant="success">{alertMessage}</Alert>}
      <div className="action">
        <div className="card-group">
          {rooms.map((room, key) => {
            return (
              <Card key={key} className="room-card">
                <Card.Body>
                  {editId === room.room_id ? (
                    <div>
                      <Form.Control
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                      <Button variant="primary" onClick={handleUpdate}>
                        Update
                      </Button>
                      <Button variant="secondary" onClick={handleCloseEditModal}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Card.Title>{room.room_name}</Card.Title>
                      <Button variant="secondary" onClick={() => handleEdit(room.room_id, room.room_name)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleToggleDeleteModal(room)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the room "{selectedRoom?.room_name}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
         <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;