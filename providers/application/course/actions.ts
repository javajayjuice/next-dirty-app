import { createAction } from 'redux-actions';
import { ICourseStateContext } from './context';
import { CourseActionEnum } from '../../../enums';
import { CourseDto } from '../../../interfaces';

// Must match the variable in the interface state context (courseCreated)
export const createCourseRequestAction = createAction<ICourseStateContext, CourseDto>(CourseActionEnum.createCourseRequest, (courseCreated) => ({ courseCreated }));
export const listCoursesRequestAction = createAction<ICourseStateContext, Array<CourseDto>>(CourseActionEnum.listCoursesRequest, (coursesList) => ({ coursesList }));
export const getCoursesTotalCountRequestAction = createAction<ICourseStateContext, number>(CourseActionEnum.getCoursesTotalCountRequest, (coursesTotalCount) => ({ coursesTotalCount }));
export const updateCourseRequestAction = createAction<ICourseStateContext, CourseDto>(CourseActionEnum.updateCourseRequest, (courseUpdated) => ({ courseUpdated }));
export const deleteCourseRequestAction = createAction<ICourseStateContext, string>(CourseActionEnum.deleteCourseRequest, (courseDeleted) => ({ courseDeleted }));
export const getCourseRequestAction = createAction<ICourseStateContext, CourseDto[]>(CourseActionEnum.getCourseRequest, (courseSelected) => ({ courseSelected }));
export const selectCourseRequestAction = createAction<ICourseStateContext, CourseDto[]>(CourseActionEnum.selectCourseRequest, (courseSelected) => ({ courseSelected }));
