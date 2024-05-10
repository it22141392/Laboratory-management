import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, message, Select } from 'antd';


const ManagePatient = () => {
  const [patients, setPatients] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllPatients();
  }, []);

  const getAllPatients = async () => {
    try {
      const { data } = await axios.get("/api/patients/get-patients");
      setPatients(data);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    const results = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`/api/patients/delete-patients/${patientId}`);
      message.success('Patient deleted successfully');
      getAllPatients();
    } catch (error) {
      message.error('Error deleting patient: ' + error.response.data.message);
      console.error('Error deleting patient:', error);
    }
  };

  const columns = [
  
    { title: 'Name', dataIndex: 'name' },
    { title: 'Treatment', dataIndex: 'Treatment' },
    { title: 'Email Address', dataIndex: 'email_address' },
    { title: 'Phone No', dataIndex: 'phone_no' },
    { title: 'Price', dataIndex: 'price' },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (patientId, record) => (
        <span>
          <DeleteOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => handleDelete(patientId)}
          />
          <EditOutlined
            style={{ cursor: 'pointer', marginLeft: 12 }}
            onClick={() => {
              setEditPatient(record);
              setPopupModal(true);
            }}
          />
        </span>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (editPatient === null) {
      try {
        await axios.post("/api/patients/add-patients", value);
        message.success("Added Successfully");
        setPopupModal(false);
        getAllPatients();
      } catch (error) {
        message.error("Something went wrong");
        console.log(error);
      }
    } else {
      try {
        await axios.put(`/api/patients/edit-patients/${editPatient._id}`, value);
        message.success("Updated Successfully");
        setPopupModal(false);
        getAllPatients();
      } catch (error) {
        message.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Manage Patient</h1>
        <div className="d-flex align-items-center">
          <Input
            placeholder="Search by Patient name"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '400px', border: 'none', boxShadow: 'none', borderRadius: '15px' }}
          />
          <Button type="primary" className="search-button" onClick={handleSearch} style={{ marginRight: '56px' }}>
            Search
          </Button>
          <Button type="primary" onClick={() => {
            setEditPatient(null);
            setPopupModal(true);
          }}>
            Add Patient
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={searchResults} bordered />

      {popupModal && (
        <Modal
          title={`${editPatient ? 'Edit Patient' : 'Add Patient'}`}
          visible={popupModal}
          onCancel={() => {
            setEditPatient(null);
            setPopupModal(false);
          }}
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={editPatient || {}}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the patient's name" },
              {
              pattern: /^[a-zA-Z]+$/,
              message: 'Please enter a valid name'}
            ]}

            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Treatment"
              label="Treatment"
              rules={[{ required: true, message: "Please enter treatment" }]}
            >
              <Select>
                <Select.Option value="Tooth Filling">Tooth Filling</Select.Option>
                <Select.Option value="Teeth Cleaning">Teeth Cleaning</Select.Option>
                <Select.Option value="Dental Crowns">Dental Crowns</Select.Option>
                <Select.Option value="Teeth Whitening">Teeth Whitening</Select.Option>
                <Select.Option value="Dental Veneers">Dental Veneers</Select.Option>
                <Select.Option value="Root Canals Treatment">Root Canals Treatment</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="email_address"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter the patient's email address" },
                {type: "email", message:"Please enter the patient's email address"}
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone_no"
              label="Phone No"
              rules={[
                { required: true, message: "Please enter the patient's phone number" },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please enter price" },
                { type: 'number', min: 1, transform: value => parseFloat(value), message: 'Price must be a positive number' }
              ]}
            >
              <Input />
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ManagePatient;