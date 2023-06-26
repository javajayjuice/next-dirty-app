import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { ApplicantSubjectReducer } from './reducer';
import { ApplicantSubjectActionContext, ApplicantSubjectStateContext, INITIAL_STATE } from './context';

import { createApplicantSubjectRequestAction, deleteApplicantSubjectRequestAction, fetchApplicantSubjectRequestAction, updateApplicantSubjectRequestAction } from './actions';
import { message } from 'antd';
import { ApplicantSubjectDto } from '../../../../interfaces';
import api from '../../../../pages/api';

// Define the provider and the endpoint functionality
const ApplicantSubjectProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(ApplicantSubjectReducer, INITIAL_STATE);

    //[CREATE_APPLICANT_SUBJECT_REQUEST]
    const createApplicantSubject = (applicantSubject: ApplicantSubjectDto) => {
        console.log('passed applicant subject', applicantSubject);
        api
            .post('https://localhost:44311/api/services/app/ApplicantSubject/Create', applicantSubject)
            .then((response) => {
                const res = response.data;
                if (res.success) {
                    console.log('index create subject applicant::', res.result)
                    dispatch(createApplicantSubjectRequestAction(res.result));
                    message.success('Subject added successfully.');
                }
            })
            .catch((error) => {
                message.error(error);
            });
    };

    //[UPDATE_APPLICANT_SUBJECT_REQUEST]
    const updateApplicantSubject = (updatedApplicantSubject: ApplicantSubjectDto) => {
        api
            .put(`https://localhost:44311/api/services/app/ApplicantSubject/Update/`, updatedApplicantSubject)
            .then((response) => {
                const res = response.data;
                if (res.success) {
                    dispatch(updateApplicantSubjectRequestAction(updatedApplicantSubject));
                    message.success('Applicant subject updated successfully.');
                }
            })
            .catch((error) => {
                message.error(error);
            });
    };

// [FETCH_COURSES_REQUEST_ACTION]
const fetchApplicantSubject = async () => {
    try {
      const response = await api.get('https://localhost:44311/api/services/app/ApplicantSubject/GetAll');
      if (response.status === 200) {
        const subjects = response.data;
        console.log('all applicants subjects::', subjects.result);
        dispatch(fetchApplicantSubjectRequestAction(subjects.result));
      }
    } catch (error) {
      console.log('Error all courses::', error);
    }
  };
// [FETCH_COURSES_REQUEST_ACTION]
const deleteApplicantSubject = async (subjectId: string) => {
    try {
      const response = await api.delete(`https://localhost:44311/api/services/app/ApplicantSubject/Delete?id=${subjectId}`);
      if (response.status === 200) {
        const subjects = response.data;
        dispatch(deleteApplicantSubjectRequestAction(subjectId));
      }
    } catch (error) {
      message.error('Delete failed!')
    }
  };

    return (
        <ApplicantSubjectStateContext.Provider value={state}>
            <ApplicantSubjectActionContext.Provider value={{ createApplicantSubject, updateApplicantSubject, fetchApplicantSubject, deleteApplicantSubject }}>
                {children}
            </ApplicantSubjectActionContext.Provider>
        </ApplicantSubjectStateContext.Provider>
    );
}

function useApplicantSubjectState() {
    const context = useContext(ApplicantSubjectStateContext);
    if (!context) {
        throw new Error("useApplicantSubjectState must be used within an ApplicantSubjectProvider");
    }
    return context;
}

function useApplicantSubjectAction() {
    const context = useContext(ApplicantSubjectActionContext);
    if (context === undefined) {
        throw new Error("useApplicantSubjectAction must be used within an ApplicantSubjectProvider");
    }
    return context;
}

function useApplicantSubject() {
    return {
        ...useApplicantSubjectState(),
        ...useApplicantSubjectAction()
    };
}

export { ApplicantSubjectProvider, useApplicantSubject };