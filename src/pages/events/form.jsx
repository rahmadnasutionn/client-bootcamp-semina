import React from 'react'
import { CloseButton, Col, Figure, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import SButton from '../../components/Button'
import InputWithLabel from '../../components/InputWithLabel'
import SelectBox from '../../components/SelectBox'
import config from '../../config'

export default function EventsForm({
    form,
    handleChange,
    handleSubmit,
    edit,
    isLoading,
    handleChangeKeyPoint,
    handlePlusKeyPoint,
    handleMinusKeyPoint,
    lists,
    handleChangeTicket,
    handleMinusTicket,
    handlePlusTicket
}) {
  return (
    <Form>
        <Row>
            <Col>
              <InputWithLabel 
                placeholder={'Masukkan judul'}
                type='text'
                label={'Judul'}
                name='title'
                value={form.title}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <InputWithLabel 
                placeholder={'Masukkan tagline'}
                type='text'
                label={'Tagline'}
                name='tagline'
                value={form.tagline}
                onChange={handleChange}
              />
            </Col>
        </Row>
        <Row>
        <Col>
              <InputWithLabel 
                placeholder={'Masukkan tanggal acara'}
                type='datetime-local'
                label={'Tanggal'}
                name='date'
                value={form.date}
                onChange={handleChange}
              />
        </Col>
        <Col>
            <SelectBox 
             label={'Category'}
             name='category'
             value={form.category}
             placeholder={'Masukkan Category'}
             options={lists.categories}
             handleChange={(event) => handleChange(event)}
            />
        </Col>
        </Row>
        <Row>
            <InputWithLabel 
                placeholder={'Masukkan about'}
                label={'About'}
                name="about"
                type='text'
                value={form.about}
                onChange={handleChange}
            />
            <InputWithLabel 
                placeholder={'Masukkan tempat acara'}
                label={'Tempat Acara'}
                name="venueName"
                type='text'
                value={form.venueName}
                onChange={handleChange}
            />
        </Row>
        <Form.Label>Key Point</Form.Label>
        <Row>
          {form.keyPoint.map((key, index) => {
            return ( <Col>
              <InputGroup className='mb-3' key={index}>
                <FormControl
                  placeholder='Masukkan keypoint'
                  value={key}
                  name='key'
                  onChange={(event) => handleChangeKeyPoint(event, index)}
                />
                  {index !== 0 && (
                    <InputGroup.Text id='basic-addon2'>
                      <CloseButton onChange={() => handleMinusKeyPoint(index)} />
                    </InputGroup.Text>
                  )}
              </InputGroup>
            </Col>
          )})}
        </Row>

        <SButton variant='success' action={handlePlusKeyPoint} size='sm'>Tambah keypoint</SButton>

        <Row>
          <Col>
            <SelectBox
              label={'Speaker'}
              placeholder='Masukkan nama pembicara'
              name='talent'
              value={form.talent}
              options={lists.talents}
              handleChange={(event) => handleChange(event)}
            />
          </Col>
          <Col>
            <InputWithLabel 
              placeholder={'Masukkan avatar'}
              label='Cover'
              name='avatar'
              type='file'
              onChange={handleChange}
            />
            {form.avatar !== '' && (
               <div>
               <Figure>
                 <Figure.Image
                   width={171}
                   height={180}
                   alt='171x180'
                   src={`${config.api_image}/${form.avatar}`}
                 />
 
                 <Figure.Caption>Perview image cover</Figure.Caption>
               </Figure>
             </div>
            )}
          </Col>
        </Row>

        <Form.Label>Tiket</Form.Label>
        
        {form.tickets.map((ticket, index) => {
          return <Row key={index}>
            <Col sm={6}>
              <InputWithLabel 
                placeholder={'Masukan tipe tiket'}
                label='Type'
                name='type'
                value={ticket.type}
                type='text'
                onChange={(event) => handleChangeTicket(event, index)}
              />
            </Col>
            <Col sm={6}>
              <InputWithLabel 
                placeholder={'Masukan harga'}
                label='Harga'
                name='price'
                value={ticket.price}
                type='number'
                onChange={(event) => handleChangeTicket(event, index)}
              />
            </Col>
            <Col sm={6}>
              <InputWithLabel 
                placeholder={'Masukan tipe tiket'}
                label='Stock'
                name='stock'
                value={ticket.stock}
                type='number'
                onChange={(event) => handleChangeTicket(event, index)}
              />
            </Col>
            <Col sm={6}>
              <InputWithLabel 
                placeholder={'Masukan status'}
                label='status'
                name='status'
                value={ticket.status}
                type='text'
                onChange={(event) => handleChangeTicket(event, index)}
              />
            </Col>
            {index !== 0 && (
              <Col
              sm={1}
              className='d-flex justify-content-end align-items-center'
            >
              <CloseButton onClick={() => handleMinusTicket(index)} />
            </Col>
            )}
          </Row>
        })}
        <div className="mb-3">
          <SButton variant='success' action={handlePlusTicket} size='sm'>
            Tambah Ticket
          </SButton>
        </div>

          <SButton className='mb-4' variant='primary' action={handleSubmit} loading={isLoading}>
            {edit ? 'Ubah' : 'Simpan'}
          </SButton>
    </Form>
  )
}
