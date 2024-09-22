import { cloneElement, createContext, useContext, useState } from "react";
import { Tooltip } from "react-tooltip";
import {
  IoHomeSharp,
  IoBarChartSharp,
  IoBookSharp,
  IoExtensionPuzzleOutline,
  IoArrowForwardCircle,
  IoArrowBackCircle,
} from "react-icons/io5";

const SideBarContext = createContext();

export default function SideBar({ children }) {
  const [closed, setClosed] = useState(false);

  function toggleSidebar() {
    setClosed((prevClosed) => !prevClosed);
  }

  return (
    <SideBarContext.Provider value={{ closed }}>
      <nav className={closed ? "sidebar close" : "sidebar"}>
        <header>
          <img src="logo.png" alt="company logo" />
          <div className="text header-text">
            <span className="app-name">Quick Monitor</span>
          </div>
          <div className="toggle">
            {closed ? (
              <IoArrowForwardCircle onClick={toggleSidebar} />
            ) : (
              <IoArrowBackCircle onClick={toggleSidebar} />
            )}
          </div>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul>{children}</ul>
          </div>
        </div>
      </nav>
      <Tooltip id="my-tooltip" place="bottom" type="dark" effect="solid" />
    </SideBarContext.Provider>
  );
}

function SideBarItem({ icon, pageName, toolTip }) {
  const { closed } = useContext(SideBarContext);

  return (
    <li>
      <a
        href={pageName}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={closed ? toolTip : ""}
      >
        {cloneElement(icon, { className: "icon" })}
        <span className="text nav-text">{pageName}</span>
      </a>
    </li>
  );
}

SideBar.Item = SideBarItem;
