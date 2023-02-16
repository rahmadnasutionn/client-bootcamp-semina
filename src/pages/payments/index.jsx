import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SAlert from '../../components/Alert'
import SBreadCrumb from '../../components/Breadcrumb'
import SButton from '../../components/Button'
import TableWithAction from '../../components/TableWithAction'
import { accessPayments } from '../../const/access'
import { setNotif } from '../../redux/notif/actions'
import { fetchPayments } from '../../redux/payments/actions'
import { deleteData } from '../../utils/fetch'
import PaymentsForm from './form'

export default function PaymentsPage() {
    const payments = useSelector(state => state.payments);
    const notif = useSelector(state => state.notif);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [access, setAccess] = useState({
        tambah: false,
        edit: false,
        hapus: false,
    });

    const checkAccess = () => {
        let { role } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};

        const access = { tambah: false, hapus: false, delete: false };

        Object.keys(accessPayments).forEach(function(key, index) {
            if (accessPayments[key].indexOf(role) >= 0) {
                access[key] = true;
            }
        })
        setAccess(access);
    };

    useEffect(() => {
        checkAccess()
    }, [])

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apa kamu yakin?',
            text: 'Anda tidak akan dapat mengembalikan ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, Hapus',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteData(`/cms/payments/${id}`);

                dispatch(
                    setNotif(
                        true,
                        'success',
                        `berhasil menghapus payment ${response.data.data.type}`
                    )
                );

                dispatch(fetchPayments());
            }
        })
    }

  return (
    <Container>
        <SBreadCrumb textSecound={'Payments'} />

        {access.tambah && (
            <SButton className={'mb-3'} action={() => navigate('/payments/create')}>
                Tambah
            </SButton>
        )}

        {notif.status && (
            <SAlert type={notif.type} message={notif.message} />
        )}

        <TableWithAction 
            status={payments.status}
            thead={['Type', 'Avatar', 'Aksi']}
            data={payments.data}
            tbody={['type', 'avatar']}
            editUrl={access.edit ? '/payments/edit' : null}
            deleteAction={access.hapus ? (id) => handleDelete(id) : null}
            withoutPagination
        />
    </Container>
  )
}
