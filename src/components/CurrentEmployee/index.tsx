import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useStore, useUnit } from 'effector-react';
import { noteMessage } from 'helpers/noteMessage';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { $employeeID, $isPerson, correctEmployeeFx } from 'store/employess';
import { FormWrap } from './styled';

const config = {
  rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const { Option } = Select;

export const CurrentEmployee = () => {
  const [form] = Form.useForm();
  const person = useStore($isPerson);
  const date = person?.Birthday;
  const employee = useRef(form.getFieldsValue());
  const formStatus = useRef(false);
  const ID = useStore($employeeID);

  const createCurrentEmployee = async () => {
    await onCheck();
    if (formStatus.current) {
      employee.current = form.getFieldsValue();
      // eslint-disable-next-line no-underscore-dangle
      employee.current.Birthday = employee.current.Birthday._d.toLocaleDateString();
      const workers = employee.current;
      workers.id = person?.id;
      correctEmployeeFx({ workers, ID });
    }
  };

  const onCheck = async () => {
    try {
      await form.validateFields();
      formStatus.current = true;
      noteMessage('success', 'current employee changed');
    } catch (error) {
      formStatus.current = false;
      noteMessage('warning', 'need fill in all the input form');
    }
  };

  const [loading] = useUnit([correctEmployeeFx.pending]);

  useEffect(() => {
    form.setFieldsValue({
      FirstName: person?.FirstName,
      LastName: person?.LastName,
      Birthday: moment(date, dateFormatList),
      Gender: person?.Gender,
      Position: person?.Position,
      Zeitplan: person?.Zeitplan,
    });
  }, [date, form, person]);

  return (
    <FormWrap>
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item name="FirstName" label="FirstName" rules={[{ required: true }]}>
          <Input value={person?.FirstName} />
        </Form.Item>
        <Form.Item name="LastName" label="LastName" rules={[{ required: true }]}>
          <Input value={person?.LastName} />
        </Form.Item>
        <Form.Item name="Birthday" label="Birthday" {...config}>
          <DatePicker value={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
        </Form.Item>
        <Form.Item name="Gender" label="Gender" rules={[{ required: true, message: 'Please select Gender!' }]}>
          <Select value={person?.Gender} placeholder="select Gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item name="Position" label="Position" rules={[{ required: true, message: 'Please select Position!' }]}>
          <Select value={person?.Position} placeholder="select Position">
            <Option value="Waiter">Waiter</Option>
            <Option value="Cook">Cook</Option>
            <Option value="Shift manager">Shift manager</Option>
            <Option value="Harvester">Harvester</Option>
          </Select>
        </Form.Item>
        <Form.Item name="Zeitplan" label="Zeitplan" rules={[{ required: true, message: 'Please select Zeitplan!' }]}>
          <Select value={person?.Zeitplan} placeholder="select Zeitplan">
            <Option value="2/2">2/2</Option>
            <Option value="3/3">3/3</Option>
            <Option value="3/2">3/2</Option>
            <Option value="5/2">5/2</Option>
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              onClick={() => {
                createCurrentEmployee();
              }}
              disabled={loading}
              type="primary"
            >
              Save
            </Button>
          )}
        </Form.Item>
      </Form>
    </FormWrap>
  );
};
