import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import { CourseModule } from "../types";

export interface KanbasState {
  modulesReducer: {
    modules: CourseModule[];
    module: CourseModule;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer
  }
});

export default store;