import { useState, useEffect } from "react";

export const useMediumMediaQueryBreakpoint = () => {
   /**
   * This code that functions as a media query breakpoint comes from stackoverflow: https://stackoverflow.com/questions/54491645/media-query-syntax-for-reactjs
   * from Marcos Guerrero
   * It makes use of two React Hooks, useState and useEffect, in order to determine when the window is resized and hits a certain
   * breakpoint. This code is being used to determine when to show the breadcrumb menu vs the general menu.
   * 
   * Changes I made: using this as a custom react hook because I need it in several places. Updated variable names to better match my naming.
   */
   const [islargeScreen, setIsLargeScreen] = useState<boolean>(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setIsLargeScreen( e.matches ));
  }, []);

  return islargeScreen;
}