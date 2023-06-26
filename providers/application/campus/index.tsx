import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { CampusReducer } from './reducer';
import { INITIAL_STATE, CampusActionContext, CampusStateContext } from './context';
import { message } from 'antd';
import { createCampusRequestAction, deleteCampusRequestAction, listCampusesRequestAction, getCampusRequestAction, getCampusesTotalCountRequestAction, selectCampusRequestAction, updateCampusRequestAction } from './actions';
import { useGet } from 'restful-react';
import { CampusDto, StringIdDto } from '../../../interfaces';
import api from '../../../pages/api';

// Define the provider and the endpoint functionality
const CampusProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // Destructure the useReducer
  const [state, dispatch] = useReducer(CampusReducer, INITIAL_STATE)

  const token = 'localStorage.getItem';
  const localhost = "https://localhost:44311/api/";

  // Call the API/backend/endpoints [CREATE_CAMPUS_REQUEST_ACTION]
  const createCampus = async (campus: CampusDto) => {
    try {
      const response = await api.post(`services/app/Campus/Create`, campus);
      if (response.status === 200) {
        const data = response.data;
        dispatch(createCampusRequestAction(data.result));
        message.success("Campus created successfully");
      } else {
        console.log('response::', response);
        message.error(response.data.error.message);
      }
    } catch (error) {
      console.log('catch::', error.message);
    }
  };

  // [FETCH_CAMPUSES_REQUEST_ACTION]
  const listCampuses = async () => {
    try {
      const response = await api.get('services/app/Campus/GetAll');
      if (response.status === 200) {
        const campuses = response.data;
        console.log('all campuses::', campuses.result);
        dispatch(listCampusesRequestAction(campuses.result));
      }
    } catch (error) {
      console.log('Error all campuses::', error);
    }
  };

  // useEffect(() => {
  //     fetchCampuses();
  // }, []);

  // [GET_CAMPUSES_TOTAL_COUNT_REQUEST_ACTION]
  const getCampusesTotalCount = async () => {
    try {
      const response = await api.get('services/app/Campus/GetTotalCount');
      if (response.status === 200) {
        const totalCampuses = response.data;
        console.log('total campuses::', totalCampuses.result);
        dispatch(getCampusesTotalCountRequestAction(totalCampuses.result));
      }
    } catch (error) {
      console.log('Error total campuses::', error);
    }
  };

  //   useEffect(() => {
  //     getCampusesTotalCount();
  //   }, []);

  // [UPDATE_CAMPUSES_REQUEST_ACTION]
  const updateCampus = async (updatedData: CampusDto) => {
    try {
      const response = await api.put(`${localhost}/services/app/Campus/Update/`, updatedData);

      if (response.status === 200) {
        const data = response.data;
        dispatch(updateCampusRequestAction(data.result));
        // dispatch(selectCampusRequestAction(data.result));
        message.success("Campus updated successfully");
      } else {
        const data = response.data;
        message.error(data.error.message);
      }
    } catch (error) {
      console.log('Error updating campus:', error.message);
    }
  };

  // [DELETE_CAMPUSES_REQUEST_ACTION]
  const deleteCampus = async (campusId: string) => {
    try {
      const response = await api.delete(`${localhost}services/app/Campus/Delete?id=${campusId}`);

      if (response.status === 200) {
        const url = response.config.url;
        const idStartIndex = url.indexOf("id=") + "id=".length;
        const idValue = url.substring(idStartIndex);
        dispatch(deleteCampusRequestAction(idValue));
        message.success('Campus deleted successfully.');
      } else {
        message.error('Failed to delete campus!');
      }
    } catch (error) {
      console.log('Error deleting campus:', error.message);
    }
  };

  // [GET_CAMPUS_REQUEST_ACTION]
  const getCampus = async (campusId: StringIdDto) => {
    console.log('campus id::', campusId)
    try {
      console.log('ID of campus', campusId);
      const response = await api.get(`${localhost}services/app/Campus/GetAllByInstitute?institutesId=${campusId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        const data = response.data;
        dispatch(getCampusRequestAction(data.result));
        console.log(data.result)
      } else {
        message.error('Failed to get campus');
      }
    } catch (error) {
      console.log('Error getting campus:', error.message);
    }
  };

  // Creating a provider component
  return (
    <CampusStateContext.Provider value={state}>
      <CampusActionContext.Provider value={{ createCampus, deleteCampus, getCampus, getCampusesTotalCount, listCampuses, updateCampus }}>
        {children}
      </CampusActionContext.Provider>
    </CampusStateContext.Provider>
  );
}

function useCampusState() {
  const context = useContext(CampusStateContext);
  if (!context) {
    throw new Error("useCampusState must be used within a CampusProvider");
  }
  return context;
}

function useCampusAction() {
  const context = useContext(CampusActionContext);
  if (context === undefined) {
    throw new Error("useCampusAction must be used within a CampusProvider");
  }
  return context;
}

function useCampus() {
  return {
    ...useCampusState(),
    ...useCampusAction()
  };
}

export { CampusProvider, useCampus };
