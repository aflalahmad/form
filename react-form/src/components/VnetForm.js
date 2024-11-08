import React, { useState } from 'react';
import '../css/VnetForm.css';  // Import the CSS file

const VnetForm = () => {
  const [formData, setFormData] = useState({
    vnetName: '',
    resourceGroup: '',
    location: '',
    addressSpace: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="vnet-form-container">
      <h2>Create Virtual Network (VNet)</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vnetName">VNet Name</label>
          <input
            type="text"
            id="vnetName"
            name="vnetName"
            value={formData.vnetName}
            onChange={handleChange}
            required
            placeholder="Enter VNet Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="resourceGroup">Resource Group</label>
          <input
            type="text"
            id="resourceGroup"
            name="resourceGroup"
            value={formData.resourceGroup}
            onChange={handleChange}
            required
            placeholder="Enter Resource Group"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter Location (e.g., East US)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="addressSpace">Address Space</label>
          <input
            type="text"
            id="addressSpace"
            name="addressSpace"
            value={formData.addressSpace}
            onChange={handleChange}
            required
            placeholder="Enter Address Space (e.g., 10.0.0.0/16)"
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default VnetForm;
