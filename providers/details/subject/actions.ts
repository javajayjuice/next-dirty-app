
import { createAction } from "redux-actions";
import { SubjectActionEnum } from "../../../enums";
import { ISubjectStateContext } from "./context";
import { SubjectDto } from "../../../interfaces";

export const createSubjectRequestAction = createAction<ISubjectStateContext, SubjectDto>(SubjectActionEnum.createSubjectRequest, (subjectCreated) => ({ subjectCreated }));
export const updateSubjectRequestAction = createAction<ISubjectStateContext, SubjectDto>(SubjectActionEnum.updateSubjectRequest, (subjectUpdated) => ({ subjectUpdated }));
export const fetchSubjectRequestAction = createAction<ISubjectStateContext, SubjectDto>(SubjectActionEnum.fetchSubjectRequest, (subjectFetched) => ({ subjectFetched }));
export const listSubjectsRequestAction = createAction<ISubjectStateContext, SubjectDto[]>(SubjectActionEnum.listSubjectsRequest, (subjectsList) => ({ subjectsList }));
export const apsSubjectsRequestAction = createAction<ISubjectStateContext, number>(SubjectActionEnum.apsSubjectsRequest, (subjectsAps) => ({ subjectsAps }));