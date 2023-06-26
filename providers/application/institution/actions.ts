import { createAction } from 'redux-actions';
import { IInstitutionStateContext } from './context';
import { InstitutionActionEnum } from '../../../enums';
import { InstitutionDto } from '../../../interfaces';

//must match the variable in interface state context (institutionCreated)
export const createInstitutionRequestAction = createAction<IInstitutionStateContext, InstitutionDto>(InstitutionActionEnum.createInstitutionRequest, (institutionCreated) => ({ institutionCreated }));
export const listInstitutionsRequestAction = createAction<IInstitutionStateContext, Array<InstitutionDto>>(InstitutionActionEnum.listInstitutionsRequest, (institutionsList) => ({ institutionsList }));
export const getInstitutionsTotalCountRequestAction = createAction<IInstitutionStateContext, number>(InstitutionActionEnum.getInstitutionsTotalCountRequest, (institutionsTotalCount) => ({ institutionsTotalCount }));
export const updateInstitutionRequestAction = createAction<IInstitutionStateContext, InstitutionDto>(InstitutionActionEnum.updateInstitutionRequest, (institutionUpdated) => ({ institutionUpdated }));
export const deleteInstitutionRequestAction = createAction<IInstitutionStateContext, string>(InstitutionActionEnum.deleteInstitutionRequest, (institutionDeleted) => ({ institutionDeleted }));
export const getInstitutionRequestAction = createAction<IInstitutionStateContext, InstitutionDto>(InstitutionActionEnum.getInstitutionRequest, (institutionSelected) => ({ institutionSelected }));
export const selectInstitutionRequestAction = createAction<IInstitutionStateContext, InstitutionDto>(InstitutionActionEnum.selectInstitutionRequest, (institutionSelected) => ({ institutionSelected }));
