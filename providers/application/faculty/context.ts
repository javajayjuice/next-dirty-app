import { createContext } from "react";
import { FacultyDto } from "../../../interfaces";

// state at first load time
export const INITIAL_STATE: IFacultyStateContext = {};

// specifying the state - things expected to receive after the action is executed or API call is executed
export interface IFacultyStateContext {
readonly facultyCreated?: FacultyDto;
readonly facultiesList?: Array<FacultyDto>;
readonly facultyUpdated?: FacultyDto;
readonly facultyDeleted?: string;
readonly facultySelected?: FacultyDto;
readonly facultiesTotalCount?: number;
}

// specifying the action - things that I'll be passing through the action aka API
export interface IFacultyActionContext {
createFaculty?: (payload: FacultyDto) => void;
listFaculties?: () => void;
getFacultiesTotalCount?: () => void;
updateFaculty?: (payload: FacultyDto) => void;
deleteFaculty?: (payload: string) => void;
getFaculty?: (payload: string) => void;
}

// initializing the state and the action
export const FacultyStateContext = createContext<IFacultyStateContext>(INITIAL_STATE);
export const FacultyActionContext = createContext<IFacultyActionContext>({});