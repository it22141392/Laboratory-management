// Homepage.jsx
import React, { useState, useEffect } from 'react';
import DefaultLayout from './../components/DefaultLayout';
import axios from 'axios';
import { Col, Row, Button } from 'antd';
import ItemList from './../components/ItemList';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/items/get-item");
        setItemData(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    getAllItems();
  }, []);

  const handleAddTreatment = (treatment) => {
    navigate('/Bills', { state: { treatment } });
  };

  return (
    <DefaultLayout>
      <h1>Available Treatment</h1>
      <Row gutter={[16, 16]}>
        {itemData.map(item => (
          <Col key={item.id} xs={24} lg={6} md={12} sm={12}>
            <ItemList item={item} />
            <Button onClick={() => handleAddTreatment(item)}>Add to Bill</Button>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;