import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import "../styles/uploadexcel.css";

const UploadExcel = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const fileInputRef = useRef(null); // Reference for file input

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Process Excel file
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file first.");
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });

      const sheetName = workbook.SheetNames[0]; // Read first sheet
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      setData(sheetData);
      sendToBackend(sheetData);
    };
  };

  // Send data to backend
  const sendToBackend = async (extractedData) => {
    try {
      const response = await axios.post("http://localhost:5002/data/upload", extractedData);
    
      alert(response.data.message);
      onUploadSuccess();

      // Reset file input and state
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input field
      }
      
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data.");
    }
  };

  return (
    <div className="upload-excel">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        ref={fileInputRef} // Assign ref to input field
      />
      <button className="upload-btn" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadExcel;
