import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { useDispatch } from 'react-redux';

function CategoryEdit() {
  const {categoryId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetOneCategories = async () => {
    const response = await getData(`/cms/categories/${categoryId}`);

    setForm({ ...form, name: response.data.data.name });
  }

  useEffect(() => {
    fetOneCategories();
  }, [])

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await putData(`/cms/categories/${categoryId}`, form);
    if (response.data.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `berhasil ubah kategori ${response.data.data.name}`
        )
      )
      navigate('/categories');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      dispatch(
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: response.response.data.msg,
        })
      )
    }
  }

  return (
    <Container className='mt-3'>
      <SBreadCrumb
        textSecound={'Categories'}
        urlSecound={'/categories'}
        textThird='Edit'
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        edit
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default CategoryEdit;