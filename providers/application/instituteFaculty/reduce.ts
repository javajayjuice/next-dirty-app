import { InstituteFacultyActionEnum } from "../../../enums";
import { IInstituteFacultyStateContext } from "./context";

// Update state for each action and destructure and spread
export function InstituteFacultyReducer(
  state: IInstituteFacultyStateContext,
  action: ReduxActions.Action<IInstituteFacultyStateContext>
): IInstituteFacultyStateContext {
  const { type, payload } = action;

  switch (type) {
    case InstituteFacultyActionEnum.createInstituteFacultyRequest:
      return {
        ...state,
        instituteFacultiesList: [...state.instituteFacultiesList, payload.instituteFacultyCreated],
      };
    case InstituteFacultyActionEnum.listInstituteFacultiesRequest:
      return {
        ...state,
        ...payload,
      };
    case InstituteFacultyActionEnum.getInstituteFacultiesTotalCountRequest:
      return {
        ...state,
        ...payload,
      };
    case InstituteFacultyActionEnum.updateInstituteFacultyRequest:
      const updatedInstituteFaculty = payload.instituteFacultyUpdated;
      console.log("action updateInstituteFaculty::", updatedInstituteFaculty);
      const updatedInstituteFaculties = state.instituteFacultiesList.map((faculty) =>
        faculty.id === updatedInstituteFaculty.id ? updatedInstituteFaculty : faculty
      );
      return {
        ...state,
        instituteFacultiesList: updatedInstituteFaculties,
      };
    case InstituteFacultyActionEnum.deleteInstituteFacultyRequest:
      const instituteFacultyToDelete = payload.instituteFacultyDeleted;
      const updatedInstituteFacultiesList = state.instituteFacultiesList.filter(
        (faculty) => faculty.id !== instituteFacultyToDelete
      );
      return {
        ...state,
        instituteFacultiesList: updatedInstituteFacultiesList,
      };
    case InstituteFacultyActionEnum.getInstituteFacultyRequest:
      return {
        ...state,
        ...payload,
      };
    case InstituteFacultyActionEnum.searchInstituteFacultyRequest:
      return {
        ...state,
        ...payload,
      };
    case InstituteFacultyActionEnum.selectInstituteFacultyRequest:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
