import { createAction } from 'redux-actions';
import { ICampusStateContext } from './context';
import { CampusActionEnum } from '../../../enums';
import { CampusDto, StringIdDto } from '../../../interfaces';

// Must match the variable in interface state context (campusCreated)
export const createCampusRequestAction = createAction<ICampusStateContext, CampusDto>(CampusActionEnum.createCampusRequest, (campusCreated) => ({ campusCreated }));
export const listCampusesRequestAction = createAction<ICampusStateContext, Array<CampusDto>>(CampusActionEnum.listCampusesRequest, (campusesList) => ({ campusesList }));
export const getCampusesTotalCountRequestAction = createAction<ICampusStateContext, number>(CampusActionEnum.getCampusesTotalCountRequest, (campusesTotalCount) => ({ campusesTotalCount }));
export const updateCampusRequestAction = createAction<ICampusStateContext, CampusDto>(CampusActionEnum.updateCampusRequest, (campusUpdated) => ({ campusUpdated }));
export const deleteCampusRequestAction = createAction<ICampusStateContext, string>(CampusActionEnum.deleteCampusRequest, (campusDeleted) => ({ campusDeleted }));
export const getCampusRequestAction = createAction<ICampusStateContext, CampusDto[]>(CampusActionEnum.getCampusRequest, (campusSelected) => ({ campusSelected }));
export const selectCampusRequestAction = createAction<ICampusStateContext, CampusDto[]>(CampusActionEnum.selectCampusRequest, (campusSelected) => ({ campusSelected }));
