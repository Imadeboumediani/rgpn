import '../../App.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';


class UniteP extends Component {

  state = {
    liens: null,
    options: [],
    optionsCd: [],
    loading: true,
    up: null,
    nom: "",
    success: '',
    message: '',
    nomUrl: '',
    keyword: '',
    tabCd: [],
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
        const tabCd = this.state.tabCd;
        const data = { urls, nom, tabCd }
        let result = await fetch('http://localhost:7552/AssocierUrl&Cd', {
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

  async postData2() {
    if (this.state.nomUrl !== '') {
      try {
        const nomUrl = this.state.nomUrl;
        const data = { nomUrl, };
        let result = await fetch('http://localhost:7552/AjouterURl', {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const data4 = await result.json();
        console.log(data4);
        this.setState({ success: data4.status, message: data4.message });
        this.componentDidMount();
        setTimeout(() => this.setState({ success: '', message: '' }), 2000);
        console.log(data4.status);
      } catch (e) {
        console.log(e)
      }
    }
  }

  async postData3() {
    if (this.state.keyword !== '') {
      try {
        const keyword = this.state.keyword;
        const data = { keyword, };
        let result = await fetch('http://localhost:7552/cherchercd', {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const data4 = await result.json();
        console.log(data4);
        this.setState({ success: data4.status, message: data4.message });
        this.componentDidMount();
        setTimeout(() => this.setState({ success: '', message: '', tabCd: data4.tabCd }), 2000);
        console.log(data4.status);
      } catch (e) {
        console.log(e)
      }
    }
  }



  render() {
    var i = 0;
    var j = 0;
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
            {this.state.success === 'success' ?
              (<p> {this.state.message}</p>) :
              (<p></p>)

            }
            <p2> <b>  Ajouter un nouveau lien : </b> </p2>
            <input type="texte" value={this.state.name} name="lien" onChange={(data2) => {
              this.setState({ nomUrl: data2.target.value })


              console.log(this.state.nomUrl)

            }} />
            <button onClick={() => this.postData2()}> Ajouter un lien</button>

            <p2> <b>  Entrez un mot clé  : </b> </p2>
            <input type="texte" value={this.state.name} name="nom" onChange={(data3) => {
              this.setState({ keyword: data3.target.value })

              console.log(this.state.keyword)

            }} />
            <button onClick={() => this.postData3()}> Chercher</button>

            {this.state.tabCd.map(item =>
              <li key={item.description}>
                <input type="checkbox" name={test + (j)} value={j}

                  onChange={event => {

                    let checked = event.target.checked;
                    console.log(event.target);
                    if (checked) {
                      this.state.optionsCd.push(this.state.tabCd[event.target.value].description)
                    }
                    if (!checked) {

                      this.setState({ optionsCd: this.state.optionsCd.filter(word => word !== this.state.tabCd[event.target.value].description) })

                    }

                    console.log(this.state.optionsCd)
                  }}
                />
                <label>   {'\u00A0'}  {this.state.tabCd[j++].description}  </label>
              </li>
            )}




            <div>
              <button onClick={() => this.postData()}> Ajouter l'Unité Pédagogique</button>
            </div>


          </div>
        }


        <div>
          <Button onClick={(e) => {
            e.preventDefault(); window.location.pathname = 'Accueil';
          }} id="margin" variant="success">retour</Button>{' '}
        </div>
      </div>


    );



  }
}
export default UniteP;