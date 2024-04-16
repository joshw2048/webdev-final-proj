interface BaseCourse {
  _id?: string;
  id?: string; // ugh
  name: string;
  description?: string
}

export interface Course extends BaseCourse {
  number: string;
  startDate: string;
  endDate: string;
  image?: string;
  subtext?: string;
  department?: string;
  credits?: number;
  author?: string;
}

export interface CourseModule extends BaseCourse {
  course: string;
  lessons?: Lesson[];
}

export interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  points: number;
  dueDate: AssignmentDate;
  availableDate?: AssignmentDate;
}

interface AssignmentDate {
  day: string;
  time: string;
}

export interface Grade {
  _id: string;
  student: string;
  assignment: string;
  grade: string; // ?? why
}

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

type UserRole = "FACULTY" | "STUDENT";
export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: UserRole;
}