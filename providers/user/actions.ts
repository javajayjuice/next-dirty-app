
import { createAction } from 'redux-actions';
import { UserActionEnum } from '../../enums';
import { IUserStateContext } from './context';
import { Login, ApplicantInputDto } from '../../interfaces';

export const loginUserRequestAction = createAction<IUserStateContext, Login>(UserActionEnum.loginUserRequest,(UserLogin)=>({UserLogin}))
export const loginAdminRequestAction = createAction<IUserStateContext, Login>(UserActionEnum.loginUserRequest,(UserLogin)=>({UserLogin}))
export const createUserRequestAction = createAction<IUserStateContext, ApplicantInputDto>(UserActionEnum.createUserRequest,(CreateUser)=>({CreateUser}))
export const updateUserRequestAction = createAction<IUserStateContext, ApplicantInputDto>(UserActionEnum.updateUserRequest,(userUpdated)=>({userUpdated}))
export const logOutUserRequestAction = createAction<IUserStateContext>(UserActionEnum.logOutUserRequest,()=>({}))
export const setCurrentUserRequestAction = createAction<IUserStateContext, ApplicantInputDto>(UserActionEnum.setCurrentUserRequest,(currentUser)=>({currentUser}))
export const getUserDetailsRequestAction = createAction<IUserStateContext, number>(UserActionEnum.getUserDetailsRequest,(id)=>({}))
export const isUserLoggedInRequestAction = createAction<IUserStateContext, boolean>(UserActionEnum.isUserLoggedInRequest, (userLoggedIn)=> ({userLoggedIn}))

export const getCurrentInformationRequestAction = createAction<IUserStateContext, ApplicantInputDto>(UserActionEnum.getCurrentInformationRequest,(currentInformation)=>({currentInformation}))
