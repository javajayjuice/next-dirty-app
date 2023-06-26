import {
  RefListGender,
  ReflistActivity,
  ReflistGrade,
  ReflistHomeLanguage,
  ReflistInstitution,
  ReflistNatureOfDisability,
  ReflistPopulationGroup,
  ReflistProvince,
  ReflistResult,
  ReflistStatus,
  ReflistTitle,
} from "../enums";

export interface AddressDto {
  id?: string;
  street: string;
  town: string;
  city: string;
  suburb: string;
  province: ReflistProvince;
  postalCode: number;
}

export interface ApplicantDto extends PersonDto {
  currentActivity: ReflistActivity;
  previousActivity: ReflistActivity;
  qualifications: QualificationDto[];
  storedFiles: StoredFileDto[];
  applicantSubjects: ApplicantSubjectDto[];
}

export interface ApplicantInputDto extends PersonDto {
  currentActivity: ReflistActivity;
  previousActivity: ReflistActivity;
}

export interface Login {
  userNameOrEmailAddress: string;
  password: string;
}

export interface ApplicantSubjectDto {
  id?: string;
  subjectId: string;
  aps: number;
  subjectName?: string;
}

export interface ApplicationInputDto {
  id?: string;
  applicantId: string;
  institutionId: string;
  yearOfStudy: number;
  firstChoice: string;
  secondChoice: string;
  isFullTime: boolean;
  initialsSurname: string;
  signature: string;
  date: Date;
}

export interface ApplicationOutputDto {
  id?: string;
  applicant: ApplicantDto;
  institution: InstitutionDto;
  yearOfStudy: number;
  firstChoice: string;
  secondChoice: string;
  isFullTime: boolean;
  initialsSurname: string;
  signature: string;
  date: Date;
  creationTime:Date;
}

export interface ApplicationStatusDto {
  id?: string;
  applicationId?: any;
  status: ReflistStatus;
  reason: string;
}

export interface ApplicationStatusInputDto {
  id?: string;
  applicationId: string;
  status: ReflistStatus;
  reason: string;
}

export interface CampusDto {
  id?: string;
  name: string;
  address: AddressDto;
  institutionId: string;
}

export interface CourseDto {
  id?: string;
  name: string;
  description: string;
  nqfLevel: string;
  duration: string;
  minimumAps: string;
  programmeCode: string;
  facultyId: string;
}

export interface FacultyInputDto {
  id?: string;
  name: string;
  description: string;
}

export interface FacultyDto {
  id?: string;
  name: string;
  description: string;
  courses?: Course[];
}

export interface InstituteFacultyDto {
  id?: string;
  campusId: string;
  facultyId: string;
}

export interface InstitutionDto {
  id?: string;
  name: string;
  description: string;
  type: ReflistInstitution;
  contact: string;
  address: AddressDto;
}

export interface ParentInputDto {
  id?: string;
  surname: string;
  initials: string;
  title: string;
  phoneNumber: string;
  emailAddress: string;
}

export interface PersonDto {
  id: string;
  userName: string;
  name: string;
  surname: string;
  password: string;
  phoneNumber: string;
  emailAddress: string;
  identityNumber: string;
  title: ReflistTitle;
  initials: string;
  gender: RefListGender;
  dateOfBirth: Date;
  homeLanguage: ReflistHomeLanguage;
  populationGroup: ReflistPopulationGroup;
  diability: boolean;
  natureOfDisability: ReflistNatureOfDisability;
  userId: number;
  roleNames: string[];
  address: AddressDto
}

export interface QualificationDto {
  id?: string;
  yearStart: string;
  yearEnd: string;
  institution: string;
  fieldOfStudy: string;
  status: ReflistResult;
}

export interface StoredFileDto {
  name?: string;
  id?: string;
  data: number[];
}

export interface StringIdDto {
  id: string;
}

export interface SubjectDto {
  id?:string;
  name: string;
  description: string;
  level: ReflistGrade;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  nqfLevel: string;
  duration: string;
  minimumAps: string;
  programmeCode: string;
  faculty: Faculty;
}

export interface Faculty {
  id: string;
  name: string;
  description: string;
  courses: Course[];
}
