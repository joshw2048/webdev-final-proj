import { Link, useLocation } from "react-router-dom";

function EditorNav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link to="/editor/details"
            className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>Details</Link>
      <Link className={`nav-link ${pathname.includes("questions") ? "active" : ""}`} to="/editor/questions">Questions</Link>
    </nav>
  );
}


export default EditorNav;