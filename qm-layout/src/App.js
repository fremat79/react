import SideBar from './SideBar';
import './App.css';

import {
  IoHomeSharp,
  IoBarChartSharp,
  IoBookSharp,
  IoExtensionPuzzleOutline,
} from 'react-icons/io5';

function App() {
  return (
    <>
      {/* <div className="app-layout">
        <SideBar expanded={false}>
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
      </div> */}

      <div className="app-layout">
        <div className="col1">
          <SideBar expanded={false}>
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
        </div>
        <div className="header">
          <div className="content">
            <h1>Header</h1>
            <img src="./logofull.svg" />
          </div>
        </div>
        <div className="footer">
          <h1>Footer</h1>
        </div>
        <div className="content">
          <h1>Content</h1>
        </div>
      </div>
    </>
  );
}

export default App;
