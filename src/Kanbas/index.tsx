import { useState, useEffect } from "react";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { SmallNav } from "./Navigation/SmallNav";

function Kanbas() {
  /**
   * This code to check media queries comes from stackoverflow: https://stackoverflow.com/questions/54491645/media-query-syntax-for-reactjs
   * It makes use of two React Hooks, useState and useEffect, in order to determine when the window is resized and hits a certain
   * breakpoint. This code is being used to determine when to show the breadcrumb menu vs the general menu.
   */
  const [largeScreen, setLargeScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setLargeScreen( e.matches ));
  }, []);

  return (
    <>
      {!largeScreen && <SmallNav />}  
      <div className="d-flex">
        <div>
          {largeScreen && <KanbasNavigation />}
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Kanbas;