import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { QualificationReducer } from './reducer';
import { QualificationActionContext, QualificationStateContext, INITIAL_STATE } from './context';
import api from '../../../pages/api';
import { QualificationDto } from '../../../interfaces';
import { createQualificationRequestAction, deleteQualificationsRequestAction, fetchQualificationRequestAction, updateQualificationRequestAction } from './actions';
import { message } from 'antd';

//define the provider and the endpoint functionality
const QualificationProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

    const [state, dispatch] = useReducer(QualificationReducer, INITIAL_STATE)

    //[CREATE_QUALIFICATION_REQUEST]
    const createQualification = (qualification: QualificationDto) => {
        console.log('passed qualification')
        api.post('services/app/Qualification/Create', qualification)
            .then((response) => {
                const res = response.data;
                if (res.success) {
                    console.log('index create:::', res.result)
                    dispatch(createQualificationRequestAction(res.result));
                    message.success('Qualification added successfully.');
                    console.log('Qualification Id::', res.result)
                }
            })
            .catch((error) => {
                message.error(error);
            });
    };

    //[UPDATE_QUALIFICATION_REQUEST]
    const updateQualification = (qualificationId, updatedQualification) => {
        api.put(`services/app/Qualification/UpdateQualification/${qualificationId}`, updatedQualification)
            .then((response) => {
                const res = response.data;
                if (res.success) {
                    dispatch(updateQualificationRequestAction(updatedQualification));
                    message.success('Qualification updated successfully.');
                }
            })
            .catch((error) => {
                message.error(error);
            });
    };

    // [FETCH_COURSES_REQUEST_ACTION]
    const fetchQualification = async () => {
        try {
            const response = await api.get('services/app/Qualification/GetAllQualificationsOfPerson');
            if (response.status === 200) {
                const qualification = response.data;
                console.log('index all qualification::', qualification.result);
                dispatch(fetchQualificationRequestAction(qualification.result));
            }
        } catch (error) {
            console.log('Error all courses::', error);
        }
    };

    const deleteQualification = async (qualificationId: string) => {
        console.log('index key::::', qualificationId)
        try {
          const response = await api.delete(`services/app/Qualification/Delete?id=${qualificationId}`);
          if (response.status === 200) {
            dispatch(deleteQualificationsRequestAction(qualificationId));
          }
        } catch (error) {
          console.log('Error all courses::', error);
        }
      };

    return (
        <QualificationStateContext.Provider value={state}>
            <QualificationActionContext.Provider value={{ createQualification, updateQualification, fetchQualification,deleteQualification }}>
                {children}
            </QualificationActionContext.Provider>
        </QualificationStateContext.Provider>
    )
}

function useQualificationState() {
    const context = useContext(QualificationStateContext);
    if (!context) {
        throw new Error("useQualificationState must be used within a QualificationProvider");
    }
    return context;
}

function useQualificationAction() {
    const context = useContext(QualificationActionContext);
    if (context === undefined) {
        throw new Error("useQualificationAction must be used within a QualificationProvider");
    }
    return context;
}

function useQualification() {
    return {
        ...useQualificationState(),
        ...useQualificationAction()
    }
}

export { QualificationProvider, useQualification }