import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import { setNotif } from "../../redux/notif/actions";
import { getData, putData } from "../../utils/fetch";
import SpeakerForm from "./form";

export default function TalentsEdit() {
    const { talentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        role: '',
        file: '',
        avatar: ''
    });

    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const fetchOneTalents = async () => {
        const response = await getData(`/cms/talents/${talentId}`);

        setForm({
            ...form,
            name: response.data.data.name,
            role: response.data.data.role,
            file: response.data.data.image._id,
            avatar: response.data.data.image.name
        });
    };

    useEffect(() => {
        fetchOneTalents();
    }, [])

    const uploadImage = async (file) => {
        let formData = new FormData();
        formData.append('avatar', file);
        const response = await putData('/cms/images', formData, true);
        return response;
    };

    const handleChange = async (event) => {
        if (event.target.name === 'avatar') {
            if (
                event?.target?.files[0].type === 'image/jpg' ||
                event?.target?.files[0].type === 'image/png' ||
                event?.target?.files[0].type === 'image/jpeg'
            ) {
                let size = parseFloat(event.target.files[0].size / 3145728).toFixed(2);
                console.log('size:', size);
                if (size > 2) {
                    setAlert({
                        ...alert,
                        status: true,
                        type: 'danger',
                        message: 'Please select image size less than 3 MB'
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
                        [event.target.name]: response.data.data.name,
                    });
                }
            } else {
                setAlert({
                    ...alert,
                    status: true,
                    type: 'danger',
                    message: 'type image must be jpg | png | jpeg'
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
    };
    
    const handleSubmit = async () => {
        setIsLoading(true);

        const payload = {
            name: form.name,
            role: form.role,
            image: form.file
        };

        const response = await putData(`/cms/talents/${talentId}`, payload);
        if (response.data.data) {
            dispatch(
                setNotif(
                    true,
                    'success',
                    `berhasil mengubah speaker ${response.data.data.name}`
                )
            )
            navigate('/talents');
            setIsLoading(false);
        } else {
            setAlert({
                status: true,
                type: 'danger',
                message: response.response.data.msg
            })
        }
    }

    return (
        <Container>
            <SBreadCrumb 
                textSecound={'Talents'}
                urlSecound="/talents"
                textThird={'Edit'}
            />
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
            <SpeakerForm
                form={form}
                isLoading={isLoading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                edit
             />
        </Container>
    )
}