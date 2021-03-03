import './App.css';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Navigation from './composants/navigation/Navigation' ;
import Logo from './composants/Logo/Logo' ;
import Connexion from './composants/Connexion/Connexion' ;
import Unitep from './composants/Unitep/Unitep' ;




function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path ="/rgpn">
          <Navigation />
          <Logo />
          <Connexion/>
        </Route>
    
      
        <Route path ="/Unitep">
          <Unitep/> 
        </Route>
      </Switch>
    </Router>
        
      
    </div>
  );
}

export default App;
