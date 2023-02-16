import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import SBreadCrumb from '../../components/Breadcrumb'
import { setNotif } from '../../redux/notif/actions'
import { getData, postData, putData } from '../../utils/fetch'
import PaymentsForm from './form'

export default function PaymentsEdit() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    type: '',
    role: '',
    file: '',
    avatar: '',
  });

  const fetchOnePayment = async () => {
    const response = await getData(`/cms/payments/${paymentId}`);
    setForm({
      ...form,
      file: response.data.data._id,
      type: response.data.data.type,
      avatar: response.data.data.image.name,
      role: response.data.data.role
    });
  }

  useEffect(() => {
    fetchOnePayment();
  }, [])
  
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
      role: form.role,
      type: form.type,
    };

    const res = await putData(`/cms/payments/${paymentId}`, payload);
    if (res.data.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `berhasil ubah payments ${res.data.data.type}`
        )
      );
      navigate('/payments');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: res.response.data.msg,
      });
    }
  };
  return (
    <Container>
      <SBreadCrumb 
        textSecound={'Payments'}
        urlSecound={'/payments'}
        textThird='edit'
      />

      <PaymentsForm 
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  )
}
