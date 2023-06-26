import { FC, useEffect, useState } from 'react';
import { Upload, Button, Form, Input, InputNumber, Popconfirm, Table, Typography, message, Modal } from 'antd';
import { DeleteOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ReflistResult } from '../../../enums';
import { QualificationDto, StoredFileDto } from '../../../interfaces';
import api from '../../api';
import router from 'next/router';
import LayoutMain from '../../../components/layoutMain';
import style from './style.module.scss'


const Hydrated: FC<any> = () => {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    if (!hydrated) {
      setHydrated(true)
    }
  }, [])


  interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const originData: Item[] = [];
  for (let i = 0; i < 10; i++) {
    originData.push({
      key: i.toString(),
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


  function Index() {
    const [send, setSend] = useState<any>()
    const [modal2Open, setModal2Open] = useState(true);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfError, setPdfError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const allowedFiles = ['application/pdf'];
    const handleFile = (file) => {
      if (file) {
        if (file && allowedFiles.includes(file.type)) {
          setPdfError('');
          setPdfFile(URL.createObjectURL(file));
          setSelectedFile(file)

        } else {
          setPdfError('Not a valid PDF: Please select only PDF files');
          setPdfFile(null);
        }
      } else {
        console.log('Please select a PDF');
      }
    };

    interface FileObject {
      id: string;
      name: string;
      url: string;
    }
    const handleSave = () => {
      const formData = new FormData();
      formData.append('File', selectedFile);

      api.post('https://localhost:44311/api/services/app/StoredFile/UploadFile', formData)
        .then(response => {
          message.success('File uploaded successfully')
          const newFile = response.data.result
          const addFile: any = {
            id: newFile.id,
            name: newFile.name,
            url: newFile.id
          }
          window.location.replace('/details/file')
          file.push(addFile)

          const spreadFile = [...file, ...addFile]

          setFile(spreadFile)
        })
        .catch(error => {
          // Handle the error if the upload fails
          console.error('File upload error:', error);
        });
    }

    const handleCancel = () => {
      setSelectedFile(null);
      setPdfFile('')

    }

    const [file, setFile] = useState([])

    useEffect(() => {
      api.get(`https://localhost:44311/api/services/app/StoredFile/GetFilesByApplicantId`, { responseType: 'json' })
        .then((response) => {
          const allFiles = response.data.result;
          const getApplicantsFiles = async () => {
            const files = allFiles.map(async (file) => {
              const response = await api.get(`https://localhost:44311/api/services/app/StoredFile/DownloadFile?fileId=${file.id}`, { responseType: 'blob' })
              const fileBlob = new Blob([response.data], {
                type: response.headers['content-type'],
              });
              // const responseName = await api.get(`https://localhost:44311/api/services/app/StoredFile/DownloadFile?fileId=${file.id}`, { responseType: 'json' })
              // console.log('responseName', responseName)
              const fileUrl = URL.createObjectURL(fileBlob);
              console.log('file name::::', file)
              return { id: file.id, name: file.name, url: fileUrl };
            })
            const allFileData = await Promise.all(files);
            setFile(allFileData)
          }
          getApplicantsFiles()
        })
        .catch((error) => {
          console.log('error::', error)
        });
    }, [])

    //table
    const onFinish = (values: QualificationDto) => {
      console.log(values)
    };

    const onFinishFailed = (errorInfo: any) => {
      message.warning("Failed to login check your credentials and try again")
    };

    const resultOptions = Object.keys(ReflistResult)
      .filter(key => typeof ReflistResult[key] === 'number')
      .map(key => ({
        label: key,
        value: ReflistResult[key]
      }));


    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
      form.setFieldsValue({ name: '', age: '', address: '', ...record });
      setEditingKey(record.key);
    };

    const cancel = () => {
      setEditingKey('');
    };

    const handleDelete = (key: React.Key) => {
      const newData = file.filter((item) => item.id !== key);
      setFile(newData);
      console.log('delete key::::', key)
      api.delete(`https://localhost:44311/api/services/app/StoredFile/Delete?id=${key}`).then((res) => {
        if (res.status === 200) {
          console.log('deleted')
        }
      }).catch((error) => {
        console.log('Error all courses::', error);
      });
    };

    const save = async (key: React.Key) => {
      try {
        const row = (await form.validateFields()) as Item;

        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '600px',
        editable: true,
      },
      {
        title: 'Delete',
        dataIndex: 'operation',
        render: (_, record) =>
          file.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <DeleteOutlined />
            </Popconfirm>
          ) : null,
      },
      {
        title: 'View',
        dataIndex: 'view',
        render: (_, record) =>
          file.length >= 1 ? (
            <a href={record.url} target='_blank'><SearchOutlined /></a>
          ) : null,
      },
    ];

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: Item) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    //end of table

    return (
      <LayoutMain>
        <div className={style.sectionMain}>

          <div className={style.sectionB} >
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={file}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </div>
          <div className={style.sectionA} >
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
            <div className={style.viewer}>
              {pdfFile ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                  <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
                </Worker>
              ) : (
                <div>No file is selected yet</div>
              )}
              <Modal
                title="ACADEMIC DOCUMENTS"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
              >
                <h2>Photocopies of all documents must be certified</h2>
                <p>Final Grade 12 statement of symbols if certificate is not issued yet/upgrade confirmation letter if necessary</p>
                <p>Senior Certificate (SC) (prior to 2008) OR National Senior Certificate (NSC) OR Independent Examination Board
                  certificate (IEB) OR SACAI</p>
                <p>Previous degree/diploma(s) Certificates if completed at another higher education institution</p>
                <p>Academic Record and Certificate of Conduct if registered/completed at another higher education institution</p>
                <p>Name your documents formally</p>
              </Modal>
            </div>
            <Button onClick={() => handleSave()}>SAVE</Button>
            <Button onClick={() => handleCancel()}>CANCEL</Button>
          </div>
        </div>
        <Button onClick={() => router.push('/dashboard')} className={style.btnNext}>Done</Button>
      </LayoutMain>
    );
  }
  return (
    <>
      {hydrated ? <Index/> : null}
    </>
  )

}

export default Hydrated;
