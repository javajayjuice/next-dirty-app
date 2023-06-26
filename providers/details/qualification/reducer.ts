import { QualificationActionEnum } from "../../../enums";
import { IQualificationStateContext } from "./context";

export function QualificationReducer(
  state: IQualificationStateContext,
  action: ReduxActions.Action<IQualificationStateContext>
): IQualificationStateContext {
  const { type, payload } = action;

  switch (type) {
    case QualificationActionEnum.createQualificationRequest:
      return {
        ...state,
        qualificationFetched: [
          ...state.qualificationFetched,
          payload.qualificationCreated,
        ],
      };
    case QualificationActionEnum.updateQualificationRequest:
      return {
        ...state,
        ...payload,
      };
    case QualificationActionEnum.fetchQualificationRequest:
      return {
        ...state,
        ...payload,
      };
    case QualificationActionEnum.listQualificationsRequest:
      return {
        ...state,
        ...payload,
      };
    case QualificationActionEnum.deleteQualificationRequest:
      const movieToDelete = payload.qualificationDeleted;
      const updatedMovies = state.qualificationFetched.filter(
        (subject) => subject.id !== movieToDelete
      );
      return {
        ...state,
        qualificationFetched: updatedMovies,
      };
    default:
      return state;
  }
}
