import { createContext } from "react";
import { ParentInputDto, StringIdDto } from "../../../interfaces";

export const INITIAL_STATE: IParentStateContext = {};

export interface IParentStateContext{
    readonly parentCreated?: ParentInputDto;
    readonly parentUpdated?: ParentInputDto;
    readonly parentFetched?: ParentInputDto;
}

export interface IParentActionContext{
    createParent?: (payload: ParentInputDto)=>void;
    updateParent?: (payload: ParentInputDto, id : StringIdDto)=>void;
    fetchParent?: (payload: StringIdDto)=>void;
}

export const ParentStateContext = createContext<IParentStateContext>(INITIAL_STATE);
export const ParentActionContext = createContext<IParentActionContext>({});
