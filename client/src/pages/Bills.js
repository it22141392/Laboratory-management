import React, { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Table, Button, message, Empty, Modal } from 'antd';
import { DeleteOutlined, FileTextOutlined, DownloadOutlined } from "@ant-design/icons";
import { useLocation } from 'react-router-dom';

const BillPage = () => {
  const location = useLocation();
  const selectedTreatments = location.state ? location.state.treatments : [];
  const [treatments, setTreatments] = useState(selectedTreatments);
  const [subTotal, setSubTotal] = useState(0);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const invoiceModalRef = useRef(null);

  useEffect(() => {
    calculateSubTotal(treatments);
  }, [treatments]);

  const calculateSubTotal = (treatments) => {
    if (!treatments || treatments.length === 0) {
      setSubTotal(0);
      return;
    }
    const total = treatments.reduce((acc, treatment) => acc + treatment.price, 0);
    setSubTotal(total);
  };

  const handleDelete = (treatment) => {
    const updatedTreatments = treatments.filter((t) => t.id !== treatment.id);
    setTreatments(updatedTreatments);
    message.success('Treatment removed from bill successfully');
  };

  const showInvoiceModal = () => {
    setIsInvoiceModalVisible(true);
  };

  const handleInvoiceModalCancel = () => {
    setIsInvoiceModalVisible(false);
  };

  const handleDownloadInvoice = () => {
    const currentDate = new Date().toLocaleDateString('en-US');
    const invoiceContent = `
      Invoice Details:

      Date: ${currentDate}
    
      ${treatments.map((treatment) => (
        `${treatment.Treatment} - $${treatment.price} `
      )).join('\n')}
      
      Total: $${subTotal.toFixed(2)}
    `;

      


    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const columns = [
    { title: 'Treatment', dataIndex: 'Treatment' },
    { title: 'Price', dataIndex: 'price' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, treatment) => (
        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(treatment)} />
      ),
    },
  ];

  return (
    <DefaultLayout>
      <h1>Bill</h1>
      {treatments.length === 0 ? (
        <Empty description="No treatments added to the bill yet" />
      ) : (
        <>
          <Table columns={columns} dataSource={treatments} bordered />
          <div className="d-flex align-items-end">
            <hr />
            <div>
              <h3>SUB TOTAL: ${subTotal.toFixed(2)}</h3>
            </div>
          </div>
          <Button type="primary" icon={<FileTextOutlined />} onClick={showInvoiceModal}>
            Generate Invoice
          </Button>
        </>
      )}
      <Modal
        title="Invoice"
        visible={isInvoiceModalVisible}
        onCancel={handleInvoiceModalCancel}
        footer={[
          <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={handleDownloadInvoice}>
            Download Invoice
          </Button>,
        ]}
      >
        <div ref={invoiceModalRef}>
          <p>Invoice Details:</p>
          <ul>
            {treatments.map((treatment) => (
              <li key={treatment.id}>
                {treatment.name} - ${treatment.price}
              </li>
            ))}
          </ul>
          <hr />
          <p>
            <strong>Total: ${subTotal.toFixed(2)}</strong>
          </p>
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default BillPage;
