import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import SBreadCrumb from '../../components/Breadcrumb'
import { postData } from '../../utils/fetch';
import SpeakerForm from './form';

import { setNotif } from '../../redux/notif/actions';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';

export default function TalentsCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        role: '',
        file: '',
        avatar: '',
    });

    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);

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
                    var size = parseFloat(event.target.files[0].size / 3145728).toFixed(2);

                    console.log('size', size);

                    if (size > 2) {
                        setAlert({
                            ...alert,
                            status: true,
                            type: 'danger',
                            message: 'Please select image less than 3 MB',
                        });
                        setForm({
                            ...form,
                            file: '',
                            [event.target.name]: '',
                        });
                    } else {
                        const response = await uploadImage(event.target.files[0]);
                        setForm({
                            ...form,
                            file: response.data.data._id,
                            [event.target.name]: response.data.data.name,
                        });
                    }
                } else {
                    setAlert({
                        ...alert,
                        status: true,
                        type: 'danger',
                        message: 'type image must be png | jpg | jpeg'
                    });
                    setForm({
                        ...form,
                        file: '',
                        [event.target.name]: ''
                    });
                }
        } else {
            setForm({ ...form, [event.target.name]: event.target.value });
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);

        const payload = {
            image: form.file,
            role: form.role,
            name: form.name
        };

        const response = await postData('/cms/talents', payload);
        if (response.data.data) {
            dispatch(setNotif(
                true,
                'success',
                `berhasil tambah talent ${response.data.data.name}`
            ));
            navigate('/talents');
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setAlert({
                ...alert,
                status: true,
                type: 'danger',
                message: response.response.data.msg
            })
        }
    }
  return (
    <Container>
        <SBreadCrumb textSecound={'Talents'} urlSecound="/talents" textThird={'create'} />
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
        <SpeakerForm
         form={form}
         isLoading={isLoading}
         handleChange={handleChange}
         handleSubmit={handleSubmit}
         />
    </Container>
  )
}
