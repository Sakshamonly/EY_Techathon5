import React, { useState } from 'react';
import { Form, Input, Button, Upload, List, message } from 'antd';
import { UploadOutlined, FileTextOutlined } from '@ant-design/icons';

const NotesAndDocuments = ({ appointmentDetails, setAppointmentDetails }) => {
  const [notes, setNotes] = useState(appointmentDetails.notes || '');
  const [fileList, setFileList] = useState(appointmentDetails.files || []);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    setAppointmentDetails({ ...appointmentDetails, notes: newNotes });
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setAppointmentDetails({ ...appointmentDetails, files: newFileList });
  };

  const handleSubmit = () => {
    message.success('Information saved successfully!');
  };

  return (
    <div className="p-4">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Notes (optional)">
          <Input.TextArea
            placeholder="Add your notes here..."
            value={notes}
            onChange={handleNotesChange}
            maxLength={200}
          />
        </Form.Item>
        <Form.Item label="Medical Documents (optional)">
          <Upload
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Files</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">
          <FileTextOutlined /> Appointment Summary
        </h3>
        <div className="mt-4">
          <h4 className="font-semibold">Doctor:</h4>
          <p>{appointmentDetails.doctor || 'No doctor selected.'}</p>

          <h4 className="font-semibold">Fees:</h4>
          <p>{appointmentDetails.fees ? `$${appointmentDetails.fees}` : 'No fees available.'}</p>

          <h4 className="font-semibold">Date of Appointment:</h4>
          <p>{appointmentDetails.date || 'No date selected.'}</p>

          <h4 className="font-semibold">Time Slot:</h4>
          <p>{appointmentDetails.timeSlot || 'No time slot selected.'}</p>

          <h4 className="font-semibold mt-4">Notes:</h4>
          <p>{notes || 'No notes added.'}</p>

          <h4 className="font-semibold mt-4">Uploaded Documents:</h4>
          <List
            bordered
            dataSource={fileList}
            renderItem={item => (
              <List.Item key={item.uid}>
                <a href={URL.createObjectURL(item.originFileObj)} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default NotesAndDocuments;
