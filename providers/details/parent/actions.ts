import { createAction } from "redux-actions";
import { ParentActionEnum } from "../../../enums";
import { ParentInputDto } from "../../../interfaces";
import { IParentStateContext } from "./context";

export const createParentRequestAction = createAction< IParentStateContext, ParentInputDto >(ParentActionEnum.createParentRequest, (parentCreated) => ({ parentCreated }));

export const updateParentRequestAction = createAction<
  IParentStateContext,
  ParentInputDto
>(ParentActionEnum.updateParentRequest, (parentUpdated) => ({ parentUpdated }));
export const fetchParentRequestAction = createAction<
  IParentStateContext,
  ParentInputDto
>(ParentActionEnum.fetchParentRequest, (parentFetched) => ({ parentFetched }));
