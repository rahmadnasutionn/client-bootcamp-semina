import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SBreadCrumb from '../../components/Breadcrumb'
import SButton from '../../components/Button'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { accessCategories } from '../../const/access'
import { fetchCategories } from '../../redux/categories/actions'
import TableWithAction from '../../components/TableWithAction'
import SAlert from '../../components/Alert'

import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch'
import { setNotif } from '../../redux/notif/actions'

export default function Categories() {
  const notif = useSelector(state => state.notif);
  const categories = useSelector(state => state.categories);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
     ? JSON.parse(localStorage.getItem('auth'))
     : {};

     const access = { tambah: false, hapus: false, edit: false };
     Object.keys(accessCategories).forEach(function(key, index) {
      if (accessCategories[key].indexOf(role) >= 0) {
        access[key] = true;
      };
     });
     setAccess(access);
  }

  useEffect(() => {
    checkAccess();
  }, [])

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak dapet mengembalikan ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Iya, hapus',
      cancelButtonText: 'Cancel',
    }).then( async (response) => {
      if (response.isConfirmed) {
        const res = await deleteData(`/cms/categories/${id}`);
        dispatch(setNotif(
          true,
         'success',
          `berhasil hapus category ${res.data.data.name}`
        ));
        dispatch(fetchCategories());
      }
    })
  }

  return (
  <>
    <Container className='p-5'>
      <SBreadCrumb textSecound={'categories'} />
      <SButton className='mb-4' action={() => navigate('/categories/create')}>Tambah</SButton>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <TableWithAction 
      status={categories.status}
      thead={['Nama', 'Aksi']}
      data={categories.data}
      tbody={['name']}
      editUrl={access.edit ? '/categories/edit' : null}
      deleteAction={access.hapus ? (id) => handleDelete(id) : null}
      withoutPagination
      />
    </Container>
  </>
  )
}
