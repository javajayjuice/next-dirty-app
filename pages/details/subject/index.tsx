import React, { FC, useEffect, useState } from 'react'
import { ApplicantSubjectDto } from '../../../interfaces';
import { Button, Form, Input, InputNumber, Popconfirm, Select, Table, Typography, message } from 'antd';
import { useSubject } from '../../../providers/details/subject';
import { useApplicantSubject } from '../../../providers/details/subject/applicantSubject';
import router from 'next/router';
import LayoutMain from '../../../components/layoutMain';
import style from './style.module.scss'
import { DeleteOutlined } from '@ant-design/icons';
import WithToken from '../../../hocs/withAuth';




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
    
    
    const Index = () => {
    
        const { apsSubjects, subjectsAps, listSubjects, subjectsList } = useSubject();
        const { createApplicantSubject, applicantSubjectFetched, fetchApplicantSubject, deleteApplicantSubject } = useApplicantSubject()
    
        useEffect(() => {
            listSubjects()
            apsSubjects()
            fetchApplicantSubject()
        }, [])
    
        const onFinish = (values: ApplicantSubjectDto) => {
    
            const subjectExists = applicantSubjectFetched.some(o => o.subjectId == values.subjectId)
            console.log(values)
            if (subjectExists) {
                message.error('Already selected this one')
            } else {
                createApplicantSubject(values)
            }
    
        };
    
        const onFinishFailed = (errorInfo: any) => {
            message.warning("Failed to login check your credentials and try again")
        };
    
        const [form] = Form.useForm();
        const [data, setData] = useState([]);
        const [editingKey, setEditingKey] = useState('');
    
        const isEditing = (record: Item) => record.key === editingKey;
    
        const edit = (record: Partial<Item> & { key: React.Key }) => {
            form.setFieldsValue({ name: '', age: '', address: '', ...record });
            setEditingKey(record.key);
        };
    
        const cancel = () => {
            setEditingKey('');
        };
    
        const handleDelete = (key: string) => {
            console.log("subject delete::::", key)
            const newData = applicantSubjectFetched.filter((item) => item.id !== key);
            setData(newData);
            deleteApplicantSubject(key)
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
                title: 'Name of Subject',
                dataIndex: 'subjectName',
                width: '45%',
                editable: true,
            },
            {
                title: 'APS',
                dataIndex: 'aps',
                width: '15%',
                editable: true,
            },
            {
                title: 'Delete',
                width:'10px',
                dataIndex: 'operation',
                render: (_, record) =>
                    applicantSubjectFetched.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                            <DeleteOutlined />
                        </Popconfirm>
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

        return (
            <LayoutMain>
                <div className={style.sectionMain}>
                    <div className={style.sectionA} >
                        <Form
                            name="basic"
                            // labelCol={{ span: 8 }}
                            // wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            
                        >
                            <h1 style={{marginBottom:"20px"}}> SCHOOL-LEAVING SUBJECTS </h1>
    
                            {subjectsList ? <Form.Item
                                name="subjectId"
                                >
                                <Select placeholder="Select Subject" className={style.select}>
                                    {subjectsList.map(option => (
                                        <Select.Option value={option.id} key={option.id}>
                                            {option.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item> : null}
    
                            <Form.Item
                                name="aps"
                                rules={[{ required: true, message: "Please input your aps!" }]}
                            >
                                <InputNumber width={'100%'} min={1} max={7} placeholder="APS" className={style.inputNumber} />
                            </Form.Item>
    
    
                            <Form.Item noStyle={true} className="btn-group">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={style.btnSubmit}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={style.sectionB} >
                        <Form form={form} component={false} >
                            <Table
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                bordered
                                dataSource={applicantSubjectFetched}
                                columns={columns}
                                rowClassName="editable-row"
                                pagination={{
                                    onChange: cancel,
                                }}
                            />
                        </Form>
                    </div>
                </div>
                <Button onClick={() => router.push('/details/qualification')} className={style.btnNext}>Next</Button>
            </LayoutMain>
        )
    }
    return (
        <>
            {hydrated ? <Index /> : null}
        </>
    )

}

export default WithToken(Hydrated);