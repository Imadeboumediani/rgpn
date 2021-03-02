import './App.css';
import Navigation from './composants/navigation/Navigation' ;
import Logo from './composants/Logo/Logo' ;
import Connexion from './composants/Connexion/Connexion' ;



function App() {
  return (
    <div className="App">
     <Navigation />
     <Logo />
     <Connexion/>
     
    </div>
  );
}

export default App;
