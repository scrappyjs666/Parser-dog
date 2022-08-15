import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { addEmployeeFx } from 'store/employess';
import { CollectionCreateFormProps } from './interfaces';
import { FormWrap } from './styled';

const config = {
  rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const { Option } = Select;

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add employee"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onCreate(values);
        });
      }}
    >
      <FormWrap>
        <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
          <Form.Item name="FirstName" label="FirstName" rules={[{ required: true }]}>
            <Input placeholder="FirstName" />
          </Form.Item>
          <Form.Item name="LastName" label="LastName" rules={[{ required: true }]}>
            <Input placeholder="LastName" />
          </Form.Item>
          <Form.Item name="Birthday" label="Birthday" {...config}>
            <DatePicker format={dateFormatList} />
          </Form.Item>
          <Form.Item name="Gender" label="Gender" rules={[{ required: true, message: 'Please select Gender!' }]}>
            <Select placeholder="select Gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Position" label="Position" rules={[{ required: true, message: 'Please select Position!' }]}>
            <Select placeholder="select Position">
              <Option value="Waiter">Waiter</Option>
              <Option value="Cook">Cook</Option>
              <Option value="Shift manager">Shift manager</Option>
              <Option value="Harvester">Harvester</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Zeitplan" label="Zeitplan" rules={[{ required: true, message: 'Please select Zeitplan!' }]}>
            <Select placeholder="select Zeitplan">
              <Option value="2/2">2/2</Option>
              <Option value="3/3">3/3</Option>
              <Option value="3/2">3/2</Option>
              <Option value="5/2">5/2</Option>
            </Select>
          </Form.Item>
        </Form>
      </FormWrap>
    </Modal>
  );
};

export const ModalAddUser = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (employee: any) => {
    setVisible(false);
    // eslint-disable-next-line no-underscore-dangle
    employee.Birthday = employee.Birthday._d.toLocaleDateString();
    addEmployeeFx(employee);
  };

  return (
    <div>
      <Button
        size="large"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
