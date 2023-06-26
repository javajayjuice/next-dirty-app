import { createContext } from "react";
import { CourseDto } from "../../../interfaces";

// State at first load time
export const INITIAL_STATE: ICourseStateContext = {};

// Specifying the state
export interface ICourseStateContext {
  readonly courseCreated?: CourseDto;
  readonly coursesList?: Array<CourseDto>;
  readonly courseUpdated?: CourseDto;
  readonly courseDeleted?: string;
  readonly courseSelected?: CourseDto[];
  readonly coursesTotalCount?: number;
}

// Specifying the action
export interface ICourseActionContext {
  createCourse?: (payload: CourseDto) => void;
  listCourses?: () => void;
  getCoursesTotalCount?: () => void;
  updateCourse?: (payload: CourseDto) => void;
  deleteCourse?: (payload: string) => void;
  getCourse?: (payload: string) => void;
}

// Initializing the state and the action
export const CourseStateContext = createContext<ICourseStateContext>(INITIAL_STATE);
export const CourseActionContext = createContext<ICourseActionContext>({});
