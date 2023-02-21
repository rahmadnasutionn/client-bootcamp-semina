import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SBreadCrumb from '../../components/Breadcrumb';
import DataRange from '../../components/DataRange';
import SearchInput from '../../components/SearchInput';
import TableWithAction from '../../components/TableWithAction';
import { fetchOrders, setPage, setRanges } from '../../redux/orders/actions';
import formatDate from '../../utils/formatDate';

export default function OrderPage() {
    const orders = useSelector((state) => state.orders);

    const dispatch = useDispatch();

    const [isShowed, setIsShowed] = useState(false);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch, orders.page, orders.date])

    const displayDate = `${orders.data?.startDate ? formatDate(orders.data?.startDate) : ''}
    ${orders.data?.endDate ? ' - ' + formatDate(orders.data?.endDate) : ''}`;

    console.log('orders');
    console.log(orders);

  return (
    <Container className='mt-3'>
        <SBreadCrumb
            textSecound={'Orders'}
        />
        <Row>
            <Col className='cursor-pointer position-relative' onClick={() => setIsShowed(true)}>
                <SearchInput disabled query={displayDate} />
                {isShowed ? (
                    <DataRange
                      date={orders.date} 
                      setIsShowed={() => setIsShowed(!isShowed)}
                      onChangeDate={(ranges) => dispatch(setRanges(ranges.selection))}
                    />
                ): ('')}
            </Col>
        </Row>

        <TableWithAction
            status={orders.status}
            thead={[
                'Nama',
                'Email',
                'Judul',
                'Tanggal Event',
                'Tanggal Order',
                'Tempat'
            ]}
            tbody={['nama', 'email', 'judul', 'date', 'orderDate', 'venueName']}
            data={orders.data}
            pages={orders.pages}
            actionNotDisplay
            handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
        />
    </Container>
  )
}
