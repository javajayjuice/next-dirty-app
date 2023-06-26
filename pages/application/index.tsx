import { Form, Select, Input, Button, message, Checkbox, Radio, RadioChangeEvent, Modal, Card, Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import { ApplicationInputDto, CourseDto, StringIdDto } from '../../interfaces';
import { useInstitution } from '../../providers/application/institution';
import { useCampus } from '../../providers/application/campus';
import { useInstituteFaculty } from '../../providers/application/instituteFaculty';
import { useCourse } from '../../providers/application/course';
import { useApplication } from '../../providers/application';
import router from 'next/router';
import style from './style.module.scss'
import LayoutMain from '../../components/layoutMain';
import Image from 'next/image'
import img1 from '../../assets/img1.jpeg'
import WithToken from '../../hocs/withAuth';




const Hydrated: FC<any> = () => {
    const [hydrated, setHydrated] = useState(false)
    useEffect(() => {
        if (!hydrated) {
            setHydrated(true)
        }
    }, [])
    const Index = () => {
        const [valueIsFullTime, setValueFullTime] = useState(true);
        const [instituteSelected, setInstituteSelected] = useState(false)
        const [selectCourse1, setSelectCourse1] = useState('')
        const [selectCourse2, setSelectCourse2] = useState('')
        const [selectCourse1Text, setSelectCourse1Text] = useState('')
        const [selectCourse2Text, setSelectCourse2Text] = useState('')
        const [openChoice1, setOpenChoice1] = useState(false);
        const [openChoice2, setOpenChoice2] = useState(false);
        const [isTermsChecked, setIsTermsChecked] = useState(false);
    
        const { listInstitutions, institutionsList } = useInstitution()
        const { getCampus, campusSelected } = useCampus()
        const { getInstituteFaculty, instituteFacultyFromCampus } = useInstituteFaculty()
        const { getCourse, courseSelected } = useCourse()
        const { createApplication, applicationCreated } = useApplication()
    
        const [form] = Form.useForm();
    
        const onChange = (e: RadioChangeEvent) => {
            console.log('radio checked', e.target.value);
            setValueFullTime(e.target.value);
        };
    
        useEffect(() => {
            console.log('reset')
            form.resetFields();
        }, [applicationCreated])
    
    
        const onFinish = (values: ApplicationInputDto) => {
            values.isFullTime = valueIsFullTime
            values.firstChoice = selectCourse1
            values.secondChoice = selectCourse2
            console.log('application::', values)
            createApplication(values)
        };
    
        const onFinishFailed = (errorInfo: any) => {
            message.warning("Failed check your inputs and try again")
        };
    
        const onSelectInstitute = (value: StringIdDto) => {
            getCampus(value)
            setInstituteSelected(true)
        }
        const onSelectCampus = (value: string) => {
            console.log('selected Campus::', value)
            getInstituteFaculty(value)
        }
        const onSelectFaculty = (value: string) => {
            console.log('selected Faculty::', value)
            getCourse(value)
        }
        const onSelectCourse1 = (value: CourseDto) => {
            setSelectCourse1Text(value.name);
            setSelectCourse1(value.id);
            form.setFieldsValue({ firstChoice: value.id }); // Update the form field with the selected course value
            setOpenChoice1(false); // Close the modal
            listInstitutions()
    
        };
        const onSelectCourse2 = (value: CourseDto) => {
            console.log('selected Course 2::', value)
            setSelectCourse2(value.id)
            setSelectCourse2Text(value.name)
        }
    
    
    
        const handleFormValuesChange = () => {
            if (isTermsChecked) {
                setIsTermsChecked(false)
            }
            if (!isTermsChecked) {
                setIsTermsChecked(true)
            }
        };
        return (
            <LayoutMain>
                <div className={`${style.sectionMain} sectionMain`}>
                    <div className={`${style.sectionA} sectionA`} >
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                        >
                            <h1 className={`${style.head} head`}> QUALIFICATION DETAILS</h1>
                            {institutionsList != null ? <Form.Item
                                name="institutionId"
                                style={{ textTransform: 'uppercase' }}
                            >
                                <Select placeholder="Institution" onChange={onSelectInstitute} >
                                    {institutionsList.map(option => (
                                        <Select.Option value={option.id} key={option.id} style={{ textTransform: 'uppercase' }}>
                                            {option.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item> : null}
    
                            <Form.Item className="modal-group" rules={[{ required: true, message: "Please input your First Choice of Study!" }]}
                                noStyle={true}>
                                <h1>{selectCourse1Text}</h1>
                                {instituteSelected ? <Button className={`${style.btnChoice} btnChoice`} type="primary" onClick={() => setOpenChoice1(true)}>
                                    First Choice
                                </Button> : null}
                                <Modal
                                    title="SELECT CHOICE ONE"
                                    centered
                                    open={openChoice1}
                                    onOk={() => setOpenChoice1(false)}
                                    onCancel={() => setOpenChoice1(false)}
                                    width={1000}
                                    bodyStyle={{ height: '700px', overflow: 'scroll' }}
                                >
                                    {campusSelected != null ? <Form.Item
                                        name="campus"
                                    >
                                        <Select placeholder="Campus" onSelect={onSelectCampus}>
                                            {campusSelected.map(option => (
                                                <Select.Option value={option.id} key={option.id} >
                                                    {option.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item> : null}
    
                                    {instituteFacultyFromCampus != null ? <Form.Item
                                        name="Faculty"
                                    >
                                        <Select placeholder="Faculty" onSelect={onSelectFaculty}>
                                            {instituteFacultyFromCampus.map(option => (
                                                <Select.Option value={option.id} key={option.id} >
                                                    {option.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item> : null}
    
                                    {courseSelected != null ? <Form.Item
                                        name="firstChoice"
                                    >
                                        <Select placeholder="First Course of Choice" onSelect={onSelectCourse1}>
                                            {courseSelected.map(option => (
                                                <Select.Option value={option.id} key={option.id} >
                                                    {option.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
    
                                        {courseSelected != null ? courseSelected.map((item) => (
                                            <Card className={`${style.card} card`} key={item.id} title={item.name} onClick={() => onSelectCourse1(item)}>
                                                <p className={`${style.pTag} pTag`} onClick={() => onSelectCourse1(item)}>{item.description}</p>
                                                <p className={`${style.pTag} pTag`}>Minimum: {item.minimumAps}</p>
                                                <p className={`${style.pTag} pTag`}>NQF Level: {item.nqfLevel}</p>
                                                <p className={`${style.pTag} pTag`}>Code: {item.programmeCode}</p>
                                            </Card>
                                        )) : null}
    
                                    </Form.Item> : null}
                                </Modal>
                            </Form.Item>
    
                            <Form.Item className="modal-group">
                                <h1>{selectCourse2Text}</h1>
                                {instituteSelected ? <Button className={`${style.btnChoice} btnChoice`} type="primary" onClick={() => setOpenChoice2(true)}>
                                    Second Choice
                                </Button> : null}
                                <Modal
                                    title="SELECT CHOICE TWO"
                                    centered
                                    open={openChoice2}
                                    onOk={() => setOpenChoice2(false)}
                                    onCancel={() => setOpenChoice2(false)}
                                    width={1000}
                                    bodyStyle={{ height: '700px', overflow: 'scroll' }}
                                >
                                    {campusSelected != null ? <Form.Item
                                        name="campus"
                                        wrapperCol={{ offset: 0, span: 0 }}
                                    >
                                        <Select placeholder="Campus" onSelect={onSelectCampus}>
                                            {campusSelected.map(option => (
                                                <Select.Option value={option.id} key={option.id} >
                                                    {option.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item> : null}
    
                                    {instituteFacultyFromCampus != null ? <Form.Item
                                        name="Faculty"
                                        wrapperCol={{ offset: 0, span: 0 }}
                                    >
                                        <Select placeholder="Faculty" onSelect={onSelectFaculty}>
                                            {instituteFacultyFromCampus.map(option => (
                                                <Select.Option value={option.id} key={option.id} >
                                                    {option.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item> : null}
    
                                    {courseSelected != null ? <Form.Item
                                        name="secondChoice"
                                        wrapperCol={{ offset: 0, span: 0 }}
                                    >
                                        <Select placeholder="Second Course of Choice" onSelect={onSelectCourse2}>
                                            {courseSelected.map(option => (
                                                <Select.Option value={option.id} key={option.id} >
                                                    {option.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item> : null}
    
                                    {courseSelected != null ? courseSelected.map((item) => (
                                        <Card className={`${style.card} card`} key={item.id} title={item.name} onClick={() => onSelectCourse2(item)}>
                                            <p className={`${style.pTag} pTag`} onClick={() => onSelectCourse2(item)}>{item.description}</p>
                                            <p className={`${style.pTag} pTag`}>Minimum: {item.minimumAps}</p>
                                            <p className={`${style.pTag} pTag`}>NQF Level: {item.nqfLevel}</p>
                                            <p className={`${style.pTag} pTag`}>Code: {item.programmeCode}</p>
                                        </Card>
                                    )) : null}
                                </Modal>
    
                            </Form.Item>
    
                            <Form.Item
                                name="yearOfStudy"
                                rules={[{ required: true, message: "Please input your year Of Study!" }]}
                            >
                                <Input placeholder="Year of Study" className={style.input} />
                            </Form.Item>
    
                            <Radio.Group name='isFullTime' onChange={onChange} value={valueIsFullTime} >
                                <Radio value={true} className={style.radio}>Full-Time</Radio>
                                <Radio value={false} className={style.radio}>Part-Time</Radio>
                            </Radio.Group>
    
                            <h1 >APPLICATION CONSENT 2023</h1>
    
                            <Form.Item name="terms" valuePropName="checked" noStyle={true}
                            >
                                <Checkbox onClick={() => handleFormValuesChange()}>{"Do you agree with the t's and c's?"}</Checkbox>
                            </Form.Item>
    
    
                            <Form.Item >
                                <div className={style.btnGroup}>
    
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className={`${style.btnSubmit} btnSubmit`}
                                        disabled={isTermsChecked ? false : true}
                                    >
                                        Submit
                                    </Button>
                                    <Button type='primary' onClick={() => router.push('/dashboard')} className={`${style.btnClose} btnClose`}>Close</Button>
                                </div>
    
                            </Form.Item>
    
                        </Form>
                    </div>
                    <div className={`${style.sectionB} sectionB`} >
                        <Image src={img1} width={700} height={400} alt="" sizes=" 100vw" className={`${style.image} image`} />
                        <div className={`${style.info} info`}>
                            <ol className={`${style.olTag} olTag`}>
                                NB
                                <li>Please ensure that you qualify for the first and second choice of study</li>
                                <li>Please note that applying here does not imply that you are a student until you are officially admitted / registered by respective institution.
                                </li>
                            </ol>
                            <p>UNDERGRADUATE PROGRAMMES ONLY</p>
                        </div>
                    </div>
                </div>
                <Button onClick={() => router.push('/details/parent')} className={`${style.btnNext} btnNext`}>Next</Button>
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