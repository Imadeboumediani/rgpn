import '../../App.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';


class Accueil extends Component {

  

  
  render() {
    return (



      <main class="pa4 black-80" >


        <form class="measure center">




          <div class="a">Bienvenue dans votre profil Enseignant</div>
          <div class="lh-copy mt3">
            <div className="mb-2">
              <>
                <div>
                  <Button onClick={(e) => {  e.preventDefault();  window.location.pathname='ModuleF';
                }} id="margin" variant="success">Création d'un Module De Formation</Button>{' '}
                </div>
                <Button onClick={(e) => {  e.preventDefault();  window.location.pathname='UniteP';
                }} id="margin" variant="success">Création d'une Unité Pedagogique</Button>{' '}
                <Button onClick={(e) => {  e.preventDefault();  window.location.pathname='MesUF';
                }} id="margin" variant="warning">Visualiser vos Unités d'Enseignement</Button>{' '}
              </>

            </div>

          </div>
        </form>
      </main>

    )
  }
}

export default Accueil;

