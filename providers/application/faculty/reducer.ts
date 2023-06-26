import { FacultyActionEnum } from "../../../enums";
import { IFacultyStateContext } from "./context";

// update state for each action and destructure and spread
export function FacultyReducer(
  state: IFacultyStateContext,
  action: ReduxActions.Action<IFacultyStateContext>
): IFacultyStateContext {
  const { type, payload } = action;

  switch (type) {
    case FacultyActionEnum.createFacultyRequest:
      return {
        ...state,
        facultiesList: [...state.facultiesList, payload.facultyCreated],
      };
    case FacultyActionEnum.listFacultiesRequest:
      return {
        ...state,
        ...payload,
      };
    case FacultyActionEnum.getFacultiesTotalCountRequest:
      return {
        ...state,
        ...payload,
      };
    case FacultyActionEnum.updateFacultyRequest:
      const updatedFaculty = payload.facultyUpdated;
      console.log("action updateFaculty::", updatedFaculty);
      const updatedFaculties = state.facultiesList.map((faculty) =>
        faculty.id === updatedFaculty.id ? updatedFaculty : faculty
      );
      return {
        ...state,
        facultiesList: updatedFaculties,
      };
    case FacultyActionEnum.deleteFacultyRequest:
      const facultyToDelete = payload.facultyDeleted;
      const updatedFacultiesList = state.facultiesList.filter(
        (faculty) => faculty.id !== facultyToDelete
      );
      return {
        ...state,
        facultiesList: updatedFacultiesList,
      };
    case FacultyActionEnum.getFacultyRequest:
      return {
        ...state,
        ...payload,
      };
    case FacultyActionEnum.searchFacultyRequest:
      return {
        ...state,
        ...payload,
      };
    case FacultyActionEnum.selectFacultyRequest:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
