import SideBar from "./SideBar";
import "./App.css";

import {
  IoHomeSharp,
  IoBarChartSharp,
  IoBookSharp,
  IoExtensionPuzzleOutline,
  IoArrowForwardCircle,
  IoArrowBackCircle,
  IoHome,
} from "react-icons/io5";

function App() {
  return (
    <>
      <SideBar>
        <SideBar.Item
          pageName="Dashboard"
          icon={<IoHomeSharp />}
          toolTip="Dashboard"
        />
        <SideBar.Item
          pageName="Configurazione"
          icon={<IoExtensionPuzzleOutline />}
          toolTip="Configurazione"
        />
        <SideBar.Item
          pageName="Stato macchine"
          icon={<IoBookSharp />}
          toolTip="Stato macchine"
        />
        <SideBar.Item
          pageName="Statistiche"
          icon={<IoBarChartSharp />}
          toolTip="Statistiche"
        />
      </SideBar>
    </>
  );
}

export default App;
