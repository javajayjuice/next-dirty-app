
import { createAction } from 'redux-actions';
import { IFacultyStateContext } from './context';
import { FacultyActionEnum } from '../../../enums';
import { FacultyDto } from '../../../interfaces';

// must match the variable in the interface state context (facultyCreated)
export const createFacultyRequestAction = createAction<IFacultyStateContext, FacultyDto>(FacultyActionEnum.createFacultyRequest, (facultyCreated) => ({ facultyCreated }));
export const listFacultiesRequestAction = createAction<IFacultyStateContext, Array<FacultyDto>>(FacultyActionEnum.listFacultiesRequest, (facultiesList) => ({ facultiesList }));
export const getFacultiesTotalCountRequestAction = createAction<IFacultyStateContext, number>(FacultyActionEnum.getFacultiesTotalCountRequest, (facultiesTotalCount) => ({ facultiesTotalCount }));
export const updateFacultyRequestAction = createAction<IFacultyStateContext, FacultyDto>(FacultyActionEnum.updateFacultyRequest, (facultyUpdated) => ({ facultyUpdated }));
export const deleteFacultyRequestAction = createAction<IFacultyStateContext, string>(FacultyActionEnum.deleteFacultyRequest, (facultyDeleted) => ({ facultyDeleted }));
export const getFacultyRequestAction = createAction<IFacultyStateContext, FacultyDto>(FacultyActionEnum.getFacultyRequest, (facultySelected) => ({ facultySelected }));
export const selectFacultyRequestAction = createAction<IFacultyStateContext, FacultyDto>(FacultyActionEnum.selectFacultyRequest, (facultySelected) => ({ facultySelected }));
