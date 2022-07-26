import 'antd/dist/antd.css'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { addEmployeeFx } from 'store/store'
import styles from './ModalAddUser.module.scss'
import { CollectionCreateFormProps } from './interfaces'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const config = {
  rules: [
    { type: 'object' as const, required: true, message: 'Please select time!' },
  ],
}

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const { Option } = Select

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()
  return (
    <Modal
      visible={visible}
      title="Add employee"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((error) => {
            console.log('Validate Failed:', error)
          })
      }}
    >
      <Form
        className={styles.modalAddUser__form}
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name={['user', 'name']}
          label="FirstName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'LastName']}
          label="LastName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Birthday" label="Birthday" {...config}>
          <DatePicker format={dateFormatList} />
        </Form.Item>
        <Form.Item
          name="Gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select Gender!' }]}
        >
          <Select placeholder="select Gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="Position"
          label="Position"
          rules={[{ required: true, message: 'Please select Position!' }]}
        >
          <Select placeholder="select Position">
            <Option value="Waiter">Waiter</Option>
            <Option value="Cook">Cook</Option>
            <Option value="Shift manager">Shift manager</Option>
            <Option value="Harvester">Harvester</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="Zeitplan"
          label="Zeitplan"
          rules={[{ required: true, message: 'Please select Zeitplan!' }]}
        >
          <Select placeholder="select Zeitplan">
            <Option value="2/2">2/2</Option>
            <Option value="3/3">3/3</Option>
            <Option value="3/2">3/2</Option>
            <Option value="5/2">5/2</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export const ModalAddUser = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = (employee: any) => {
    setVisible(false)
    addEmployeeFx(employee)
  }

  return (
    <div>
      <Button
        size="large"
        type="primary"
        onClick={() => {
          setVisible(true)
        }}
      >
        Add
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

