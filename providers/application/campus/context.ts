import { createContext } from "react";
import { CampusDto, StringIdDto } from "../../../interfaces";

// State at first load time
export const INITIAL_STATE: ICampusStateContext = {};

// Specifying the state - things expected to receive after the action is executed or API call is executed
export interface ICampusStateContext {
  readonly campusCreated?: CampusDto;
  readonly campusesList?: Array<CampusDto>;
  readonly campusUpdated?: CampusDto;
  readonly campusDeleted?: string;
  readonly campusSelected?: CampusDto[];
  readonly campusesTotalCount?: number;
}

// Specifying the action - things that I'll be passing through the action aka API
export interface ICampusActionContext {
  createCampus?: (payload: CampusDto) => void;
  listCampuses?: () => void;
  getCampusesTotalCount?: () => void;
  updateCampus?: (payload: CampusDto) => void;
  deleteCampus?: (payload: string) => void;
  getCampus?: (payload: StringIdDto) => void;
}

// Initializing the state and the action
export const CampusStateContext = createContext<ICampusStateContext>(INITIAL_STATE);
export const CampusActionContext = createContext<ICampusActionContext>({});
