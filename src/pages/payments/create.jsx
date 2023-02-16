import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';
import SBreadCrumb from '../../components/Breadcrumb'
import { setNotif } from '../../redux/notif/actions';
import { postData } from '../../utils/fetch';

import PaymentsForm from './form';

export default function PaymentsCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: '',
    file: '',
    avatar: '',
    role: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: ''
  });

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const response = await postData('/cms/images', formData, true);
    return response;
  }

  const handleChange = async (event) => {
    if (event.target.name === 'avatar') {
      if (
        event?.target?.files[0]?.type === 'image/jpg' ||
        event?.target?.files[0]?.type === 'image/png' ||
        event?.target?.files[0]?.type === 'image/jpeg'
      ) {
        let size = parseFloat(event.target.files[0].size / 3145728).toFixed(2);

        if (size > 3) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image less than 3 MB'
          });
          setForm({
            ...form,
            file: '',
            [event.target.name]: ''
          });
        } else {
          const response = await uploadImage(event.target.files[0]);

          setForm({
            ...form,
            file: response.data.data._id,
            [event.target.name]: response.data.data.name
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'image must be png | jpg | jpeg'
        });
        setForm({
          ...form,
          file: '',
          [event.target.name]: ''
        });
      }
    } else {
      setForm({ ...form, [event.target.name]: event.target.value })
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      image: form.file,
      type: form.type
    };

    const response = await postData('/cms/payments', payload);

    if (response.data.data) {
      dispatch(setNotif(
        true,
        'success',
        `berhasil menambahkan payment ${response.data.data.type}`
      ));
      navigate('/payments');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: response.response.data.msg
      });
    }
  };
  return (
    <Container>
      <SBreadCrumb textSecound={'Payment'} 
        urlSecound={'/payments'}
        textThird='create'
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <PaymentsForm 
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
      />
    </Container>
  )
}
