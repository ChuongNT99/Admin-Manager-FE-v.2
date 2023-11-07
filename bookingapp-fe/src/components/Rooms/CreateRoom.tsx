import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import  { useSelector } from 'react-redux'
import { RootState } from '../reducers/store';
import { useNavigate } from 'react-router-dom';

const url = 'https://a71f-210-245-110-144.ngrok-free.app';

const CreateRoom:React.FC = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState<string>('');
  const token = useSelector((state: RootState ) => state.auth.token);
  const token1 = localStorage.getItem('access_token');
  const [error , setError] = useState<string>('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${url}/rooms`, { room_name: roomName },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Server: 'Werkzeug/3.0.0 Python/3.12.0',
          'cache-control': 'no-cache,private',
          Authorization: `Bearer ${token1}`,
        },
      });
      navigate('/');
    } catch (err) {

    }
    console.log('Thêm phòng:', roomName);
    setRoomName('');
  };

  return (
    <Form  layout="inline">
      <Form.Item>
        <Input
          type="text"
          placeholder="Enter room"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button  onClick={handleSubmit as any} type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateRoom;