import React, { useEffect, useState } from 'react'
import api from "./api";
import parse from "html-react-parser";


function convertStringToByteArray(string) {
    const byteArray = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
        byteArray[i] = string.charCodeAt(i);
    }
    return byteArray;
}

function convertByteArrayToFile(byteArray, fileName) {
    const blob = new Blob([byteArray]);
    const file = new File([blob], fileName);
    return file;
}

const blob = () => {

    const [file, setFile] = useState([])

    useEffect(() => {
      
        
            console.log('okay')
            const x = "CF22A20C-0000-4506-C482-08DB7377A4B6"
            // api.get(`https://localhost:44311/api/services/app/StoredFile/DownloadFile?fileId=${x}`, { responseType: 'blob' })
            api.get(`https://localhost:44311/api/services/app/StoredFile/GetAllFilesByApplicant`, { responseType: 'json' })
                .then((response) => {
                    // console.log('blob response:::', response.data)
                    // // Create a download URL for the file
                    // const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
    
                    // console.log('blob url:::', url)
                    // // Create an anchor element to trigger the file download
                    // const link = document.createElement('a');
                    // link.href = url;
                    // // link.setAttribute('download', response.headers['content-type']);
                    // document.body.appendChild(link);
                    // link.click();
    
                    // // Clean up the temporary URL and anchor element
                    // window.URL.revokeObjectURL(url);
                    // document.body.removeChild(link);
    
                    //error
                    // console.log('blob::::', response.data.result[0].data)
                    // setFile(response.data.result[0].data)
    
                    const allFiles = response.data.result;
    
                    console.log('all files::::', allFiles)
    
    
    
                    const getApplicantsFiles = async () => {
    
                        const files = allFiles.map(async (file) => {
                           const response = await api.get(`https://localhost:44311/api/services/app/StoredFile/DownloadFile?fileId=${file.id}`, { responseType: 'blob' })
                                
                                
                                const fileBlob = new Blob([response.data], {
                                    type: response.headers['content-type'],
                                });

                                const fileUrl = URL.createObjectURL(fileBlob);
                                // console.log('test id::::', file.id)
                                // console.log('test url', fileUrl)

                                // const link = document.createElement('a');
                                // link.href = fileUrl;

                                // document.body.appendChild(link);
                                // link.click();

                                // window.URL.revokeObjectURL(fileUrl);
                                // document.body.removeChild(link);
                                console.log('file id:::::', fileUrl)

                                console.log('files::::', file)

                                return { id: file.id, url: fileUrl};
                        })

                        const allFileData = await Promise.all(files);
                        setFile(allFileData)
                        console.log('all data:::', allFileData)
                    }
    
                    getApplicantsFiles()
                })
                .catch((error) => {
                    console.log('error::', error)
                });
    
        
    }, [])
    

    // Example usage

    return (
        <div>
            <button >get</button>
            {file ? (file.map((f) => (
                <a href={f.url} target='_blank'>{f.id}</a>
            ))): 'empty'}
        </div>
    )
}

export default blob