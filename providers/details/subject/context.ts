import { createContext } from "react";
import { SubjectDto, StringIdDto } from "../../../interfaces";

export const INITIAL_STATE: ISubjectStateContext = {};

export interface ISubjectStateContext {
  readonly subjectCreated?: SubjectDto;
  readonly subjectUpdated?: SubjectDto;
  readonly subjectFetched?: SubjectDto;
  readonly subjectsList?: SubjectDto[];
  readonly subjectsAps?: number;
}

export interface ISubjectActionContext {
  createSubject?: (payload: SubjectDto) => void;
  updateSubject?: (payload: SubjectDto, id: StringIdDto) => void;
  fetchSubject?: (payload: StringIdDto) => void;
  listSubjects?: () => void;
  apsSubjects?: () => void;
}

export const SubjectStateContext = createContext<ISubjectStateContext>(INITIAL_STATE);
export const SubjectActionContext = createContext<ISubjectActionContext>({});
