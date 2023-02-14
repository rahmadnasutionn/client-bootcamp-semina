import React from 'react'
import { Figure, Form } from 'react-bootstrap'
import SButton from '../../components/Button'
import InputWithLabel from '../../components/InputWithLabel'
import config from '../../config'

export default function SpeakerForm({
    form,
    handleChange,
    isLoading,
    handleSubmit,
    edit
}) {
  return (
    <Form>
        <InputWithLabel
            placeholder={'Masukan nama pembicara'}
            label="Nama"
            name='name'
            value={form.name}
            type='text'
            onChange={handleChange}
        />
        <InputWithLabel
            placeholder={'Masukan role pembicara'}
            label='Role'
            name='role'
            value={form.role}
            type='text'
            onChange={handleChange}
        />
        <InputWithLabel
            placeholder={'Masukan avatar'}
            label="Avatar"
            name='avatar'
            // value={form.file}
            type='file'
            onChange={handleChange}
        />
        {form.avatar !== '' && (
            <div>
                <Figure>
                    <Figure.Image
                        width={171} 
                        height={180}
                        alt="171x181"
                        src={`${config.api_image}/${form.avatar}`}
                    />
                    <Figure.Caption>Preview image avatar</Figure.Caption>
                </Figure>
            </div>
        )}
        <SButton variant={'primary'} action={handleSubmit} loading={isLoading}>
            { edit ? 'Ubah' : 'Simpan' }
        </SButton>
    </Form>
  )
}
