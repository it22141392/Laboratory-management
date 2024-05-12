import React, { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Table, Button, Empty, Modal } from 'antd';
import { FileTextOutlined, PrinterOutlined } from "@ant-design/icons";
import { useLocation } from 'react-router-dom';

const BillPage = () => {
  const location = useLocation();
  const selectedTreatments = location.state ? location.state.treatments : [];
  const [treatments] = useState(selectedTreatments);
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

  const showInvoiceModal = () => {
    setIsInvoiceModalVisible(true);
  };

  const handleInvoiceModalCancel = () => {
    setIsInvoiceModalVisible(false);
  };

  const handlePrintInvoice = () => {
    const invoiceModal = invoiceModalRef.current;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
        </head>
        <body>
          ${invoiceModal.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const columns = [
    { title: 'Treatment', dataIndex: 'Treatment' },
    { title: 'Price', dataIndex: 'price' },
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
          <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={handlePrintInvoice}>
            Print Invoice
          </Button>,
        ]}
      >
        <div ref={invoiceModalRef}>
          <p>Invoice Details:</p>
          <ul>
            {treatments.map((treatment) => (
              <li key={treatment.id}>
                {treatment.Treatment} - ${treatment.price}
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
