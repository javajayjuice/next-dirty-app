import { UserActionEnum } from "../../enums";
import { IUserStateContext } from "./context";

export function UserReducer(
  incomingState: IUserStateContext,
  action: ReduxActions.Action<IUserStateContext>
): IUserStateContext {
  const { type, payload } = action;

  switch (type) {
    case UserActionEnum.loginUserRequest:
      return { ...incomingState, ...payload };
    case UserActionEnum.createUserRequest:
      return { ...incomingState, ...payload };
    case UserActionEnum.updateUserRequest:
      return { ...incomingState, ...payload };
    case UserActionEnum.logOutUserRequest:
      return { ...incomingState, ...payload };
    case UserActionEnum.setCurrentUserRequest:
      return { ...incomingState, ...payload };
    case UserActionEnum.getUserDetailsRequest:
      return { ...incomingState, ...payload };
    case UserActionEnum.isUserLoggedInRequest:
      return { ...incomingState, ...payload };
    case UserActionEnum.getCurrentInformationRequest:
      return { ...incomingState, ...payload };
    default:
      return incomingState;
  }
}
