import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, message } from 'antd';

const ManageTreatment = () => {
  const [itemData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editItemData, setEditItemData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    const results = itemData.filter(item =>
      item.Treatment.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete("/api/items/delete-item", {
        data: { itemId: record._id }
      });
      message.success("Deleted Successfully");
      setPopupModal(false);
      getAllItems();
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };
  

  const columns = [
    { title: "Treatment", dataIndex: "Treatment" },
    { title: "Price", dataIndex: "price" },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <span>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer", marginLeft: 12 }}
            onClick={() => {
              setEditItem(record);
              setEditItemData(record); 
              setPopupModal(true);
            }}
          />
        </span>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        await axios.post("/api/items/add-item", value);
        message.success("Added Successfully");
        setPopupModal(false);
        getAllItems();
      } catch (error) {
        message.error("Something went wrong");
        console.log(error);
      }
    } else {
      try {
        await axios.post("/api/items/edit-item", { ...value, itemId: editItem._id });
        message.success("Updated Successfully");
        setPopupModal(false);
        getAllItems();
      } catch (error) {
        message.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Manage Treatment</h1>
        <div className="d-flex align-items-center">
          <Input
            placeholder="Search by Treatment name"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ width: "400px", border: "none", boxShadow: "none", borderRadius: "15px" }}
          />
          <Button type="primary" classname="search-button" onClick={handleSearch} style={{ marginRight: "56px" }}>Search</Button>
          <Button type="primary" onClick={() => {
            setEditItem(null);
            setPopupModal(true);
            setEditItemData(null); // Reset edited item data
          }}>
            Add Treatment
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={searchResults} bordered />

      {popupModal && (
        <Modal
          title={`${editItem !== null ? 'Edit Treatment' : 'Add Treatment'}`}
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
            setEditItemData(null); 
          }}
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={editItemData}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="Treatment"
              label="Treatment"
              rules={[{ required: true, message: "Please enter treatment" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter price" ,},
              
              {
                type:'number',
                min:1,
                transform:value =>parseFloat(value),
                message: 'Price must be a positive number',
              }]}
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

export default ManageTreatment;
