import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


const url = 'https://f255-210-245-110-144.ngrok-free.app';
const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
    .post(url + '/rooms', { room_name: roomName })
    .then(res => {
      window.location.reload();
    })
    .catch(err => console.log(err));
    console.log('Thêm phòng:', roomName);
    setRoomName('');
  };

  return (
    <Form onSubmit={handleSubmit} inline>
      <Form.Control
        type="text"
        placeholder="Enter room"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        className="mr-sm-2"
      />
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default CreateRoom;