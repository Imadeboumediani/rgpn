import '../../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Logo from '../Logo/Logo';


class ModuleF extends Component {

  state = {
    options: [],
    loading: true,
    up: null,
    nom: "",
    success: '',
    message: '',
  }

  async componentDidMount() {
    const url = "http://localhost:7552/nom";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ up: data, loading: false })
    console.log(data);

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
      
      <div class='ph5 flex flex-column cf pa5'>
             <div>
             <Logo class='db mw5 tc black link dim'/>
                <div class=' w-30 fr'>
                  <button  class="  f5 link dim br3 ph3 pv2 mb2 dib pv3-ns  dib white bg-dark-red" onClick={(e) => {  e.preventDefault();  window.location.pathname='Accueil';
                }}   variant="success">retour </button>{' '}
                </div>
                </div>

                
                
   

        <h2 class=" pa4 flex flex-column tc f9 f5-m f1 lh-copy fw5 black-90 mv9  "> Ajouter un Module de Formation</h2>

        {this.state.loading || !this.state.up ?
          (<div > loading... </div>) :
          <div class='pa3 flex flex-column'> 

            {this.state.success === 'success' ?
              (<p> {this.state.message}</p>) :
              (<p></p>)

            }

            <p2 class='pa2 f3 lh-copy'> <b>  Entrez le nom de l'unité de formation : </b> </p2>
            <input class=" w-40 center pa2 input-reset ba bg-transparent hover-bg-black hover-black  " type="texte" value={this.state.name} name="nom" onChange={(data1) => {
              this.setState({ nom: data1.target.value })


              console.log(this.state.nom)

            }} />
            <div class='ph3 flex flex-column cf pa3 center'>
            {this.state.up.map(item =>
              <li key={item.id} class='tc flex items-center mb2 '>
                <input class='mr2 ' type="checkbox" name={test + (i)} value={i}

                  onChange={event => {
                    console.log(i)
                    let checked = event.target.checked;
                    console.log(event.target);
                    if (checked) {
                      this.state.options.push(this.state.up[event.target.value].nom)
                    }
                    if (!checked) {
                      console.log(i)
                      console.log('hello' + this.state.up[event.target.value].nom)
                      this.setState({ options: this.state.options.filter(word => word !== this.state.up[event.target.value].nom) })

                    }

                    console.log(this.state.options)
                  }}
                />
                <label for="name" class="f6 b db mb2">   {'\u00A0'}  {this.state.up[i++].nom}  </label>
              </li>
            )}
           </div>
           <button class=" w-20 center white b pv2 ph3 bg-green hover-bg-dark-green bn br2 hover-shadow-inner" onClick={() => this.postData()}> AJOUTER</button>

          </div>
        }
          
      </div>


    );



  }
}
export default ModuleF;
