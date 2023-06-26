import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { ParentReducer } from './reducer';
import { ParentActionContext, ParentStateContext, INITIAL_STATE } from './context';
import api from '../../../pages/api';
import { ParentInputDto } from '../../../interfaces';
import { createParentRequestAction, updateParentRequestAction } from './actions';
import { message } from 'antd';

//define the provider and the endpoint functionality
const ParentProvider: FC<PropsWithChildren<{}>> = ({ children }) => {


const [state, dispatch] = useReducer(ParentReducer, INITIAL_STATE)

//[CREATE_PARENT_REQUEST]
const createParent = (parent: ParentInputDto) => {
    console.log('passed parent')
    api.post('services/app/Parent/Create', parent)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          dispatch(createParentRequestAction(parent));
          message.success('Parent added successfully.');
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  //[UPDATE_PARENT_REQUEST]
  const updateParent = (parentId, updatedParent) => {
    api.put(`services/app/Parent/UpdateParent/${parentId}`, updatedParent)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          dispatch(updateParentRequestAction(updatedParent));
          message.success('Parent updated successfully.');
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

return (
    <ParentStateContext.Provider value={state}>
        <ParentActionContext.Provider value={{ createParent, updateParent }}>
            {children}
        </ParentActionContext.Provider>
    </ParentStateContext.Provider>
)
}

function useParentState() {
const context = useContext(ParentStateContext);
if (!context) {
throw new Error("useParentState must be used within a ParentProvider");
}
return context;
}

function useParentAction() {
const context = useContext(ParentActionContext);
if (context === undefined) {
throw new Error("useParentAction must be used within a ParentProvider");
}
return context;
}

function useParent() {
return {
...useParentState(),
...useParentAction()
}
}

export { ParentProvider, useParent }