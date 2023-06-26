import { AddressActionEnum } from "../../../enums";
import { IAddressStateContext } from "./context";


//update state for each action and destructure and spread
export function AddressReducer(
  state: IAddressStateContext,
  action: ReduxActions.Action<IAddressStateContext>
): IAddressStateContext {
  const { type, payload } = action;

  switch (type) {
    case AddressActionEnum.createAddressRequest:
      return {
        ...state,
        ...payload,
      };
      case AddressActionEnum.updateAddressRequest:
        return {
        ...state,
        ...payload,
      };
      case AddressActionEnum.fetchAddressRequest:
        return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
