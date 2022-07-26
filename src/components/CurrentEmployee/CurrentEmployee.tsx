import 'antd/dist/antd.css'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useStore } from 'effector-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { $isChecked, $isPerson, correctEmployeeFx } from 'store/store'
import styles from './CurrentEmployee.module.scss'

const config = {
  rules: [
    { type: 'object' as const, required: true, message: 'Please select time!' },
  ],
}

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const { Option } = Select

export const CurrentEmployee = () => {
  const [form] = Form.useForm()
  const person = useStore($isPerson)
  const personIndex = useStore($isChecked)
  const date = person?.Birthday
  const [employee, setEmployee] = useState('')

  const createCurrentEmployee = () => {
    correctEmployeeFx({ employee, personIndex })
    setEmployee(form.getFieldsValue())
  }

  useEffect(() => {
    form.setFieldsValue({
      FirstName: person?.FirstName,
      LastName: person?.LastName,
      Birthday: moment(date, dateFormatList),
      Gender: person?.Gender,
      Position: person?.Position,
      Zeitplan: person?.Zeitplan,
    })
  }, [date, form, person])

  return (
    <Form
      className={styles.currentEmployee__form}
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{ modifier: 'public' }}
    >
      <Form.Item
        name="FirstName"
        label="FirstName"
        rules={[{ required: true }]}
      >
        <Input  value={person?.FirstName} />
      </Form.Item>
      <Form.Item name="LastName" label="LastName" rules={[{ required: true }]}>
        <Input value={person?.LastName} />
      </Form.Item>
      <Form.Item name="Birthday" label="Birthday" {...config}>
        <DatePicker
          value={moment('01/01/2015', dateFormatList[0])}
          format={dateFormatList}
        />
      </Form.Item>
      <Form.Item
        name="Gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select Gender!' }]}
      >
        <Select value={person?.Gender} placeholder="select Gender">
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="Position"
        label="Position"
        rules={[{ required: true, message: 'Please select Position!' }]}
      >
        <Select value={person?.Position} placeholder="select Position">
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
        <Select value={person?.Zeitplan} placeholder="select Zeitplan">
          <Option value="2/2">2/2</Option>
          <Option value="3/3">3/3</Option>
          <Option value="3/2">3/2</Option>
          <Option value="5/2">5/2</Option>
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <>
            <Button
              onClick={() => createCurrentEmployee()}
              type="primary"
              htmlType="submit"
              // disabled={form.isFieldsTouched(false)}
            >
              Log in
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  )
}
