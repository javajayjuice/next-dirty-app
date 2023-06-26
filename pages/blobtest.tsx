import React, { useState } from 'react';
import api from "./api";

function convertStringToByteArray(string) {
  const byteArray = new Uint8Array(string.length);
  for (let i = 0; i < string.length; i++) {
    byteArray[i] = string.charCodeAt(i);
  }
  return byteArray;
}

function convertByteArrayToFile(byteArray, fileName, mimeType) {
  const blob = new Blob([byteArray], { type: mimeType });
  const file = new File([blob], fileName);
  return file;
}

const BlobComponent = () => {
  const [downloadLink, setDownloadLink] = useState(null);

  const handleGet = () => {
    api.get(`https://localhost:44311/api/services/app/StoredFile/GetFilesByApplicantId`)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          const byteString = res.result[0].data; // Replace with your byte string
          const fileName = "example.png"; // Replace with your desired file name
          const mimeType = "document/pdf"; // Replace with the appropriate MIME type

          const byteArray = convertStringToByteArray(byteString);
          const file = convertByteArrayToFile(byteArray, fileName, mimeType);
          const fileURL = URL.createObjectURL(file);
          setDownloadLink(fileURL);
          console.log('file', file)
        }
      })
      .catch((error) => {
        console.log('error::', error);
      });
  };

  return (
    <div>
      <button onClick={handleGet}>Get File</button>
      {downloadLink && (
        <div>
          <a href={downloadLink} download>Download File</a>
          <iframe src={downloadLink} title="File Preview" width="100%" height="500px" />
        </div>
      )}
    </div>
  );
};

export default BlobComponent;
