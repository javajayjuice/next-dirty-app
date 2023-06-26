
import { createAction } from "redux-actions";
import { QualificationActionEnum } from "../../../enums";
import { IQualificationStateContext } from "./context";
import { QualificationDto } from "../../../interfaces";

export const createQualificationRequestAction = createAction<IQualificationStateContext, QualificationDto>(QualificationActionEnum.createQualificationRequest, (qualificationCreated) => ({ qualificationCreated }));
export const updateQualificationRequestAction = createAction< IQualificationStateContext, QualificationDto >(QualificationActionEnum.updateQualificationRequest, (qualificationUpdated) => ({ qualificationUpdated }));
export const fetchQualificationRequestAction = createAction< IQualificationStateContext, QualificationDto[]>(QualificationActionEnum.fetchQualificationRequest, (qualificationFetched) => ({ qualificationFetched }));
export const listQualificationsRequestAction = createAction< IQualificationStateContext, QualificationDto[]>(QualificationActionEnum.listQualificationsRequest, (qualificationsList) => ({ qualificationsList }));
export const deleteQualificationsRequestAction = createAction< IQualificationStateContext, string>(QualificationActionEnum.deleteQualificationRequest, (qualificationDeleted) => ({ qualificationDeleted }));

