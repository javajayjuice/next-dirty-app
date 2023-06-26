import { createContext } from "react";
import { ApplicationInputDto, ApplicationOutputDto } from "../../interfaces";

//dto

//state at first load time
export const INITIAL_STATE: IApplicationStateContext = {};

//specifying the state ===== things expected to receive after the action is executed or API call is executed
export interface IApplicationStateContext {
  readonly applicationCreated?: ApplicationInputDto;
  readonly applicationsList?: Array<ApplicationOutputDto>;
  readonly applicationUpdated?: ApplicationInputDto;
  readonly applicationDeleted?: string;
  readonly applicationSelected?: ApplicationOutputDto;
  readonly applicationsTotalCount?: number;
}

//specifying the action ===== things that I'll be passing through the action aka API
export interface IApplicationActionContext {
  createApplication?: (payload: ApplicationInputDto) => void;
  listApplications?: () => void;
  getApplicationsTotalCount?: () => void;
  updateApplication?: (payload: ApplicationInputDto) => void;
  deleteApplication?: (payload: string) => void;
  getApplication?: (payload: string | string[]) => void;
}

//initializing the state and the action
export const ApplicationStateContext =
  createContext<IApplicationStateContext>(INITIAL_STATE);
export const ApplicationActionContext =
  createContext<IApplicationActionContext>({});
