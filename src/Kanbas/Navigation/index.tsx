import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { 
  FaTachometerAlt, 
  FaRegUserCircle, 
  FaBook, 
  FaRegCalendarAlt, 
  FaInbox, 
  FaRegClock,
  FaFileVideo,
  FaArrowRight,
  FaQuestionCircle,
} from "react-icons/fa";

export const links = [
  { label: "Account",   icon: <FaRegUserCircle className="fs-2 account-icon" />  },
  { label: "Dashboard", icon: <FaTachometerAlt className="fs-2 navigation-icon" />  },
  { label: "Courses",   icon: <FaBook className="fs-2 navigation-icon" />           },
  { label: "Calendar",  icon: <FaRegCalendarAlt className="fs-2 navigation-icon" /> },
  { label: "Inbox",  icon: <FaInbox className="fs-2 navigation-icon" /> },
  { label: "History",  icon: <FaRegClock className="fs-2 navigation-icon" /> },
  { label: "Studio",  icon: <FaFileVideo className="fs-2 navigation-icon" /> },
  { label: "Commons",  icon: <FaArrowRight className="fs-2 navigation-icon" /> },
  { label: "Help",  icon: <FaQuestionCircle className="fs-2 navigation-icon" /> },
];

function KanbasNavigation() {
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> 
            <div className='link-content-container'>  
              {link.icon ? link.icon : null} 
              {link.label} 
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default KanbasNavigation;