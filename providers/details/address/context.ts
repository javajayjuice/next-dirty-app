import { createContext } from "react";
import { AddressDto } from "../../../interfaces";

export const INITIAL_STATE: IAddressStateContext = {};

export interface IAddressStateContext{
    readonly addressCreated?: AddressDto;
    readonly addressUpdated?: AddressDto;
    readonly addressFetched?: AddressDto;
}

export interface IAddressActionContext{
    createAddress?: (payload: AddressDto)=>void;
    updateAddress?: (payload: AddressDto)=>void;
    fetchAddress?: (payload: AddressDto)=>void;
}

export const AddressStateContext = createContext<IAddressStateContext>(INITIAL_STATE);
export const AddressActionContext = createContext<IAddressActionContext>({});
