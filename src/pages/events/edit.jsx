import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SAlert from '../../components/Alert';
import SBreadCrumb from '../../components/Breadcrumb';
import moment from 'moment';
import { fetchListCategories, fetchListTalents } from '../../redux/lists/actions';
import { getData, putData, postData } from '../../utils/fetch';
import EventsForm from './form';
import { setNotif } from '../../redux/notif/actions';

export default function EventEdit() {
    const lists = useSelector(state => state.lists);

    const { eventId } = useParams();
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

    const fetchOneEvent = async () => {
        const response = await getData(`/cms/events/${eventId}`);

        setForm({
            ...form,
            title: response.data.data.title,
            date: moment(response.data.data.date).format('YYYY-MM-DDTHH:SS'),
            about: response.data.data.about,
            tagline: response.data.data.tagline,
            file: response.data.data.image._id,
            avatar: response.data.data.image.name,
            venueName: response.data.data.venueName,
            keyPoint: response.data.data.keyPoint,
            category: {
                label: response?.data?.data?.category?.name,
                target: { name: 'category', value: response?.data?.data?.category?._id },
                value: response?.data?.data?.category?._id,
            },
            talent: {
                label: response?.data?.data?.talent?.name,
                target: { name: 'talent', value: response?.data?.data?.talent?._id },
                value: response?.data?.data?.talent?._id,
            },
            tickets: response.data.data.tickets
        });
    };

    useEffect(() => {
        fetchOneEvent();
    }, [])

    useEffect(() => {
        dispatch(fetchListCategories());
        dispatch(fetchListTalents());
    }, [dispatch])
    
    const uploadImage = async (file) => {
        let formData = new FormData();
        formData.append('avatar', file);

        const response = await postData('/cms/images', formData, true);
        return response;
    };

    const handleChange = async (event) => {
        if (event.target.name === 'avatar') {
            if (
                event?.target?.files?.[0]?.type === 'image/png' ||
                event?.target?.files?.[0]?.type === 'image/jpg' ||
                event?.target?.files?.[0]?.type === 'image/jpeg'
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
                    })
                }
            } else {
                setAlert({
                    ...alert,
                    type: 'danger',
                    message: 'image must be png, jpg or jpeg'
                });
                setForm({
                    ...form,
                    file: '',
                    [event.target.name]: ''
                });
            }
        } else if (event.target.name === 'category' || event.target.name === 'talent') {
            setForm({ ...form, [event.target.name]: event });
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
            price: form.price,
            about: form.about,
            venueName: form.venueName,
            tagline: form.tagline,
            category: form.category.value,
            talent: form.talent.value,
            status: form.status,
            tickets: form.tickets,
            keyPoint: form.keyPoint
        };

        const response = await putData(`/cms/events/${eventId}`, payload);
        if (response.data.data) {
            dispatch(setNotif(true, 'success', `berhasil ubah event ${response.data.data.title}`))
            navigate('/events');
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: response.response.data.msg,
      });
        }

    };

    const handleChangeTicket = (event, index) => {
        let _temp = [...form.tickets];

        _temp[i][event.target.name] = event.target.value;
    
        setForm({ ...form, tickets: _temp });
    };

    const handlePlusTicket = () => {
        let _temp = [...form.tickets];
        _temp.push({
        type: '',
        status: '',
        stock: '',
        price: '',
      });
    };

    const handleMinusTicket = (index) => {
        let _temp = [...form.tickets];
        let removeIndex = _temp
          .map(function (_, i) {
            return i;
          })
          .indexOf(index);
    
        _temp.splice(removeIndex, 1);
        setForm({ ...form, tickets: _temp });
    };

    const handleMinusKeyPoint = (index) => {
        let _temp = [...form.keyPoint];
        let removeIndex = _temp
        .map(function (_, i) {
        return i;
            })
            .indexOf(index);

        _temp.splice(removeIndex, 1);
        setForm({ ...form, keyPoint: _temp });
    };

    const handlePlusKeyPoint = () => {
        let _temp = [...form.keyPoint];
        _temp.push('');

        setForm({ ...form, keyPoint: _temp });
    };

    const handleChangeKeyPoint = (event, i) => {
        let _temp = [...form.keyPoint];

        _temp[i] = event.target.value;

        setForm({ ...form, keyPoint: _temp });
    };
  return (
    <Container>
        <SBreadCrumb
            textSecound={'Event'}
            textThird='Edit'
            urlSecound={'Event'}
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
            edit
        />
    </Container>
  )
}
