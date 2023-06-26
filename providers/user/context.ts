import { createContext } from 'react';
import { Login, ApplicantInputDto } from '../../interfaces';

export const INITIAL_STATE: IUserStateContext={}

export interface IUserStateContext {
    readonly UserLogin? : Login;
    readonly adminLogin? : Login;
    readonly CreateUser?:ApplicantInputDto;
    readonly UserLogOut?:ApplicantInputDto;
    readonly currentUser?: ApplicantInputDto;
    readonly user?: ApplicantInputDto;
    readonly userLoggedIn?: boolean;
    readonly currentInformation?: ApplicantInputDto;
    readonly userUpdated?: ApplicantInputDto;
}

export interface IUserActionContext{
    loginUser?:(payload:Login) => void;
    loginAdmin?:(payload:Login) => void;
    createUser?:(payload:ApplicantInputDto) => void;
    updateUser?:(payload:any) => void;
    logOutUser?:() => void;
    setCurrentUser?:() => void;
    getUserDetails?:(id:number) => void;
    isUserLoggedIn?:()=> void;
    getCurrentInformation?: () => void;
}

const UserContext = createContext<IUserStateContext>(INITIAL_STATE);

const UserActionContext = createContext<IUserActionContext>(undefined);

export {UserContext, UserActionContext};