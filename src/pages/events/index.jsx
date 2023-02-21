import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import SBreadCrumb from '../../components/Breadcrumb';
import SButton from '../../components/Button'
import TableWithAction from '../../components/TableWithAction'
import { fetchEvents, setCategory, setKeyword, setTalent } from '../../redux/events/actions';
import SAlert from '../../components/Alert'
import SearchInput from '../../components/SearchInput';
import SelectBox from '../../components/SelectBox';
import { fetchListCategories, fetchListTalents } from '../../redux/lists/actions';
import Swal from 'sweetalert2';
import { deleteData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';

export default function EventPage() {
    const events = useSelector(state => state.events);
    const notif = useSelector(state => state.notif);
    const lists = useSelector(state => state.lists);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch, events.keyword, events.talent, events.category])

    useEffect(() => {
        dispatch(fetchListCategories());
        dispatch(fetchListTalents());
    }, [dispatch])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure ?',
            text: 'Anda tidak dapat mengembalikan ini',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, Hapus',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteData(`/cms/events/${id}`);

                dispatch(setNotif(
                    true,
                    'success',
                    `berhasil menghapus event ${response.data.data.title}`
                ));
            }
            dispatch(fetchEvents());
        })
    };

    const handleChangeStatus = (id, status) => {
        Swal.fire({
            title: 'Apa kamu yakin?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, Ubah Status',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const payload = {
                    statusEvent: status === 'Published' ? 'Draft' : 'Published'
                };

                const response = await putData(`/cms/events/${id}/status`, payload);

                dispatch(setNotif(
                    true,
                    'success',
                    `berhasil ubah status event ${response.data.data.title}`
                ));

                dispatch(fetchEvents());
            }
        })
    };
    
  return (
    <Container className='mt-3'>
        <SButton action={() => navigate('/events/create')}>Tambah</SButton>
        <SBreadCrumb
            textSecound={'Events'} 
        />
        <Row>
            <Col>
                <SearchInput 
                    name='keyword'
                    query={events.query}
                    handleChange={(event) => dispatch(setKeyword(event.target.value))}
                />
            </Col>
            <Col>
                <SelectBox
                    placeholder={'Masukan pencarian category'}
                    name='category'
                    value={events.category}
                    options={lists.categories}
                    isClearable={true}
                    handleChange={(event) => dispatch(setCategory(event))}
                />
            </Col>
            <Col>
                <SelectBox
                    placeholder={'Masukan pencarian pembicara'}
                    name='talents'
                    value={events.talent}
                    options={lists.talents}
                    isClearable={true}
                    handleChange={(event) => dispatch(setTalent(event))}
                />
            </Col>
        </Row>
        {notif.status && <SAlert type={notif.typeNotif} message={notif.message} />}
        <TableWithAction 
            status={events.status}
            thead={[
                'Judul',
                'Tanggal',
                'Tempat',
                'Status',
                'Category',
                'Pembicara',
                'Aksi'
            ]}
            data={events.data}
            tbody={[
                'title',
                'date',
                'venueName',
                'statusEvent',
                'categoryName',
                'talentName'
            ]}
            editUrl={'/events/edit'}
            deleteAction={(id) => handleDelete(id)}
            customAction={(id, status = '') => {
                return (
                    <SButton className={'mx-2'} variant='primary' size='sm' action={() => handleChangeStatus(id, status)}>
                        Change status
                    </SButton>
                )
            }}
        />
    </Container>
  )
}
