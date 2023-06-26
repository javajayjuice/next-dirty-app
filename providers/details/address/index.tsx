import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { AddressReducer } from './reducer';
import { AddressActionContext, AddressStateContext, INITIAL_STATE } from './context';
import api from '../../../pages/api';
import { AddressDto } from '../../../interfaces';
import { createAddressRequestAction, updateAddressRequestAction } from './actions';
import { message } from 'antd';

//define the provider and the endpoint functionality
const AddressProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

  const [state, dispatch] = useReducer(AddressReducer, INITIAL_STATE)

  //[CREATE_ADDRESS_REQUEST]
  const createAddress = (address: AddressDto) => {
    console.log('passed address')
    api.post('services/app/Address/CreateAddressForPerson', address)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          dispatch(createAddressRequestAction(address));
          message.success('Address added successfully.');
          console.log('Address Id::', res.result)
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  //[UPDATE_ADDRESS_REQUEST]
  const updateAddress = (addressId, updatedAddress) => {
    api.put(`services/app/Address/UpdateAddress/${addressId}`, updatedAddress)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          dispatch(updateAddressRequestAction(updatedAddress));
          message.success('Address updated successfully.');
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  return (
    <AddressStateContext.Provider value={state}>
      <AddressActionContext.Provider value={{ createAddress }}>
        {children}
      </AddressActionContext.Provider>
    </AddressStateContext.Provider>
  )
}

function useAddressState() {
  const context = useContext(AddressStateContext);
  if (!context) {
    throw new Error("useAddressState must be used within a MovieProvider");
  }
  return context;
}

function useAddressAction() {
  const context = useContext(AddressActionContext);
  if (context === undefined) {
    throw new Error("useAddressAction must be used within a MovieProvider");
  }
  return context;
}

function useAddress() {
  return {
    ...useAddressState(),
    ...useAddressAction()
  }
}

export { AddressProvider, useAddress }