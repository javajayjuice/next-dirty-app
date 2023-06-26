import { InstitutionActionEnum } from "../../../enums";
import { IInstitutionStateContext } from "./context";

//update state for each action and destructure and spread
export function InstitutionReducer(
  state: IInstitutionStateContext,
  action: ReduxActions.Action<IInstitutionStateContext>
): IInstitutionStateContext {
  const { type, payload } = action;

  switch (type) {
    case InstitutionActionEnum.createInstitutionRequest:
      return {
        ...state,
        institutionsList: [
          ...state.institutionsList,
          payload.institutionCreated,
        ],
      };
    case InstitutionActionEnum.listInstitutionsRequest:
      return {
        ...state,
        ...payload,
      };
    case InstitutionActionEnum.getInstitutionsTotalCountRequest:
      return {
        ...state,
        ...payload,
      };
    case InstitutionActionEnum.updateInstitutionRequest:
      const updatedInstitution = payload.institutionUpdated;
      console.log("action updateInstitution::", updatedInstitution);
      const updatedInstitutions = state.institutionsList.map((institution) =>
        institution.id === updatedInstitution.id
          ? updatedInstitution
          : institution
      );
      return {
        ...state,
        institutionsList: updatedInstitutions,
      };
    case InstitutionActionEnum.deleteInstitutionRequest:
      const institutionToDelete = payload.institutionDeleted;
      const updatedInstitutionsList = state.institutionsList.filter(
        (institution) => institution.id !== institutionToDelete
      );
      return {
        ...state,
        institutionsList: updatedInstitutionsList,
      };
    case InstitutionActionEnum.getInstitutionRequest:
      return {
        ...state,
        ...payload,
      };
    case InstitutionActionEnum.searchInstitutionRequest:
      return {
        ...state,
        ...payload,
      };
    case InstitutionActionEnum.selectInstitutionRequest:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
