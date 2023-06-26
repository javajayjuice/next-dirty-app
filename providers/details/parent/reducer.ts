import { ParentActionEnum } from "../../../enums";
import { IParentStateContext } from "./context";

export function ParentReducer(
  state: IParentStateContext,
  action: ReduxActions.Action<IParentStateContext>
): IParentStateContext {
  const { type, payload } = action;

  switch (type) {
    case ParentActionEnum.createParentRequest:
      return {
        ...state,
        ...payload,
      };
    case ParentActionEnum.updateParentRequest:
      return {
        ...state,
        ...payload,
      };
    case ParentActionEnum.fetchParentRequest:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
