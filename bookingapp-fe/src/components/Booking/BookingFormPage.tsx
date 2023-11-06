import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select, Button, DatePicker, Form, Row, Col, Typography } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title } = Typography;

const url = 'https://f255-210-245-110-144.ngrok-free.app';

interface Employee {
  employees_id: number;
  employees_name: string;
}

interface BookingData {
  room_id: number;
  time_start_booking: dayjs.Dayjs;
  time_end_booking: dayjs.Dayjs;
  employee_id: number;
}

interface Room {
  room_id: number;
  room_name: string;
}

const BookingFormPage: React.FC<{ selectedRoom: Room }> = ({
  selectedRoom,
}) => {
  const history = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [bookingData, setBookingData] = useState<BookingData>({
    room_id: selectedRoom?.room_id || 0,
    time_start_booking: dayjs(),
    time_end_booking: dayjs(),
    employee_id: 0,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url + '/employee', {
        withCredentials: true,
      });
      setEmployees(response.data.employee);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }

    const currentTime = new Date().toLocaleString();
    setCurrentTime(currentTime);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      setBookingData(prevData => ({
        ...prevData,
        room_id: selectedRoom.room_id,
      }));
    }
  }, [selectedRoom]);

  const handleBookingDataChange = (name: string, value: dayjs.Dayjs | null) => {
    if (value) {
      setBookingData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEmployeeSelection = (employeeId: number) => {
    setBookingData(prevData => ({
      ...prevData,
      employee_id: employeeId,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(url + '/bookings', bookingData, {
        withCredentials: true,
      });

      alert('Booking success');
      history('/other-page');
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div>
      <Title level={2}>Đặt phòng</Title>
      <p>Phòng đã chọn: {selectedRoom?.room_name}</p>
      <p>Ngày hiện tại: {currentTime}</p>

      <Form layout='vertical' onFinish={handleFormSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Thời gian bắt đầu' required>
              <DatePicker
                showTime
                name='time_start_booking'
                value={bookingData.time_start_booking}
                onChange={(date, dateString) =>
                  handleBookingDataChange('time_start_booking', date)
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Thời gian kết thúc' required>
              <DatePicker
                showTime
                name='time_end_booking'
                value={bookingData.time_end_booking}
                onChange={(date, dateString) =>
                  handleBookingDataChange('time_end_booking', date)
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Chọn nhân viên' required>
              <Select
                value={bookingData.employee_id}
                onChange={handleEmployeeSelection}
                placeholder='-- Chọn nhân viên --'
              >
                {employees.map(employee => (
                  <Option
                    key={employee.employees_id}
                    value={employee.employees_id}
                  >
                    {employee.employees_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Đặt phòng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingFormPage;