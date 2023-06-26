import { createContext } from "react";
import { InstitutionDto } from "../../../interfaces";

//state at first load time
export const INITIAL_STATE: IInstitutionStateContext = {};

//specifying the state ===== things expected to receive after the action is executed or API call is executed
export interface IInstitutionStateContext {
readonly institutionCreated?: InstitutionDto;
readonly institutionsList?: Array<InstitutionDto>;
readonly institutionUpdated?: InstitutionDto;
readonly institutionDeleted?: string;
readonly institutionSelected?: InstitutionDto;
readonly institutionsTotalCount?: number;
}

//specifying the action ===== things that I'll be passing through the action aka API
export interface IInstitutionActionContext {
createInstitution?: (payload: InstitutionDto) => void;
listInstitutions?: () => void;
getInstitutionsTotalCount?: () => void;
updateInstitution?: (payload: InstitutionDto) => void;
deleteInstitution?: (payload: string) => void;
getInstitution?: (payload: string) => void;
}

//initializing the state and the action
export const InstitutionStateContext = createContext<IInstitutionStateContext>(INITIAL_STATE);
export const InstitutionActionContext = createContext<IInstitutionActionContext>({});