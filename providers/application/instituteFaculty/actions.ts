import { createAction } from 'redux-actions';
import { InstituteFacultyActionEnum } from '../../../enums';
import { FacultyDto, InstituteFacultyDto } from '../../../interfaces';
import { IInstituteFacultyStateContext } from './context';

// Must match the variable in the interface state context (instituteFacultyCreated)
export const createInstituteFacultyRequestAction = createAction<IInstituteFacultyStateContext, InstituteFacultyDto>(InstituteFacultyActionEnum.createInstituteFacultyRequest, (instituteFacultyCreated) => ({ instituteFacultyCreated }));
export const listInstituteFacultiesRequestAction = createAction<IInstituteFacultyStateContext, Array<InstituteFacultyDto>>(InstituteFacultyActionEnum.listInstituteFacultiesRequest, (instituteFacultiesList) => ({ instituteFacultiesList }));
export const getInstituteFacultiesTotalCountRequestAction = createAction<IInstituteFacultyStateContext, number>(InstituteFacultyActionEnum.getInstituteFacultiesTotalCountRequest, (instituteFacultiesTotalCount) => ({ instituteFacultiesTotalCount }));
export const updateInstituteFacultyRequestAction = createAction<IInstituteFacultyStateContext, InstituteFacultyDto>(InstituteFacultyActionEnum.updateInstituteFacultyRequest, (instituteFacultyUpdated) => ({ instituteFacultyUpdated }));
export const deleteInstituteFacultyRequestAction = createAction<IInstituteFacultyStateContext, string>(InstituteFacultyActionEnum.deleteInstituteFacultyRequest, (instituteFacultyDeleted) => ({ instituteFacultyDeleted }));
export const getInstituteFacultyFromCampusRequestAction = createAction<IInstituteFacultyStateContext, FacultyDto[]>(InstituteFacultyActionEnum.getInstituteFacultyRequest, (instituteFacultyFromCampus) => ({ instituteFacultyFromCampus }));
export const selectInstituteFacultyRequestAction = createAction<IInstituteFacultyStateContext, FacultyDto[]>(InstituteFacultyActionEnum.selectInstituteFacultyRequest, (instituteFacultySelected) => ({ instituteFacultyFromCampus: instituteFacultySelected }));
