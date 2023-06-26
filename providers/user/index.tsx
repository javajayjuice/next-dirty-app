import React, { useReducer, useContext, useEffect, useState } from 'react';
import { UserReducer } from './reducer';
import { INITIAL_STATE, UserActionContext, UserContext } from './context';
import { loginUserRequestAction, createUserRequestAction, logOutUserRequestAction, isUserLoggedInRequestAction, getCurrentInformationRequestAction, setCurrentUserRequestAction, loginAdminRequestAction } from './actions';
import { message } from 'antd';
import api from '../../pages/api';
import route, { useRouter } from 'next/router';
import { loginStatus } from '../../constants';


const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const router = useRouter()
  const [info, setInfo] = useState<any>({})
  //[LOGIN]
  const loginUser = (userLoginInfo) => {
    api.post('TokenAuth/Authenticate', userLoginInfo)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          dispatch(loginUserRequestAction(res.result));
          dispatch(isUserLoggedInRequestAction(res.success));
          localStorage.setItem('token', res.result['accessToken']);
          setCurrentUser();

          localStorage.setItem('loginStatus', res.success);
          message.success('Successfully logged in...');
        }
      })
      .catch((error) => {
        message.warning(error.response.data.error.details);
      }).finally(() => {
        if (loginStatus()) {
          if (info.address == null) {
            router.push('/details/address')
          }  else {
            router.push('/details/address')
          }
        }
      });
  };
  const loginAdmin = (userLoginInfo) => {
    api.post('TokenAuth/Authenticate', userLoginInfo)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          dispatch(loginAdminRequestAction(res.result));
          dispatch(isUserLoggedInRequestAction(res.success));
          localStorage.setItem('token', res.result['accessToken']);
          message.success('Successfully logged in as Admin');
        }
      })
      .catch((error) => {
        message.warning(error.response.data.error.details);
      }).finally(() => {
        router.push('/admin/office')
      });
  };

  //[CREATE_USER]
  const createUser = (userRegInfo) => {
    api.post('services/app/Applicant/Create', userRegInfo)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          dispatch(createUserRequestAction(userRegInfo));
          message.success('User registration successful, you may login.');
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };
  //[UPDATE_USER]
  const updateUser = (userRegInfo) => {
    api.put('services/app/Applicant/Update', userRegInfo)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          dispatch(createUserRequestAction(userRegInfo));
          message.success('User updated successful.');
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const logOutUser = () => {
    dispatch(logOutUserRequestAction());
    localStorage.removeItem('token');
    localStorage.clear()
    dispatch(isUserLoggedInRequestAction(false))
    router.push('/')
  }

  //[GET_CURRENT_INFORMATION]
  const getCurrentInformation = () => {
    api.get('services/app/Session/GetCurrentLoginInformations')
      .then((response) => {
        const currentInformationData = response.data;
        if (currentInformationData) {
          dispatch(getCurrentInformationRequestAction(currentInformationData.result.user));
        }
      })
      .catch((error) => {
        console.log('Error current information::', error);
      });
  };
  //[GET_CURRENT_USER_INFORMATION]
  const setCurrentUser = async () => {
    try {
      const response = await api.get('services/app/Applicant/Get')
      const applicantInformationData = response.data.result;

      if (applicantInformationData) {
      dispatch(setCurrentUserRequestAction(applicantInformationData))
        setInfo(applicantInformationData)
        console.log('setInfo::::', applicantInformationData)
      }
    } catch (error) {
      message.error('An error occurred while fetching user.')
    }

  };



  // useEffect(() => {
  //   getCurrentInformation();
  // }, []);

  return (
    <UserContext.Provider value={state} >
      <UserActionContext.Provider value={{
        loginUser,
        createUser,
        logOutUser,
        getCurrentInformation,
        setCurrentUser,
        updateUser,
        loginAdmin
      }}>
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
}

function useLoginState() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useLoginActions() {
  const context = useContext(UserActionContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useUser() {
  return {
    ...useLoginActions(),
    ...useLoginState()
  }
}
export { UserProvider, useUser };