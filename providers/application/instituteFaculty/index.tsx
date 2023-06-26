import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { INITIAL_STATE, InstituteFacultyActionContext, InstituteFacultyStateContext } from './context';
import { message } from 'antd';
import { useGet } from 'restful-react';
import { InstituteFacultyDto } from '../../../interfaces';
import api from '../../../pages/api';
import { createInstituteFacultyRequestAction, listInstituteFacultiesRequestAction, getInstituteFacultiesTotalCountRequestAction, updateInstituteFacultyRequestAction, deleteInstituteFacultyRequestAction, getInstituteFacultyFromCampusRequestAction } from './actions';
import { InstituteFacultyReducer } from './reduce';

// Define the provider and the endpoint functionality
const InstituteFacultyProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    // Destructure the useReducer
    const [state, dispatch] = useReducer(InstituteFacultyReducer, INITIAL_STATE)

    const token = 'localStorage.getItem';
    const localhost = "https://localhost:44311/api/";

    // Call the API/backend/endpoints [CREATE_INSTITUTE_FACULTY_REQUEST_ACTION]
    const createInstituteFaculty = async (instituteFaculty: InstituteFacultyDto) => {
        try {
            const response = await api.post('services/app/InstituteFaculty/Create', instituteFaculty);
            if (response.status === 200) {
                const data = response.data;
                dispatch(createInstituteFacultyRequestAction(data.result));
                message.success("Institute Faculty created successfully");
            } else {
                console.log('response::', response);
                message.error(response.data.error.message);
            }
        } catch (error) {
            console.log('catch::', error.message);
        }
    };

    // [FETCH_INSTITUTE_FACULTIES_REQUEST_ACTION]
    const listInstituteFaculties = async () => {
        try {
            const response = await api.get('services/app/InstituteFaculty/GetAll');
            if (response.status === 200) {
                const faculties = response.data;
                console.log('all institute faculties::', faculties.result);
                dispatch(listInstituteFacultiesRequestAction(faculties.result));
            }
        } catch (error) {
            console.log('Error all institute faculties::', error);
        }
    };

    // useEffect(() => {
    // listInstituteFaculties();
    // }, []);

    // [GET_INSTITUTE_FACULTIES_TOTAL_COUNT_REQUEST_ACTION]
    const getInstituteFacultiesTotalCount = async () => {
        try {
            const response = await api.get('services/app/InstituteFaculty/GetTotalCount');
            if (response.status === 200) {
                const totalFaculties = response.data;
                console.log('total institute faculties::', totalFaculties.result);
                dispatch(getInstituteFacultiesTotalCountRequestAction(totalFaculties.result));
            }
        } catch (error) {
            console.log('Error total institute faculties::', error);
        }
    };

    // useEffect(() => {
    // getInstituteFacultiesTotalCount();
    // }, []);

    // [UPDATE_INSTITUTE_FACULTIES_REQUEST_ACTION]
    const updateInstituteFaculty = async (updatedData: InstituteFacultyDto) => {
        try {
            const response = await api.put(`${localhost} / services / app / InstituteFaculty / Update /`, updatedData);


            if (response.status === 200) {
                const data = response.data;
                dispatch(updateInstituteFacultyRequestAction(data.result));
                // dispatch(selectInstituteFacultyRequestAction(data.result));
                message.success("Institute Faculty updated successfully");
            } else {
                const data = response.data;
                message.error(data.error.message);
            }
        } catch (error) {
            console.log('Error updating institute faculty:', error.message);
        }
    };

    // [DELETE_INSTITUTE_FACULTIES_REQUEST_ACTION]
    const deleteInstituteFaculty = async (facultyId: string) => {
        try {
            const response = await api.delete(`${localhost}services / app / InstituteFaculty / Delete ? id = ${facultyId}`);


            if (response.status === 200) {
                const url = response.config.url;
                const idStartIndex = url.indexOf("id=") + "id=".length;
                const idValue = url.substring(idStartIndex);
                dispatch(deleteInstituteFacultyRequestAction(idValue));
                message.success('Institute Faculty deleted successfully.');
            } else {
                message.error('Failed to delete institute faculty!');
            }
        } catch (error) {
            console.log('Error deleting institute faculty:', error.message);
        }
    };

    // [GET_INSTITUTE_FACULTY_REQUEST_ACTION]

    const getInstituteFaculty = async (campusId: string) => {
        try {
            console.log('ID of campus to get faculties', campusId);
            const response = await api.get(`services/app/InstituteFaculty/GetFacultiesByCampusId?campusId= ${campusId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });


            if (response.status === 200) {
                const data = response.data;
                dispatch(getInstituteFacultyFromCampusRequestAction(data.result));
                console.log('faculties::', data.result)
            } else {
                message.error('Failed to get institute faculty');
            }
        } catch (error) {
            console.log('Error getting institute faculty:', error.message);
        }
    };

    // Creating a provider component
    return (
        <InstituteFacultyStateContext.Provider value={state}>
            <InstituteFacultyActionContext.Provider value={{ createInstituteFaculty, deleteInstituteFaculty, getInstituteFaculty, getInstituteFacultiesTotalCount, listInstituteFaculties, updateInstituteFaculty }}>
                {children}
            </InstituteFacultyActionContext.Provider>
        </InstituteFacultyStateContext.Provider>
    );
}

function useInstituteFacultyState() {
    const context = useContext(InstituteFacultyStateContext);
    if (!context) {
        throw new Error("useInstituteFacultyState must be used within an InstituteFacultyProvider");
    }
    return context;
}

function useInstituteFacultyAction() {
    const context = useContext(InstituteFacultyActionContext);
    if (context === undefined) {
        throw new Error("useInstituteFacultyAction must be used within an InstituteFacultyProvider");
    }
    return context;
}

function useInstituteFaculty() {
    return {
        ...useInstituteFacultyState(),
        ...useInstituteFacultyAction()
    };
}

export { InstituteFacultyProvider, useInstituteFaculty };
