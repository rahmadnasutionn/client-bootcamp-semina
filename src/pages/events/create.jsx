import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SAlert from '../../components/Alert'
import SBreadCrumb from '../../components/Breadcrumb'
import { fetchListCategories, fetchListTalents } from '../../redux/lists/actions'
import { postData } from '../../utils/fetch'
import EventsForm from './form'
import { setNotif } from '../../redux/notif/actions';

export default function EventCreate() {
    const lists = useSelector(state => state.lists);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        price: '',
        avatar: '',
        date: '',
        about: '',
        file: '',
        venueName: '',
        tagline: '',
        keyPoint: [''],
        tickets: [
            {
                type: '',
                status: '',
                stock: '',
                price: '',
            },
        ],
        category: '',
        talent: '',
        stock: ''
    });

    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchListTalents());
        dispatch(fetchListCategories());
    }, [dispatch])

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await postData('/cms/images', formData, true);
        return response;
    };
    
    const handleChange = async (event) => {
        if (event.target.name === 'avatar') {
            if (
                event?.target?.files[0]?.type === 'image/png' ||
                event?.target?.files[0]?.type === 'image/jpg' ||
                event?.target?.files[0]?.type === 'image/jpeg'
            ) {
                let size = parseFloat(event.target.files[0].size / 3145728).toFixed(2);

                if (size > 2) {
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
                    message: 'Image must be png | jpg | jpeg'
                });
                setForm({
                    ...form,
                    file: '',
                    [event.target.name]: ''
                });
            }
        } else if (event.target.name === 'category' || event.target.name === 'talent') {
            console.log('event:', event.target.name);
            setForm({...form, [event.target.name]: event});
        } else {
            setForm({ ...form, [event.target.name]: event.target.value });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        const payload = {
            date: form.date,
            image: form.file,
            title: form.title,
            about: form.about,
            tagline: form.tagline,
            price: form.price,
            venueName: form.venueName,
            keyPoint: form.keyPoint,
            category: form.category.value,
            talent: form.talent.value,
            status: form.status,
            ticket: form.tickets
        };

        const response = await postData('/cms/events', payload);

        if (response.data.data) {
            dispatch(setNotif(
                true,
                'success',
                `berhasil tambah event ${response.data.data.title}`
            ));
            navigate('/events');
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

    const handlePlusKeyPoint = () => {
        let _temp = [...form.keyPoint];

        _temp.push('');

        setForm({ ...form, keyPoint: _temp });
    };

    const handleChangeKeyPoint = (event, index) => {
        let _temp = [...form.keyPoint];

        _temp[index] = event.target.value;

        setForm({ ...form, keyPoint: _temp });
    };

    const handleMinusKeyPoint = (index) => {
        let _temp = [...form.keyPoint];
        let removeIndex = _temp.map((_, i) => {
            return i;
        }).indexOf(index);

        _temp.splice(removeIndex, 1);
        setForm({...form, keyPoint: _temp});
    };

    const handlePlusTicket = () => {
        let _temp = [...form.tickets];

        _temp.push({
            type: '',
            stock: '',
            status: '',
            price: ''
        });
    };

    const handleMinusTicket = (index) => {
        let _temp = [...form.tickets];

        let removeIndex = _temp.map((_, i) => {
            return i;
        }).indexOf(index);

        console.log('removeindex', removeIndex());
        _temp.splice(removeIndex, 1);
        setForm({ ...form, tickets: _temp });
    };

    const handleChangeTicket = (event, index) => {
        let _temp = [...form.tickets];

        _temp[index][event.target.name] = event.target.value;

        setForm({ ...form, tickets: _temp });
    };
  return (
    <Container>
        <SBreadCrumb
            textSecound={'Event'}
            urlSecound={'/events'}
            textThird='Create'
        />

        {alert.status && <SAlert type={alert.type} message={alert.message} />}

        <EventsForm 
            form={form}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            lists={lists}
            handleChangeKeyPoint={handleChangeKeyPoint}
            handleMinusKeyPoint={handleMinusKeyPoint}
            handlePlusKeyPoint={handlePlusKeyPoint}
            handleChangeTicket={handleChangeTicket}
            handleMinusTicket={handleMinusTicket}
            handlePlusTicket={handlePlusTicket}
        />
    </Container>
  )
}
