import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { InstitutionReducer } from './reducer';
import { INITIAL_STATE, InstitutionActionContext, InstitutionStateContext } from './context';
import { message } from 'antd';
import { createInstitutionRequestAction, deleteInstitutionRequestAction, listInstitutionsRequestAction, getInstitutionRequestAction, getInstitutionsTotalCountRequestAction, selectInstitutionRequestAction, updateInstitutionRequestAction } from './actions';
import { useGet } from 'restful-react';
import { InstitutionDto } from '../../../interfaces';
import api from '../../../pages/api';

// Define the provider and the endpoint functionality
const InstitutionProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    // Destructure the useReducer
    const [state, dispatch] = useReducer(InstitutionReducer, INITIAL_STATE)

    const token = 'localStorage.getItem';
    const localhost = "https://localhost:44311/api/";

    // Call the API/backend/endpoints [CREATE_INSTITUTION_REQUEST_ACTION]
    const createInstitution = async (institution: InstitutionDto) => {
        try {
            const response = await api.post(`services/app/Institution/Create`, institution);
            if (response.status === 200) {
                const data = response.data;
                dispatch(createInstitutionRequestAction(data.result));
                message.success("Institution created successfully");
            } else {
                console.log('response::', response);
                message.error(response.data.error.message);
            }
        } catch (error) {
            console.log('catch::', error.message);
        }
    };

    // [FETCH_INSTITUTIONS_REQUEST_ACTION]
    const listInstitutions = async () => {
        try {
            const response = await api.get('services/app/Institution/GetAll');
            if (response.status === 200) {
                const institutions = response.data;
                console.log('all institutions::', institutions.result);
                dispatch(listInstitutionsRequestAction(institutions.result));
            }
        } catch (error) {
            console.log('Error all institutions::', error);
        }
    };

    useEffect(() => {
        listInstitutions();
    }, []);


    // [GET_INSTITUTIONS_TOTAL_COUNT_REQUEST_ACTION]
    const getInstitutionsTotalCount = async () => {
        try {
            const response = await api.get('services/app/Institution/GetTotalCount');
            if (response.status === 200) {
                const totalInstitutions = response.data;
                console.log('total institutions::', totalInstitutions.result);
                dispatch(getInstitutionsTotalCountRequestAction(totalInstitutions.result));
            }
        } catch (error) {
            console.log('Error total institutions::', error);
        }
    };

    //   useEffect(() => {
    //     getInstitutionsTotalCount();
    //   }, []);


    // [UPDATE_INSTITUTIONS_REQUEST_ACTION]
    const updateInstitution = async (updatedData: InstitutionDto) => {
        try {
            const response = await api.put(`${localhost}/services/app/Institution/Update/`, updatedData);

            if (response.status === 200) {
                const data = response.data;
                dispatch(updateInstitutionRequestAction(data.result));
                // dispatch(selectInstitutionRequestAction(data.result));
                message.success("Institution updated successfully");
            } else {
                const data = response.data;
                message.error(data.error.message);
            }
        } catch (error) {
            console.log('Error updating institution:', error.message);
        }
    };

    // [DELETE_INSTITUTIONS_REQUEST_ACTION]
    const deleteInstitution = async (institutionId: string) => {
        try {
            const response = await api.delete(`${localhost}services/app/Institution/Delete?id=${institutionId}`);

            if (response.status === 200) {
                const url = response.config.url;
                const idStartIndex = url.indexOf("id=") + "id=".length;
                const idValue = url.substring(idStartIndex);
                dispatch(deleteInstitutionRequestAction(idValue));
                message.success('Institution deleted successfully.');
            } else {
                message.error('Failed to delete institution!');
            }
        } catch (error) {
            console.log('Error deleting institution:', error.message);
        }
    };

    // [GET_INSTITUTION_REQUEST_ACTION]

    const getInstitution = async (institutionId: string) => {
        try {
            console.log('ID of institution', institutionId);
            const response = await api.get(`${localhost}/services/app/Institution/Get?id=${institutionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                const data = response.data;
                dispatch(getInstitutionRequestAction(data.result));
            } else {
                message.error('Failed to get institution');
            }
        } catch (error) {
            console.log('Error getting institution:', error.message);
        }
    };

    // Creating a provider component
    return (
        <InstitutionStateContext.Provider value={state}>
            <InstitutionActionContext.Provider value={{ createInstitution, deleteInstitution, getInstitution, getInstitutionsTotalCount, listInstitutions, updateInstitution }}>
                {children}
            </InstitutionActionContext.Provider>
        </InstitutionStateContext.Provider>
    );
}

function useInstitutionState() {
    const context = useContext(InstitutionStateContext);
    if (!context) {
        throw new Error("useInstitutionState must be used within an InstitutionProvider");
    }
    return context;
}

function useInstitutionAction() {
    const context = useContext(InstitutionActionContext);
    if (context === undefined) {
        throw new Error("useInstitutionAction must be used within an InstitutionProvider");
    }
    return context;
}

function useInstitution() {
    return {
        ...useInstitutionState(),
        ...useInstitutionAction()
    };
}

export { InstitutionProvider, useInstitution };