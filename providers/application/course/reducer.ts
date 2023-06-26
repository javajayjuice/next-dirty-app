import { CourseActionEnum } from "../../../enums";
import { ICourseStateContext } from "./context";

// Update state for each action and destructure and spread
export function CourseReducer(
  state: ICourseStateContext,
  action: ReduxActions.Action<ICourseStateContext>
): ICourseStateContext {
  const { type, payload } = action;

  switch (type) {
    case CourseActionEnum.createCourseRequest:
      return {
        ...state,
        coursesList: [
          ...state.coursesList,
          payload.courseCreated,
        ],
      };
    case CourseActionEnum.listCoursesRequest:
      return {
        ...state,
        ...payload,
      };
    case CourseActionEnum.getCoursesTotalCountRequest:
      return {
        ...state,
        ...payload,
      };
    case CourseActionEnum.updateCourseRequest:
      const updatedCourse = payload.courseUpdated;
      console.log("action updateCourse::", updatedCourse);
      const updatedCourses = state.coursesList.map((course) =>
        course.id === updatedCourse.id
          ? updatedCourse
          : course
      );
      return {
        ...state,
        coursesList: updatedCourses,
      };
    case CourseActionEnum.deleteCourseRequest:
      const courseToDelete = payload.courseDeleted;
      const updatedCoursesList = state.coursesList.filter(
        (course) => course.id !== courseToDelete
      );
      return {
        ...state,
        coursesList: updatedCoursesList,
      };
    case CourseActionEnum.getCourseRequest:
      return {
        ...state,
        ...payload,
      };
    case CourseActionEnum.searchCourseRequest:
      return {
        ...state,
        ...payload,
      };
    case CourseActionEnum.selectCourseRequest:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
