import { Navigate, useNavigate } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import { useState } from 'react';
import SAlert from '../../components/Alert';
import SForm from './form';
import { postData } from '../../utils/fetch';

import { userLogin } from '../../redux/auth/actions';
import { useDispatch } from 'react-redux';

function Signin() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [alert, setAlert] = useState({
        status: false,
        msg: '',
        type: 'danger'
    });

    const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await postData('/cms/auth/signin', form);

            dispatch(userLogin(response.data.data.token, response.data.data.role));
            setIsLoading(false);
            navigate('/');
        } catch (err) {
            setIsLoading(false);
            setAlert({
                status: true,
                msg: err.response.data.msg || "Internal server error",
                type: 'danger'
            });
        }
    }

  return (
  <Container md={12} className="mx-auto">
    <div className='m-auto mt-5' style={{ width: '50%' }}>
        {alert.status && <SAlert type={alert.type} message={alert.msg} /> }
    </div>
   <Card style={{ width: "50%" }} className="m-auto mt-5">
    <Card.Body>
      <Card.Title className='text-center'>Form Signin</Card.Title>
        <SForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} />
    </Card.Body>
   </Card>
  </Container>
  );
}

export default Signin;