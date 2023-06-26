import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useUser } from '../../../../providers/user'
import { useApplication } from '../../../../providers/application'
import style from './style.module.scss';
import { Button, Checkbox, Descriptions, Form, Input, Select, Space, Table, Tag } from 'antd';
import api from '../../../api';

const Index = () => {
    const router = useRouter()
    const { } = useUser()
    const { applicationSelected, getApplication } = useApplication()

    useEffect(() => {
        const { id } = router.query
        getApplication(id)
    }, [])

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const viewFile = async (fileId) => {
         api.get(`https://localhost:44311/api/services/app/StoredFile/DownloadFile?fileId=${fileId}`, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));

                const link = document.createElement('a');
                link.href = url;

                window.open(url, '_blank');
            })
    }


    const columnSubjects = [
        {
            title: 'Subject',
            dataIndex: 'subjectName',
            key: 'subjectName',
        },
        {
            title: 'APS',
            dataIndex: 'aps',
            key: 'aps',
        }
    ];
    const columnQualifications = [
        {
            title: 'Field of Study',
            dataIndex: 'fieldOfStudy',
            key: 'fieldOfStudy',
        },
        {
            title: 'Institution',
            dataIndex: 'institution',
            key: 'institution',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }
    ];
    const columnFiles = [
        {
            title: 'File Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={()=> viewFile(record.id)}>View</a>
                </Space>
            ),
        },
    ];

    return (
        <div className={`${style.formContainer} formContainer`}>
            {applicationSelected ? (
                <form className={`${style.form} form`}>
                    <div className={`${style.container} container`}>
                        <div className={`${style.personal} personal`}>
                            <Descriptions column={4} title="User Info" layout="horizontal">
                                <Descriptions.Item label="Name">{applicationSelected.applicant.name}</Descriptions.Item>
                                <Descriptions.Item label="Surname">{applicationSelected.applicant.surname}</Descriptions.Item>
                                <Descriptions.Item label="Email Address">{applicationSelected.applicant.emailAddress}</Descriptions.Item>
                                <Descriptions.Item label="Phone Number">{applicationSelected.applicant.phoneNumber}</Descriptions.Item>
                                <Descriptions.Item label="ID">{applicationSelected.applicant.identityNumber}</Descriptions.Item>
                                <Descriptions.Item label="Date Of Birth">{applicationSelected.applicant.dateOfBirth}</Descriptions.Item>
                                <Descriptions.Item label="Disable">{applicationSelected.applicant.diability}</Descriptions.Item>
                                <Descriptions.Item label="Nature of Disability">{applicationSelected.applicant.natureOfDisability}</Descriptions.Item>
                                <Descriptions.Item label="Title">{applicationSelected.applicant.title}</Descriptions.Item>
                                <Descriptions.Item label="Gender">{applicationSelected.applicant.gender}</Descriptions.Item>
                                <Descriptions.Item label="Home Language">{applicationSelected.applicant.homeLanguage}</Descriptions.Item>
                                <Descriptions.Item label="Population Group">{applicationSelected.applicant.populationGroup}</Descriptions.Item>
                                <Descriptions.Item label="Current Activity">{applicationSelected.applicant.currentActivity}</Descriptions.Item>
                                <Descriptions.Item label="Previous Activity">{applicationSelected.applicant.previousActivity}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className={`${style.address} address`}>
                            <Descriptions column={1} title="Address" layout="horizontal">
                                <Descriptions.Item label="Street">{applicationSelected.applicant.address.street}</Descriptions.Item>
                                <Descriptions.Item label="Town">{applicationSelected.applicant.address.town}</Descriptions.Item>
                                <Descriptions.Item label="Suburb">{applicationSelected.applicant.address.suburb}</Descriptions.Item>
                                <Descriptions.Item label="City">{applicationSelected.applicant.address.city}</Descriptions.Item>
                                <Descriptions.Item label="Province">{applicationSelected.applicant.address.province}</Descriptions.Item>
                                <Descriptions.Item label="Postal Code">{applicationSelected.applicant.address.postalCode}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className={`${style.application} application`}>
                            <Descriptions column={1} title="Application" layout="horizontal" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Descriptions.Item label="Year of Study">{applicationSelected.yearOfStudy}</Descriptions.Item>
                                <Descriptions.Item label="Is it Full Time">{applicationSelected.isFullTime.toString()}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className={`${style.dynamicContainer} dynamicContainer`}>
                            <div className={`${style.subject} subject`}>
                                <h3>Subjects</h3>
                                <Table columns={columnSubjects} dataSource={applicationSelected.applicant.applicantSubjects} />
                            </div>
                            <div className={`${style.file} file`}>
                                <h3>Uploads</h3>
                                <Table columns={columnFiles} dataSource={applicationSelected.applicant.storedFiles} />
                            </div>
                            <div className={`${style.qualification} qualification`}>
                                <h3>Qualifications</h3>
                                <Table columns={columnQualifications} dataSource={applicationSelected.applicant.qualifications} />
                            </div>
                        </div>
                        <Form
                            name="basic"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item label="Update Status">
                                <Select>
                                    <Select.Option value={1}>Pending</Select.Option>
                                    <Select.Option value={2}>Rejected</Select.Option>
                                    <Select.Option value={3}>Accepted</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Reason">
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={`${style.btnGroup} btnGroup`}>

                    </div>
                </form>
            ) : ('nothing to display')}
        </div>
    )
}

export default Index