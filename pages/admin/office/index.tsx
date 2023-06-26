import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import LayoutMain from '../../../components/layoutMain';
import style from './style.module.scss'
import { useApplication } from '../../../providers/application';
import router from 'next/router';
import { useUser } from '../../../providers/user';
import WithToken from '../../../hocs/withAuth';

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

const index = () => {

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const {applicationsList, listApplications} = useApplication()


    useEffect(() => {
        listApplications()
    }, [])
    
    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleDelete = (key: React.Key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
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
            title: 'Institution',
            dataIndex: 'institution',
            width: '100%',
            editable: true,
            render: (_, record) => record.institution.name,
        },
        {
            title: 'Applicant',
            dataIndex: 'faculty',
            width: '100%',
            editable: true,
            render: (_, record) => `${record.applicant.name} ${record.applicant.surname}`,
        },
        {
            title: 'Year of Study',
            dataIndex: 'yearOfStudy',
            width: '100%',
            editable: true,
        },
        {
            title: 'Date Submitted',
            dataIndex: 'creationTime',
            width: '100%',
            editable: true,
        },
        {
            title: 'Is Full-time',
            dataIndex: 'institution',
            width: '100%',
            editable: true,
            render: (_, record) => record.isFullTime.toString(),
        },       
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
            applicationsList.length >= 1 ? (
                    <Popconfirm title="View Application?" onConfirm={() => router.push(`/admin/office/applicationview/${record.id}`)}>
                        <a>View</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    console.log('app:::', applicationsList)
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <LayoutMain>
            <div className={`${style.sectionMain} sectionMain`}>
                <div className={`${style.sectionA} sectionA`} >
                    <h1>APPLICATIONS</h1>
                    </div>
                <div className={`${style.sectionB} sectionB`} >
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={applicationsList}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                            }}
                        />
                    </Form>
                </div>
            </div>
        </LayoutMain>
    )
}

export default WithToken(index)