import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, DatePicker, Switch, List, Checkbox } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DaysOffForm = ({ setDaysOff }) => {
  const [daysOff, setOffDays] = useState([
    { name: 'Eid Mubarak', dateFrom: '2022-06-23', dateTo: '2022-11-22', repeatEveryYear: true },
    { name: 'New Year Holiday', dateFrom: '2022-12-23', dateTo: '2023-01-03', repeatEveryYear: false }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDayOff, setNewDayOff] = useState({ name: '', dateFrom: null, dateTo: null, repeatEveryYear: false });

  useEffect(() => {
    setDaysOff(daysOff);
  }, [daysOff, setDaysOff]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (newDayOff.name && newDayOff.dateFrom && newDayOff.dateTo) {
      setOffDays([...daysOff, newDayOff]);
      setNewDayOff({ name: '', dateFrom: null, dateTo: null, repeatEveryYear: false });
      setIsModalVisible(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (field, value) => {
    setNewDayOff(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setNewDayOff(prev => ({ ...prev, dateFrom: dates[0]?.format('YYYY-MM-DD'), dateTo: dates[1]?.format('YYYY-MM-DD') }));
    } else {
      setNewDayOff(prev => ({ ...prev, dateFrom: null, dateTo: null }));
    }
  };

  const togglerepeatEveryYear = (index) => {
    const updatedDaysOff = [...daysOff];
    updatedDaysOff[index].repeatEveryYear = !updatedDaysOff[index].repeatEveryYear;
    setOffDays(updatedDaysOff);
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={daysOff}
        renderItem={(item, index) => (
          <List.Item
            actions={[<Checkbox checked={item.repeatEveryYear} onChange={() => togglerepeatEveryYear(index)}>Repeat yearly</Checkbox>]}
          >
            <List.Item.Meta
              title={item.name}
              description={`${dayjs(item.dateFrom).format('DD MMM YYYY')} - ${dayjs(item.dateTo).format('DD MMM YYYY')}`}
            />
          </List.Item>
        )}
      />
      <Button type="dashed" onClick={showModal} style={{ marginTop: '20px' }}>
        + Add Day Off
      </Button>
      <Modal title="Add Day Off" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="mb-4">
          <label className="block mb-2">Day Off Name</label>
          <Input value={newDayOff.name} onChange={(e) => handleChange('name', e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <RangePicker
            format="DD MMM YYYY"
            onChange={handleDateChange}
            value={newDayOff.dateFrom && newDayOff.dateTo ? [dayjs(newDayOff.dateFrom), dayjs(newDayOff.dateTo)] : []}
          />
        </div>
        <div className="mb-4">
          <Switch
            checked={newDayOff.repeatEveryYear}
            onChange={(checked) => handleChange('repeatEveryYear', checked)}
          />
          <span className="ml-2">Repeat this day off yearly</span>
        </div>
      </Modal>
    </div>
  );
};

export default DaysOffForm;
