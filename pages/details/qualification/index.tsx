import React, { FC, useEffect, useState } from 'react'
import { ParentInputDto, QualificationDto, StringIdDto } from '../../../interfaces';
import { Button, Form, Input, InputNumber, Popconfirm, Select, Table, Typography, message } from 'antd';
import { ReflistResult, ReflistStatus, ReflistTitle } from '../../../enums';
import { useQualification } from '../../../providers/details/qualification';
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
        const { createQualification, fetchQualification, qualificationFetched,deleteQualification } = useQualification();
    
        useEffect(() => {
            fetchQualification()
        }, [])
    
        const onFinish = (values: QualificationDto) => {
            console.log('qualification::', values)
            createQualification(values)
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
            const newData = qualificationFetched.filter((item) => item.id !== key);
            setData(newData);
            console.log('key::::', key)
            deleteQualification(key)
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
                title: 'fieldOfStudy',
                dataIndex: 'fieldOfStudy',
                width: '25%',
                editable: true,
            },
            {
                title: 'institution',
                dataIndex: 'institution',
                width: '15%',
                editable: true,
            },
            {
                title: 'yearStart',
                dataIndex: 'yearStart',
                width: '40%',
                editable: true,
            },
            {
                title: 'yearEnd',
                dataIndex: 'yearEnd',
                width: '40%',
                editable: true,
            },
            {
                title: 'status',
                dataIndex: 'status',
                width: '40%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (_: any, record: Item) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
                            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                                Save
                            </Typography.Link>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                    );
                },
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (_, record) =>
                qualificationFetched.length >= 1 ? (
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
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <h1 className={style.head}>CERTIFICATES</h1>
    
                            <Form.Item
                                name="yearStart"
                                rules={[{ required: true, message: "Please input your yearStart!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Start Year" className={style.input}/>
                            </Form.Item>
                            <Form.Item
                                name="yearEnd"
                                rules={[{ required: true, message: "Please input your yearEnd!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="End Year" className={style.input}/>
                            </Form.Item>
                            <Form.Item
                                name="institution"
                                rules={[{ required: true, message: "Please input your institution!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Institution" className={style.input}/>
                            </Form.Item>
                            <Form.Item
                                name="fieldOfStudy"
                                rules={[{ required: true, message: "Please input your fieldOfStudy!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Field Of Study" className={style.input}/>
                            </Form.Item>
    
                            <Form.Item
                                name="status">
                                <Select placeholder="Status">
                                    {resultOptions.map(option => (
                                        <Select.Option value={option.value} key={option.value}>
                                            {option.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item noStyle={true} className="btn-group">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="submit-btn"
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={style.sectionB}>
                        <Form form={form} component={false}>
                            <Table
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                bordered
                                dataSource={qualificationFetched}
                                columns={mergedColumns}
                                rowClassName="editable-row"
                                pagination={{
                                    onChange: cancel,
                                }}
                            />
                        </Form>
                    </div>
                </div>
                <Button onClick={() => router.push('/details/file')} className={style.btnNext}>Next</Button>
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