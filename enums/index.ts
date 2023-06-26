//ReflistActivity
export enum ReflistActivity {
  Grade12Learner = 0,
  InternationalSchoolLearner = 1,
  TechnicalCollegeStudent = 2,
  LabourForce = 3,
  TechnikonStudent = 4,
  NursingCollegeStudent = 5,
  Unemployed = 6,
  TeachersCollegeStudent = 7,
  UniversityStudent = 8,
  Other = 9,
}

export enum RefListGender {
  Male = 1,
  Female = 2,
  NotDisclosed = 0,
}

export enum ReflistGrade {
  Grade12 = 12,
  Grade11 = 11,
}

export enum ReflistHomeLanguage {
  Afrikaans = 0,
  Sepedi = 1,
  English = 2,
  Setswana = 3,
  IsiNdebele = 4,
  SiSwati = 5,
  IsiXhosa = 6,
  Tshivenda = 7,
  IsiZulu = 8,
  Xitsonga = 9,
  Sesotho = 10,
}

export enum ReflistInstitution {
  TraditionalUniversities = 0,
  UniversitiesOfTechnology = 1,
  ComprehensiveUniversity = 2,
}

export enum ReflistNatureOfDisability {
  Normal = 0,
  CerebralPalsy = 1,
  Blind = 2,
  ReadingDisorder = 3,
  Deaf = 4,
  Paraplegic = 5,
  LowVision = 6,
  ADHD = 7,
  ImpairedHearing = 8,
  Quadriplegic = 9,
  Dyscalculia = 10,
  ImpairedMobility = 11,
  WritingDisorder = 12,
  SpeechImpairment = 13,
}

export enum ReflistPopulationGroup {
  African = 0,
  Coloured = 1,
  Indian = 2,
  White = 3,
  Asian = 4,
}

export enum ReflistProvince {
  EasternCape = 0,
  FreeState = 1,
  Gauteng = 2,
  KwaZuluNatal = 3,
  Limpopo = 4,
  Mpumalanga = 5,
  NorthernCape = 6,
  NorthWest = 7,
  WesternCape = 8,
}

export enum ReflistResult {
  Cancelled = 0,
  Failed = 1,
  DegreeObtained = 2,
}

export enum ReflistStatus {
  Submitted = 0,
  Pending = 1,
  Rejected = 2,
  Accepted = 3,
}

export enum ReflistTitle {
  Mr = 0,
  Mrs = 1,
  Miss = 2,
  Ms = 3,
}

export enum UserActionEnum {
  loginUserRequest = "LOGIN",
  createUserRequest = "CREATE",
  updateUserRequest = "UPDATE",
  logOutUserRequest = "LOGOUT",
  setCurrentUserRequest = "SET_CURRENT_USER",
  getUserDetailsRequest = "GET_USER",
  isUserLoggedInRequest = "IS_USER_LOGGED_IN",
  getCurrentInformationRequest = "GET_CURRENT_INFORMATION",
}

export enum AddressActionEnum {
  createAddressRequest = "CREATE_ADDRESS_REQUEST",
  updateAddressRequest = "UPDATE_ADDRESS_REQUEST",
  fetchAddressRequest = "FETCH_ADDRESS_REQUEST",
}

export enum ParentActionEnum {
  createParentRequest = "CREATE_PARENT_REQUEST",
  updateParentRequest = "UPDATE_PARENT_REQUEST",
  fetchParentRequest = "FETCH_PARENT_REQUEST",
}

export enum QualificationActionEnum {
  createQualificationRequest = "CREATE_QUALIFICATION_REQUEST",
  updateQualificationRequest = "UPDATE_QUALIFICATION_REQUEST",
  fetchQualificationRequest = "FETCH_QUALIFICATION_REQUEST",
  listQualificationsRequest = "LIST_QUALIFICATIONS_REQUEST",
  deleteQualificationRequest = "DELETE_QUALIFICATION_REQUEST",
}

export enum SubjectActionEnum {
  createSubjectRequest = "CREATE_SUBJECT_REQUEST",
  updateSubjectRequest = "UPDATE_SUBJECT_REQUEST",
  fetchSubjectRequest = "FETCH_SUBJECT_REQUEST",
  listSubjectsRequest = "LIST_SUBJECTS_REQUEST",
  apsSubjectsRequest = "APS_SUBJECTS_REQUEST",
}

export enum ApplicantSubjectActionEnum {
  createApplicantSubjectRequest = "CREATE_APPLICANT_SUBJECT_REQUEST",
  updateApplicantSubjectRequest = "UPDATE_APPLICANT_SUBJECT_REQUEST",
  fetchApplicantSubjectRequest = "FETCH_APPLICANT_SUBJECT_REQUEST",
  deleteApplicantSubjectRequest = "DELETE_APPLICANT_SUBJECT_REQUEST",
  }

export enum ApplicationActionEnum {
  createApplicationRequest = 'CREATE_APPLICATION_REQUEST',
  createStatusRequest = 'CREATE_STATUS_REQUEST',
 listApplicationsRequest = 'LIST_APPLICATIONS_REQUEST',
  updateApplicationRequest = 'UPDATE_APPLICATION_REQUEST',
  deleteApplicationRequest = 'DELETE_APPLICATION_REQUEST',
  getApplicationRequest = 'GET_APPLICATION_REQUEST',
  searchApplicationRequest = 'SEARCH_APPLICATION_REQUEST',
  selectApplicationRequest = 'SELECT_APPLICATION_REQUEST',
  getApplicationsTotalCountRequest = 'GET_APPLICATIONS_TOTAL_COUNT_REQUEST',
  }

  
export enum InstitutionActionEnum {
  createInstitutionRequest = 'CREATE_INSTITUTION_REQUEST',
  listInstitutionsRequest = 'LIST_INSTITUTIONS_REQUEST',
  updateInstitutionRequest = 'UPDATE_INSTITUTION_REQUEST',
  deleteInstitutionRequest = 'DELETE_INSTITUTION_REQUEST',
  getInstitutionRequest = 'GET_INSTITUTION_REQUEST',
  searchInstitutionRequest = 'SEARCH_INSTITUTION_REQUEST',
  selectInstitutionRequest = 'SELECT_INSTITUTION_REQUEST',
  getInstitutionsTotalCountRequest = 'GET_INSTITUTIONS_TOTAL_COUNT_REQUEST',
  }

  export enum CampusActionEnum {
    createCampusRequest = 'CREATE_CAMPUS_REQUEST',
    listCampusesRequest = 'LIST_CAMPUSES_REQUEST',
    updateCampusRequest = 'UPDATE_CAMPUS_REQUEST',
    deleteCampusRequest = 'DELETE_CAMPUS_REQUEST',
    getCampusRequest = 'GET_CAMPUS_REQUEST',
    searchCampusRequest = 'SEARCH_CAMPUS_REQUEST',
    selectCampusRequest = 'SELECT_CAMPUS_REQUEST',
    getCampusesTotalCountRequest = 'GET_CAMPUSES_TOTAL_COUNT_REQUEST',
  }
  

  
export enum FacultyActionEnum {
  createFacultyRequest = 'CREATE_FACULTY_REQUEST',
  listFacultiesRequest = 'LIST_FACULTIES_REQUEST',
  updateFacultyRequest = 'UPDATE_FACULTY_REQUEST',
  deleteFacultyRequest = 'DELETE_FACULTY_REQUEST',
  getFacultyRequest = 'GET_FACULTY_REQUEST',
  searchFacultyRequest = 'SEARCH_FACULTY_REQUEST',
  selectFacultyRequest = 'SELECT_FACULTY_REQUEST',
  getFacultiesTotalCountRequest = 'GET_FACULTIES_TOTAL_COUNT_REQUEST',
  }

  export enum CourseActionEnum {
    createCourseRequest = 'CREATE_COURSE_REQUEST',
    listCoursesRequest = 'LIST_COURSES_REQUEST',
    updateCourseRequest = 'UPDATE_COURSE_REQUEST',
    deleteCourseRequest = 'DELETE_COURSE_REQUEST',
    getCourseRequest = 'GET_COURSE_REQUEST',
    searchCourseRequest = 'SEARCH_COURSE_REQUEST',
    selectCourseRequest = 'SELECT_COURSE_REQUEST',
    getCoursesTotalCountRequest = 'GET_COURSES_TOTAL_COUNT_REQUEST',
  }

  export enum InstituteFacultyActionEnum {
    createInstituteFacultyRequest = 'CREATE_INSTITUTE_FACULTY_REQUEST',
    listInstituteFacultiesRequest = 'LIST_INSTITUTE_FACULTIES_REQUEST',
    updateInstituteFacultyRequest = 'UPDATE_INSTITUTE_FACULTY_REQUEST',
    deleteInstituteFacultyRequest = 'DELETE_INSTITUTE_FACULTY_REQUEST',
    getInstituteFacultyRequest = 'GET_INSTITUTE_FACULTY_REQUEST',
    searchInstituteFacultyRequest = 'SEARCH_INSTITUTE_FACULTY_REQUEST',
    selectInstituteFacultyRequest = 'SELECT_INSTITUTE_FACULTY_REQUEST',
    getInstituteFacultiesTotalCountRequest = 'GET_INSTITUTE_FACULTIES_TOTAL_COUNT_REQUEST',
  }
  
  