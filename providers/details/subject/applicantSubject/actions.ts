import { createAction } from 'redux-actions';
import { IApplicantSubjectStateContext } from './context';
import { ApplicantSubjectActionEnum } from '../../../../enums';
import { ApplicantSubjectDto } from '../../../../interfaces';

export const createApplicantSubjectRequestAction = createAction<IApplicantSubjectStateContext, ApplicantSubjectDto>(ApplicantSubjectActionEnum.createApplicantSubjectRequest, (applicantSubjectCreated) => ({ applicantSubjectCreated }));
export const updateApplicantSubjectRequestAction = createAction<IApplicantSubjectStateContext, ApplicantSubjectDto>(ApplicantSubjectActionEnum.updateApplicantSubjectRequest, (applicantSubjectUpdated) => ({ applicantSubjectUpdated }));
export const fetchApplicantSubjectRequestAction = createAction<IApplicantSubjectStateContext, ApplicantSubjectDto[]>(ApplicantSubjectActionEnum.fetchApplicantSubjectRequest, (applicantSubjectFetched) => ({ applicantSubjectFetched }));
export const deleteApplicantSubjectRequestAction = createAction<IApplicantSubjectStateContext, string>(ApplicantSubjectActionEnum.deleteApplicantSubjectRequest, (applicantSubjectDeleted) => ({ applicantSubjectDeleted }));
