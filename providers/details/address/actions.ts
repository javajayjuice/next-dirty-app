import { createAction } from 'redux-actions';
import { AddressActionEnum } from '../../../enums';
import { AddressDto } from '../../../interfaces';
import { IAddressStateContext } from './context';

export const createAddressRequestAction = createAction<IAddressStateContext, AddressDto>(AddressActionEnum.createAddressRequest, (addressCreated) => ({ addressCreated }));
export const updateAddressRequestAction = createAction<IAddressStateContext, AddressDto>(AddressActionEnum.updateAddressRequest, (addressUpdated) => ({ addressUpdated }));
export const fetchAddressRequestAction = createAction<IAddressStateContext, AddressDto>(AddressActionEnum.fetchAddressRequest, (addressFetched) => ({ addressFetched }));
