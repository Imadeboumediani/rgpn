import '../../App.css';
import React from 'react';
import Logo from '../Logo/Logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';


class Accueil extends Component {

  

  
  render() {
    return (

    <div class=' ph5 flex flex-column cf pa5'>
      <Logo class='db center mw5 tc black link dim'/>
      <main class="  black-80 flex flex-column" >
      <h2 class=" pa4 flex flex-column tc f9 f5-m f1-l fw5 black-90 mv9  ">Bienvenue dans votre profil Enseignant</h2>


        <form class= '  list pl0 measure center' >




         
          <div class=" lh-dtc v-top pl2 mt3">
            <div className="mb">
              <>
                <div class='ph2 pv4 tc'>
                  <button class="  w-100 f5 link dim br3 ph3 pv2 mb2 dib pv3-ns  dib white bg-dark-green"  onClick={(e) => {  e.preventDefault();  window.location.pathname='ModuleF';
                }}  variant="success">Création d'un Module De Formation</button>{' '}
                 
                <button class=" w-100 f5 link dim br3 ph3 pv2 mb2 dib pv3-ns  dib white bg-dark-green" onClick={(e) => {  e.preventDefault();  window.location.pathname='UniteP';
                }}  variant="success">Création d'une Unité Pedagogique </button>{' '}
                <button class="w-100 f5 link dim br3 ph3 pv2 mb2 dib pv3-ns  dib white bg-dark-green" onClick={(e) => {  e.preventDefault();  window.location.pathname='MesUF';
                }}  variant="warning">Visualiser vos Unités d'Enseignement</button>{' '}
               </div>
              </>
              
            </div>

          </div>
        </form>
      </main>
</div>
    )
  }
}

export default Accueil;

