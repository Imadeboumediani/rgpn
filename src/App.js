import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Navigation from './composants/navigation/Navigation';
import Logo from './composants/Logo/Logo';
import Connexion from './composants/Connexion/Connexion';
import ModuleF from './composants/ModuleF/ModuleF';
import Accueil from './composants/Accueil/Accueil';
import UniteP from './composants/UniteP/UniteP';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/rgpn">
            <Navigation />
            <Logo />
            <Connexion />
          </Route>

          <Route path="/Accueil">
            <Accueil />
          </Route>
          <Route path="/ModuleF">
            <ModuleF />
          </Route>
          <Route path="/UniteP">
            <UniteP />
          </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
