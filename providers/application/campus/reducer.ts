import { CampusActionEnum } from "../../../enums";
import { ICampusStateContext } from "./context";

// Update state for each action and destructure and spread
export function CampusReducer(
  state: ICampusStateContext,
  action: ReduxActions.Action<ICampusStateContext>
): ICampusStateContext {
  const { type, payload } = action;

  switch (type) {
    case CampusActionEnum.createCampusRequest:
      
      return {
        ...state,
        campusesList: [
          ...state.campusesList,
          payload.campusCreated,
        ],
      };
    case CampusActionEnum.listCampusesRequest:
      return {
        ...state,
        ...payload,
      };
    case CampusActionEnum.getCampusesTotalCountRequest:
      return {
        ...state,
        ...payload,
      };
    case CampusActionEnum.updateCampusRequest:
      const updatedCampus = payload.campusUpdated;
      console.log("action updateCampus::", updatedCampus);
      const updatedCampuses = state.campusesList.map((campus) =>
        campus.id === updatedCampus.id ? updatedCampus : campus
      );
      return {
        ...state,
        campusesList: updatedCampuses,
      };
    case CampusActionEnum.deleteCampusRequest:
      const campusToDelete = payload.campusDeleted;
      const updatedCampusesList = state.campusesList.filter(
        (campus) => campus.id !== campusToDelete
      );
      return {
        ...state,
        campusesList: updatedCampusesList,
      };
    case CampusActionEnum.getCampusRequest:
      return {
        ...state,
        ...payload,
      };
    case CampusActionEnum.searchCampusRequest:
      return {
        ...state,
        ...payload,
      };
    case CampusActionEnum.selectCampusRequest:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
