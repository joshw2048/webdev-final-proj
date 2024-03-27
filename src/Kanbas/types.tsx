interface BaseCourse {
  _id: string;
  name: string;
  description: string
}

export interface Course extends BaseCourse {
  number: string;
  startDate: string;
  endDate: string;
  image: string;
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