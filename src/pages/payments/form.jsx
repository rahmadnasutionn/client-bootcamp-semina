import React from 'react'
import { Figure, Form } from 'react-bootstrap'
import SButton from '../../components/Button'
import InputWithLabel from '../../components/InputWithLabel'
import config from '../../config'

export default function PaymentsForm({
    form,
    isLoading,
    edit,
    handleSubmit,
    handleChange
}) {
  return (
    <Form>
        <InputWithLabel
            placeholder={'Masukan tipe'}
            label='Type'
            name="type"
            type='text'
            value={form.type}
            onChange={handleChange}
         />
          <InputWithLabel
            placeholder={'Masukan avatar'}
            label='Avatar'
            name="avatar"
            type='file'
            // value={form.type}
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

            <Figure.Caption>Perview image avatar</Figure.Caption>
          </Figure>
          </div>
         )}

         <SButton variant={'primary'} action={handleSubmit} loading={isLoading}>
            {edit ? "Ubah" : "Submit"}
         </SButton>
    </Form>
  )
}
