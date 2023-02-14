import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';

export default function Dashboard() {

  return (
    <Container className='p-5'>
      <SBreadCrumb />
      <h1>Dashboard</h1>
    </Container>
  )
}
