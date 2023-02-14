import React, { useEffect, useState } from 'react'
import { Breadcrumb, Container } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SAlert from '../../components/Alert';
import SBreadCrumb from '../../components/Breadcrumb';
import SButton from '../../components/Button';
import SearchInput from '../../components/SearchInput';
import TableWithAction from '../../components/TableWithAction';
import { accessTalents } from '../../const/access';
import { setNotif } from '../../redux/notif/actions';
import { fetchTalents, setKeyword } from '../../redux/talents/actions';
import { deleteData } from '../../utils/fetch';

export default function TalentsPage() {
 const talents = useSelector(state => state.talents);
 const notif = useSelector(state => state.notif);

 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
 });

 const checkAccess = () => {
    const { role } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessTalents).forEach(function(key, index) {
        if (accessTalents[key].indexOf(role) >= 0) {
            access[key] = true;
        }
    })
    setAccess(access);
 }
 
 useEffect(() => {
    checkAccess();
 }, [])
 

 useEffect(() => {
     dispatch(fetchTalents());
 }, [dispatch, talents.keyword])

 const handleDelete = (id) => {
    Swal.fire({
        title: 'Apa kamu yakin?',
        text: 'Anda tidak dapat mengembalikan ini',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iya, Hapus',
        cancelButtonText: 'Batal',
    }).then(async (result) => {
        if (result.isConfirmed) {
           const res = await deleteData(`/cms/talents/${id}`);
            Swal.fire(
                'Deleted!',
                `berhasil menghapus speaker ${res.data.data.name}`,
                'success'
            )
        //    dispatch(
        //     setNotif(
        //         true,
        //         'success',
        //         `berhasil menghapus speaker ${res.data.data.name}`
        //     )
        //    )
        };
        dispatch(fetchTalents());
    })
 }
    
  return (
    <Container>
        <SBreadCrumb textSecound={'Talents'} />
        {access.tambah && (
          <div className='mb-3'>
            <SButton action={() => navigate('/talents/create')}>Tambah</SButton>
          </div>
        )}
        <SearchInput handleChange={(event) => dispatch(setKeyword(event.target.value))} query={talents.query} placeholder={'Masukan pencarian disini'} />
        {notif.status && (
            <SAlert varian={notif.typeNotif} message={notif.message} />
        )}
        <TableWithAction 
            status={talents.status} 
            thead={['Nama', 'Role', 'Avatar', 'Aksi']}
            data={talents.data}
            tbody={['name', 'role', 'avatar']}
            editUrl={access.edit ? `/talents/edit` : null}
            deleteAction={access.hapus ? (id) => handleDelete(id) : null}
            withoutPagination
        />
    </Container>
  )
}
