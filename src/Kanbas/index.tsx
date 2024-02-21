import { useState, useEffect } from "react";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { SmallNav } from "./Navigation/SmallNav";
import { useMediumMediaQueryBreakpoint } from "./hooks/useMediumMediaQueryBreakpoint";

function Kanbas() {
  const isLargeScreen = useMediumMediaQueryBreakpoint();

  return (
    <>
      {!isLargeScreen && <SmallNav />}  
      <div className="d-flex">
        <div>
          {isLargeScreen && <KanbasNavigation />}
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