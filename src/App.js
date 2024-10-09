import { Route,Routes,BrowserRouter as Router } from "react-router-dom";
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css'; 
import SearchResults from "./components/SearchResults";
import Job from "./components/Job";
import Skill from "./components/Skill";
import Header from "./components/Header";

function App() {
  return (
    <Router>
    <div className="App">
     <Header/>
     <Routes>
     <Route path="/" element={<SearchResults />} />
     <Route path="/job/:jobId" element={ <Job/>}/>
     <Route path="/skill/:skillId" element={ <Skill/>}/>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
