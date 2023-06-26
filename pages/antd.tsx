import { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import api from './api';

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState('');

  const allowedFiles = ['application/pdf'];
  const handleFile = (file) => {
    if (file) {
      if (file && allowedFiles.includes(file.type)) {
        setPdfError('');
        setPdfFile(URL.createObjectURL(file));

        // Create FormData object
        const formData = new FormData();
        formData.append('File', file);

        // Send the file to the backend API
        api.post('https://localhost:44311/api/services/app/StoredFile/UploadFile', formData)
          .then(response => {
            // Handle the response from the backend if needed
            console.log('File uploaded successfully');
          })
          .catch(error => {
            // Handle the error if the upload fails
            console.error('File upload error:', error);
          });
      } else {
        setPdfError('Not a valid PDF: Please select only PDF files');
        setPdfFile(null);
      }
    } else {
      console.log('Please select a PDF');
    }
  };

  return (
    <div className="container">
      <form>
        <label>
          <h5>Upload PDF</h5>
        </label>
        <br />
        <Upload
          beforeUpload={(file) => {
            handleFile(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {pdfError && <span className="text-danger">{pdfError}</span>}
      </form>

      <h5>View PDF</h5>
      <div className="viewer">
        {pdfFile ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        ) : (
          <div>No file is selected yet</div>
        )}
      </div>
    </div>
  );
}

export default App;
