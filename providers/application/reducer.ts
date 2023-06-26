import { ApplicationActionEnum } from "../../enums";
import { IApplicationStateContext } from "./context";

//update state for each action and destructure and spread
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
      const updatedApplication = payload.applicationUpdated;
      console.log("action updateApplication::", updatedApplication);
      const updateApplications = state.applicationsList.filter(
        (application) => application.id === updatedApplication.id
      );
      return {
        ...state,
        applicationsList: [...updateApplications, updatedApplication],
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
