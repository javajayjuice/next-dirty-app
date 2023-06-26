import { createContext } from "react";
import { FacultyDto, InstituteFacultyDto } from "../../../interfaces";

// State at first load time
export const INITIAL_STATE: IInstituteFacultyStateContext = {};

// Specifying the state - things expected to receive after the action is executed or API call is executed
export interface IInstituteFacultyStateContext {
  readonly instituteFacultyCreated?: InstituteFacultyDto;
  readonly instituteFacultiesList?: Array<InstituteFacultyDto>;
  readonly instituteFacultyUpdated?: InstituteFacultyDto;
  readonly instituteFacultyDeleted?: string;
  readonly instituteFacultyFromCampus?: FacultyDto[];
  readonly instituteFacultiesTotalCount?: number;
}

// Specifying the action - things that will be passed through the action aka API
export interface IInstituteFacultyActionContext {
  createInstituteFaculty?: (payload: InstituteFacultyDto) => void;
  listInstituteFaculties?: () => void;
  getInstituteFacultiesTotalCount?: () => void;
  updateInstituteFaculty?: (payload: InstituteFacultyDto) => void;
  deleteInstituteFaculty?: (payload: string) => void;
  getInstituteFaculty?: (payload: string) => void;
}

// Initializing the state and the action
export const InstituteFacultyStateContext = createContext<IInstituteFacultyStateContext>(INITIAL_STATE);
export const InstituteFacultyActionContext = createContext<IInstituteFacultyActionContext>({});
