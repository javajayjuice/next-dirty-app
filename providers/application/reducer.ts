import { ApplicationActionEnum } from "../../enums";
import { IApplicationStateContext } from "./context";

export function ApplicationReducer(
  state: IApplicationStateContext,
  action: ReduxActions.Action<IApplicationStateContext>
): IApplicationStateContext {
  const { type, payload } = action;

  switch (type) {
    case ApplicationActionEnum.createApplicationRequest:
      return {
        ...state,
        ...payload,
      };
    case ApplicationActionEnum.createStatusRequest:
      return {
        ...state,
        ...payload,
      };
    case ApplicationActionEnum.listApplicationsRequest:
      return {
        ...state,
        ...payload,
      };
   
    case ApplicationActionEnum.getApplicationsTotalCountRequest:
      return {
        ...state,
        ...payload,
      };

    case ApplicationActionEnum.updateApplicationRequest:
      return {
        ...state,
        ...payload,
      };

    case ApplicationActionEnum.deleteApplicationRequest:
      const applicationToDelete = payload.applicationDeleted;
      const updatedApplications = state.applicationsList.filter(
        (application) => application.id !== applicationToDelete
      );
      return {
        ...state,
        applicationsList: updatedApplications,
      };
    case ApplicationActionEnum.getApplicationRequest:
      return {
        ...state,
        ...payload,
      };
    case ApplicationActionEnum.searchApplicationRequest:
      return {
        ...state,
        ...payload,
      };
    case ApplicationActionEnum.selectApplicationRequest:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
