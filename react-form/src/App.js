import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    vnetName: '',
    resourceGroup: '',
    location: '',
    addressSpace: ''
  });

  const [outputUrls, setOutputUrls] = useState({ jsonUrl: null, tfvarsUrl: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format JSON
    const jsonOutput = JSON.stringify(formData, null, 2);
    const jsonBlob = new Blob([jsonOutput], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);

    // Format .tfvars
    const tfvarsOutput = `
vnet_name = "${formData.vnetName}"
resource_group_name = "${formData.resourceGroup}"
location = "${formData.location}"
address_space = ["${formData.addressSpace}"]
    `.trim();
    const tfvarsBlob = new Blob([tfvarsOutput], { type: 'text/plain' });
    const tfvarsUrl = URL.createObjectURL(tfvarsBlob);

    // Set download links for JSON and .tfvars files
    setOutputUrls({ jsonUrl, tfvarsUrl });
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

      {outputUrls.jsonUrl && (
        <div className="output-links">
          <h3>Download Outputs</h3>
          <a href={outputUrls.jsonUrl} download="output.json">Download JSON Format</a>
          <br />
          <a href={outputUrls.tfvarsUrl} download="output.tfvars">Download Terraform Format (.tfvars)</a>
        </div>
      )}
    </div>
  );
};

export default App;
