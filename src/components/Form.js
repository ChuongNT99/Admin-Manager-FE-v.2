import { useForm } from 'react-hook-form';
import { EnvelopeFill, LockFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
function BasicExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="mt-5 mb-4 text-center">Form Example</h1>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <EnvelopeFill />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  value=""
                  placeholder="Email"
                  // aria-describedby="inputGroupPrepend"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email format',
                    },
                  })}
                  isInvalid={errors.email}
                />
                {errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email.message}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <LockFill />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value=""
                  // aria-describedby="inputGroupPrepend"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  isInvalid={errors.password}
                />
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password.message}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" style={{width:"100%"}}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BasicExample;