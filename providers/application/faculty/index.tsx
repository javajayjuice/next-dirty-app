import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { FacultyReducer } from './reducer';
import { INITIAL_STATE, FacultyActionContext, FacultyStateContext } from './context';
import { message } from 'antd';
import { createFacultyRequestAction, deleteFacultyRequestAction, listFacultiesRequestAction, getFacultyRequestAction, getFacultiesTotalCountRequestAction, selectFacultyRequestAction, updateFacultyRequestAction } from './actions';
import { useGet } from 'restful-react';
import { FacultyDto } from '../../../interfaces';
import api from '../../../pages/api';

// Define the provider and the endpoint functionality
const FacultyProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    // Destructure the useReducer
    const [state, dispatch] = useReducer(FacultyReducer, INITIAL_STATE)

    const token = 'localStorage.getItem';
    const localhost = "https://localhost:44311/api/";

    // Call the API/backend/endpoints [CREATE_FACULTY_REQUEST_ACTION]
    const createFaculty = async (faculty: FacultyDto) => {
        try {
            const response = await api.post('services/app/Faculty/Create', faculty);
            if (response.status === 200) {
                const data = response.data;
                dispatch(createFacultyRequestAction(data.result));
                message.success("Faculty created successfully");
            } else {
                console.log('response::', response);
                message.error(response.data.error.message);
            }
        } catch (error) {
            console.log('catch::', error.message);
        }
    };

    // [FETCH_FACULTIES_REQUEST_ACTION]
    const listFaculties = async () => {
        try {
            const response = await api.get('services/app/Faculty/GetAll');
            if (response.status === 200) {
                const faculties = response.data;
                console.log('all faculties::', faculties.result);
                dispatch(listFacultiesRequestAction(faculties.result));
            }
        } catch (error) {
            console.log('Error all faculties::', error);
        }
    };

    // useEffect(() => {
    // fetchFaculties();
    // }, []);

    // [GET_FACULTIES_TOTAL_COUNT_REQUEST_ACTION]
    const getFacultiesTotalCount = async () => {
        try {
            const response = await api.get('services/app/Faculty/GetTotalCount');
            if (response.status === 200) {
                const totalFaculties = response.data;
                console.log('total faculties::', totalFaculties.result);
                dispatch(getFacultiesTotalCountRequestAction(totalFaculties.result));
            }
        } catch (error) {
            console.log('Error total faculties::', error);
        }
    };

    // useEffect(() => {
    // getFacultiesTotalCount();
    // }, []);

    // [UPDATE_FACULTIES_REQUEST_ACTION]
    const updateFaculty = async (updatedData: FacultyDto) => {
        try {
            const response = await api.put(`${localhost} / services / app / Faculty / Update /`, updatedData);


            if (response.status === 200) {
                const data = response.data;
                dispatch(updateFacultyRequestAction(data.result));
                // dispatch(selectFacultyRequestAction(data.result));
                message.success("Faculty updated successfully");
            } else {
                const data = response.data;
                message.error(data.error.message);
            }
        } catch (error) {
            console.log('Error updating faculty:', error.message);
        }
    };

    // [DELETE_FACULTIES_REQUEST_ACTION]
    const deleteFaculty = async (facultyId: string) => {
        try {
            const response = await api.delete(`${localhost}services / app / Faculty / Delete ? id = ${facultyId}`);


            if (response.status === 200) {
                const url = response.config.url;
                const idStartIndex = url.indexOf("id=") + "id=".length;
                const idValue = url.substring(idStartIndex);
                dispatch(deleteFacultyRequestAction(idValue));
                message.success('Faculty deleted successfully.');
            } else {
                message.error('Failed to delete faculty!');
            }
        } catch (error) {
            console.log('Error deleting faculty:', error.message);
        }
    };

    // [GET_FACULTY_REQUEST_ACTION]

    const getFaculty = async (facultyId: string) => {
        try {
            console.log('ID of faculty', facultyId);
            const response = await api.get(`${localhost} / services / app / Faculty / Get ? id = ${facultyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });


            if (response.status === 200) {
                const data = response.data;
                dispatch(getFacultyRequestAction(data.result));
            } else {
                message.error('Failed to get faculty');
            }
        } catch (error) {
            console.log('Error getting faculty:', error.message);
        }
    };

    // Creating a provider component
    return (
        <FacultyStateContext.Provider value={state}>
            <FacultyActionContext.Provider value={{ createFaculty, deleteFaculty, getFaculty, getFacultiesTotalCount, listFaculties, updateFaculty }}>
                {children}
            </FacultyActionContext.Provider>
        </FacultyStateContext.Provider>
    );
}

function useFacultyState() {
    const context = useContext(FacultyStateContext);
    if (!context) {
        throw new Error("useFacultyState must be used within a FacultyProvider");
    }
    return context;
}

function useFacultyAction() {
    const context = useContext(FacultyActionContext);
    if (context === undefined) {
        throw new Error("useFacultyAction must be used within a FacultyProvider");
    }
    return context;
}

function useFaculty() {
    return {
        ...useFacultyState(),
        ...useFacultyAction()
    };
}

export { FacultyProvider, useFaculty };