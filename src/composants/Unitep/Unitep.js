import React from 'react';
import { Component } from 'react';

class UniteP extends Component {

  state = {
    liens: null,
    options: [],
    loading: true,
    up: null,
    nom: "",
    success: '',
    message: '',
  }

  async componentDidMount() {
    const url = "http://localhost:7552/url";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ liens: data, loading: false })
    console.log(data);
    console.log(this.state.options)

  }
  async postData() {
    if (this.state.nom !== '') {
      try {
        const urls = this.state.options;
        const nom = this.state.nom;
        const data = { urls, nom }
        let result = await fetch('http://localhost:7552/AjouterURl', {
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
        <h1> Ajouter une Unité Pédagogique</h1>

        {this.state.loading || !this.state.liens ?
          (<div> loading... </div>) :
          <div>

            {this.state.success === 'success' ?
              (<p> {this.state.message}</p>) :
              (<p></p>)

            }

            <p2> <b>  Entrez le nom de l'Unité Pédagogique : </b> </p2>
            <input type="texte" value={this.state.name} name="nom" onChange={(data1) => {
              this.setState({ nom: data1.target.value })


              console.log(this.state.nom)

            }} />

            {this.state.liens.map(item =>
              <li key={item.lien}>
                <input type="checkbox" name={test + (i)} value={i}

                  onChange={event => {

                    let checked = event.target.checked;
                    console.log(event.target);
                    if (checked) {
                      this.state.options.push(this.state.liens[event.target.value].lien)
                    }
                    if (!checked) {

                      this.setState({ options: this.state.options.filter(word => word !== this.state.liens[event.target.value].lien) })

                    }

                    console.log(this.state.options)
                  }}
                />
                <label>   {'\u00A0'}  {this.state.liens[i++].lien}  </label>
              </li>
            )}

            <button onClick={() => this.postData()}> ajouter</button>

          </div>
        }

      </div>


    );



  }
}
export default UniteP;