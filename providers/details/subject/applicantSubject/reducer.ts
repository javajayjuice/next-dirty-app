import { ApplicantSubjectActionEnum } from "../../../../enums";
import { IApplicantSubjectStateContext } from "./context";

//update state for each action and destructure and spread
export function ApplicantSubjectReducer(
  state: IApplicantSubjectStateContext,
  action: ReduxActions.Action<IApplicantSubjectStateContext>
): IApplicantSubjectStateContext {
  const { type, payload } = action;

  switch (type) {
    case ApplicantSubjectActionEnum.createApplicantSubjectRequest:
        return {
            ...state,
            applicantSubjectFetched: [
              ...state.applicantSubjectFetched,
              payload.applicantSubjectCreated,
            ],
          };
    case ApplicantSubjectActionEnum.updateApplicantSubjectRequest:
      return {
        ...state,
        ...payload,
      };
    case ApplicantSubjectActionEnum.fetchApplicantSubjectRequest:
      return {
        ...state,
        ...payload,
      };
    case ApplicantSubjectActionEnum.deleteApplicantSubjectRequest:
      const movieToDelete = payload.applicantSubjectDeleted;
      const updatedMovies = state.applicantSubjectFetched.filter(
        (subject) => subject.id !== movieToDelete
      );
      return {
        ...state,
        applicantSubjectFetched: updatedMovies,
      };
    default:
      return state;
  }
}
