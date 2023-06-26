
import { createAction } from 'redux-actions';
import {  IApplicationStateContext } from './context';
import { ApplicationActionEnum } from '../../enums';
import { ApplicationInputDto, ApplicationOutputDto, ApplicationStatusDto } from '../../interfaces';

//must match the variable in interface state context (applicationCreated)
export const createApplicationRequestAction = createAction<IApplicationStateContext, ApplicationInputDto>(ApplicationActionEnum.createApplicationRequest, (applicationCreated) => ({ applicationCreated }));
export const createStatusRequestAction = createAction<IApplicationStateContext, ApplicationStatusDto>(ApplicationActionEnum.createStatusRequest, (applicationStatus) => ({ applicationStatus }));
export const listApplicationsRequestAction = createAction<IApplicationStateContext, Array<ApplicationOutputDto>>(ApplicationActionEnum.listApplicationsRequest, (applicationsList) => ({applicationsList}));
export const getApplicationsTotalCountRequestAction = createAction<IApplicationStateContext, number>(ApplicationActionEnum.getApplicationsTotalCountRequest, (applicationsTotalCount) => ({applicationsTotalCount}));
export const updateApplicationRequestAction = createAction<IApplicationStateContext, ApplicationInputDto>(ApplicationActionEnum.updateApplicationRequest, (applicationUpdated) => ({applicationUpdated}));
export const deleteApplicationRequestAction = createAction<IApplicationStateContext, string>(ApplicationActionEnum.deleteApplicationRequest, (applicationDeleted) =>({applicationDeleted}));
export const getApplicationRequestAction = createAction<IApplicationStateContext, ApplicationOutputDto>(ApplicationActionEnum.getApplicationRequest, (applicationSelected) =>({applicationSelected}));
export const selectApplicationRequestAction = createAction<IApplicationStateContext, ApplicationOutputDto>(ApplicationActionEnum.selectApplicationRequest, (applicationSelected) => ({applicationSelected}));