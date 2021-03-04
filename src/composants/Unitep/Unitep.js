import React from 'react';
import { Component } from 'react';


class Unitep extends Component {
  state = {
    loading: true,
    up: null,
  }
  async componentDidMount() {
    const url = "http://localhost:7552/nom";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ up: data, loading: false })
    console.log(data);

  }
  render() {

    var i = 0;
    return (

      <div>
        <h1> Ajouter un Module de Formation</h1>
        
        {this.state.loading || !this.state.up ?
          (<div> loading... </div>) :
          <div>
            <p>affichage up</p>
            <form action="/action_page.php">
            <p2> <b> <label htmlFor="nom"> Entrez le nom de l'unité de formation :</label> </b> </p2>
          <input type="texte" id="nom" name="nom" />
            <ul>
              {this.state.up.map(item =>
                <li key={item.id}>
                 <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                 <label for="vehicle1">  {this.state.up[i++].nom}</label>
                </li>
              )}
            </ul>
            <input type="submit" value="Submit"/>
            </form>
          </div>
        }

      </div>


    );
    
    

  }
}
export default Unitep;