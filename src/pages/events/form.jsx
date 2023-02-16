import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import InputWithLabel from '../../components/InputWithLabel'
import SelectBox from '../../components/SelectBox'

export default function EventsForm({
    form,
    handleChange,
    isLoading,
    handleSubmit
}) {
  return (
    <Form>
        <Row>
            <Col>
              <InputWithLabel 
                placeholder={'Masukkan judul'}
                type='text'
                label={'Judl'}
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
    </Form>
  )
}
