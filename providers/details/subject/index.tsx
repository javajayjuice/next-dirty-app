import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { SubjectReducer } from './reducer';
import { SubjectActionContext, SubjectStateContext, INITIAL_STATE } from './context';
import api from '../../../pages/api';
import { SubjectDto } from '../../../interfaces';
import { apsSubjectsRequestAction, createSubjectRequestAction, listSubjectsRequestAction, updateSubjectRequestAction } from './actions';
import { message } from 'antd';

// Define the provider and the endpoint functionality
const SubjectProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

    const [state, dispatch] = useReducer(SubjectReducer, INITIAL_STATE);

    // [CREATE_SUBJECT_REQUEST]
    const createSubject = (subject: SubjectDto) => {
        console.log('Passed subject');
        api.post('services/app/Subject/CreateSubject', subject)
            .then((response) => {
                const res = response.data;
                if (res.success) {
                    dispatch(createSubjectRequestAction(subject));
                    message.success('Subject added successfully.');
                    console.log('Subject Id:', res.result);
                }
            })
            .catch((error) => {
                message.error(error);
            });
    };

    // [UPDATE_SUBJECT_REQUEST]
    const updateSubject = (subjectId, updatedSubject) => {
        api.put(`services/app/Subject/UpdateSubject/${subjectId}`, updatedSubject)
            .then((response) => {
                const res = response.data;
                if (res.success) {
                    dispatch(updateSubjectRequestAction(updatedSubject));
                    message.success('Subject updated successfully.');
                }
            })
            .catch((error) => {
                message.error(error);
            });
    };

    //[APS_SUBJECTS_REQUEST]
    const apsSubjects = () => {
        api.get('services/app/ApplicantSubject/CalculateTotalAps')
            .then((response) => {
                const aps = response.data;
                if (aps) {
                    console.log('current information::', aps);
                    dispatch(apsSubjectsRequestAction(aps.result));
                    console.log('current::', aps);
                }
            })
            .catch((error) => {
                console.log('Error current information::', error);
            });
    };

    // [FETCH_SUBJECTS_REQUEST_ACTION]
    const listSubjects = async () => {
        try {
            const response = await api.get('services/app/Subject/GetAll');
            if (response.status === 200) {
                const subjects = response.data;
                console.log('all subjects::', subjects.result.items);
                dispatch(listSubjectsRequestAction(subjects.result.items));
            }
        } catch (error) {
            console.log('Error all subjects::', error);
        }
    };

    useEffect(() => {
        apsSubjects();
    }, [])

    return (
        <SubjectStateContext.Provider value={state}>
            <SubjectActionContext.Provider value={{ createSubject, updateSubject, apsSubjects, listSubjects }}>
                {children}
            </SubjectActionContext.Provider>
        </SubjectStateContext.Provider>
    );
}

function useSubjectState() {
    const context = useContext(SubjectStateContext);
    if (!context) {
        throw new Error("useSubjectState must be used within a SubjectProvider");
    }
    return context;
}

function useSubjectAction() {
    const context = useContext(SubjectActionContext);
    if (context === undefined) {
        throw new Error("useSubjectAction must be used within a SubjectProvider");
    }
    return context;
}

function useSubject() {
    return {
        ...useSubjectState(),
        ...useSubjectAction()
    };
}

export { SubjectProvider, useSubject }