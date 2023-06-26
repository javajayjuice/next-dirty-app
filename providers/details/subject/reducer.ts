import { SubjectActionEnum } from "../../../enums";
import { ISubjectStateContext } from "./context";

export function SubjectReducer(
  state: ISubjectStateContext,
  action: ReduxActions.Action<ISubjectStateContext>
): ISubjectStateContext {
  const { type, payload } = action;

  switch (type) {
    case SubjectActionEnum.createSubjectRequest:
      return {
        ...state,
        ...payload,
      };
    case SubjectActionEnum.updateSubjectRequest:
      return {
        ...state,
        ...payload,
      };
    case SubjectActionEnum.fetchSubjectRequest:
      return {
        ...state,
        ...payload,
      };
    case SubjectActionEnum.listSubjectsRequest:
      return {
        ...state,
        ...payload,
      };
    case SubjectActionEnum.apsSubjectsRequest:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
