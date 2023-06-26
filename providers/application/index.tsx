import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { ApplicationReducer } from './reducer';
import { INITIAL_STATE, ApplicationActionContext, ApplicationStateContext } from './context';
import { message } from 'antd';
import { createApplicationRequestAction, deleteApplicationRequestAction, listApplicationsRequestAction, getApplicationRequestAction, getApplicationsTotalCountRequestAction,  selectApplicationRequestAction, updateApplicationRequestAction } from './actions';
import { useGet } from 'restful-react';
import api from '../../pages/api';
import { ApplicationInputDto, ApplicationStatusDto } from '../../interfaces';

// Define the provider and the endpoint functionality
const ApplicationProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    // Destructure the useReducer
    const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE)

    const token = 'localStorage.getItem';
    const localhost = "https://localhost:44311/api/";

    // Call the API/backend/endpoints [CREATE_APPLICATION_REQUEST_ACTION]
    const createApplication = async (application: ApplicationInputDto) => {
        try {
            const response = await api.post(`services/app/Application/Create`, application);
            if (response.status === 200) {
                const data = response.data;
                dispatch(createApplicationRequestAction(data.result));
                message.success("Application created successfully");
            } else {
                console.log('response::', response);
                message.error(response.data.error.message);
            }
        } catch (error) {
            console.log('catch::', error.message);
        }
    };
    const createStatus = async (application: ApplicationStatusDto) => {
        try {
            const response = await api.post(`services/app/ApplicationStatus/Create`, application);
            if (response.status === 200) {
                const data = response.data;
                dispatch(createApplicationRequestAction(data.result));
                message.success("Application created successfully");
            } else {
                console.log('response::', response);
                message.error(response.data.error.message);
            }
        } catch (error) {
            console.log('catch::', error.message);
        }
    };

    // [FETCH_APPLICATIONS_REQUEST_ACTION]
    const listApplications = async () => {
        try {
            const response = await api.get('services/app/Application/GetAllApplicationsForCurrentUser');
            if (response.status === 200) {
                const applications = response.data;
                console.log('all applications::', applications.result);
                dispatch(listApplicationsRequestAction(applications.result));
            }
        } catch (error) {
            console.log('Error all applications::', error);
        }
    };

    // useEffect(() => {
    //     fetchApplications();
    // }, []);


    // [GET_APPLICATIONS_TOTAL_COUNT_REQUEST_ACTION]
    const getApplicationsTotalCount = async () => {
        try {
          const response = await api.get('services/app/Application/GetAllApplicationsForCurrentUser');
          if (response.status === 200) {
            const totalApplications = response.data.result;
            console.log('total applications::', totalApplications);
            dispatch(getApplicationsTotalCountRequestAction(totalApplications.length));
          }
        } catch (error) {
          console.log('Error total applications::', error);
        }
      };
      
      useEffect(() => {
        getApplicationsTotalCount();
      }, []);


    // [UPDATE_APPLICATIONS_REQUEST_ACTION]
    const updateApplication = async (updatedData: ApplicationInputDto) => {
        try {
          const response = await api.put(`${localhost}/services/app/Application/Update/`, updatedData);
      
          if (response.status === 200) {
            const data = response.data;
            dispatch(updateApplicationRequestAction(data.result));
            // dispatch(selectApplicationRequestAction(data.result));
            message.success("Application updated successfully");
          } else {
            const data = response.data;
            message.error(data.error.message);
          }
        } catch (error) {
          console.log('Error updating application:', error.message);
        }
      };

    // [DELETE_APPLICATIONS_REQUEST_ACTION]
    const deleteApplication = async (applicationId: string) => {
        try {
          const response = await api.delete(`${localhost}services/app/Application/Delete?id=${applicationId}`);
      
          if (response.status === 200) {
            const url = response.config.url;
            const idStartIndex = url.indexOf("id=") + "id=".length;
            const idValue = url.substring(idStartIndex);
            dispatch(deleteApplicationRequestAction(idValue));
            message.success('Application deleted successfully.');
          } else {
            message.error('Failed to delete application!');
          }
        } catch (error) {
          console.log('Error deleting application:', error.message);
        }
      };

    // [GET_APPLICATION_REQUEST_ACTION]

    const getApplication = async (applicationId: string) => {
        try {
          console.log('ID of application', applicationId);
          const response = await api.get(`${localhost}services/app/Application/GetById?id=${applicationId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
      
          if (response.status === 200) {
            const data = response.data;
            dispatch(getApplicationRequestAction(data.result));
          } else {
            message.error('Failed to get application');
          }
        } catch (error) {
          console.log('Error getting application:', error.message);
        }
      };
   

    // Creating a provider component
    return (
        <ApplicationStateContext.Provider value={state}>
            <ApplicationActionContext.Provider value={{ createApplication, deleteApplication, getApplication, getApplicationsTotalCount, listApplications, updateApplication, createStatus }}>
                {children}
            </ApplicationActionContext.Provider>
        </ApplicationStateContext.Provider>
    );
}

function useApplicationState() {
    const context = useContext(ApplicationStateContext);
    if (!context) {
        throw new Error("useApplicationState must be used within an ApplicationProvider");
    }
    return context;
}

function useApplicationAction() {
    const context = useContext(ApplicationActionContext);
    if (context === undefined) {
        throw new Error("useApplicationAction must be used within an ApplicationProvider");
    }
    return context;
}

function useApplication() {
    return {
        ...useApplicationState(),
        ...useApplicationAction()
    };
}

export { ApplicationProvider, useApplication };
