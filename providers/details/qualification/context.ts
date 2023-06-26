import { createContext } from "react";
import { QualificationDto, StringIdDto } from "../../../interfaces";

export const INITIAL_STATE: IQualificationStateContext = {};

export interface IQualificationStateContext {
  readonly qualificationCreated?: QualificationDto;
  readonly qualificationUpdated?: QualificationDto;
  readonly qualificationFetched?: QualificationDto[];
  readonly qualificationDeleted?: string;
  readonly qualificationsList?: QualificationDto[];
}

export interface IQualificationActionContext {
  createQualification?: (payload: QualificationDto) => void;
  updateQualification?: (payload: QualificationDto, id: StringIdDto) => void;
  fetchQualification?: () => void;
  listQualifications?: () => void;
  deleteQualification?: (payload: string) => void;
}

export const QualificationStateContext =
  createContext<IQualificationStateContext>(INITIAL_STATE);
export const QualificationActionContext =
  createContext<IQualificationActionContext>({});
