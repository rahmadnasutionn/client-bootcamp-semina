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
        />
    </Container>
  )
}
