import '../../App.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

class MesUF extends Component {

  state = {
    options: [],
    loading: true,
    mf: null,
    nom: "",
    up: null,
    success: '',
    message: '',
  }

  async componentDidMount() {
    const url = "http://localhost:7552/mf";
    const response = await fetch(url);


    const data3 = await response.json();
    console.log(data3)
    console.log(this.state.up)
    this.setState({ mf: data3.estArray, up: data3.estArray2, loading: false})

  }
  

createTable = (i) => {
  let table = []

  for (let j = 0; j < this.state.up[i].length; j++) {
    let children = []
    children.push(<p>- {this.state.up[i][j].nom}</p>)
    table.push(<p>{children}</p>)
  }
  

return table
}

  async postData() {
    if (this.state.nom !== '') {
      try {
        const up = this.state.options;
        const nom = this.state.nom;
        const data = { up, nom }
        let result = await fetch('http://localhost:7552/ajouter', {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const data3 = await result.json();
        console.log(data3)
        this.setState({ success: data3.status, message: data3.message })
        setTimeout(() => this.setState({ success: '', message: '' }), 2000);
        console.log(data3.status);
      } catch (e) {
        console.log(e)
      }
    }
  }
  render() {
    var i = 0;
   
    var test = "mf";



    return (

      <div>
        <h1> Vos Unités d'enseignements</h1>

        {this.state.loading || !this.state.mf ?
          (<div> loading... </div>) :
          <div>

            {this.state.success === 'success' ?
              (<p> {this.state.message}</p>) :
              (<p></p>)

            }


            {this.state.mf.map(item =>
              <li key={item.nom} name={test + (i)} value={i} >
               {this.state.mf[i++].nom}  {this.state.up[i-1].length === 0  ? (<p></p>) :  <table>
                <p class = "a"> {this.createTable(i-1)} </p> 
           </table>   }
               
              </li>
            )}
           
           

         
          </div>
        }
          <div>
                  <Button onClick={(e) => {  e.preventDefault();  window.location.pathname='Accueil';
                }} id="margin" variant="success">retour</Button>{' '}
                </div>
      </div>


    );



  }
}
export default MesUF;
