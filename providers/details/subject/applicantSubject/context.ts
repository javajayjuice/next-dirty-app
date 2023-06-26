import { createContext } from "react";
import { ApplicantSubjectDto } from "../../../../interfaces";

export const INITIAL_STATE: IApplicantSubjectStateContext = {};

export interface IApplicantSubjectStateContext {
  readonly applicantSubjectCreated?: ApplicantSubjectDto;
  readonly applicantSubjectUpdated?: ApplicantSubjectDto;
  readonly applicantSubjectFetched?: ApplicantSubjectDto[];
  readonly applicantSubjectDeleted?: string;
}

export interface IApplicantSubjectActionContext {
  createApplicantSubject?: (payload: ApplicantSubjectDto) => void;
  updateApplicantSubject?: (payload: ApplicantSubjectDto) => void;
  fetchApplicantSubject?: () => void;
  deleteApplicantSubject?: (payload:string) => void;
}

export const ApplicantSubjectStateContext =
  createContext<IApplicantSubjectStateContext>(INITIAL_STATE);
export const ApplicantSubjectActionContext =
  createContext<IApplicantSubjectActionContext>({});
