import '../../App.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Logo/Logo';
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

      <div class='ph5 flex flex-column cf pa3'>
      <div>
      <Logo class='db mw5 tc black link dim'/>
         <div class=' w-30 fr'>
           <button  class="  f5 link dim br3 ph3 pv2 mb2 dib pv3-ns  dib white bg-dark-red" onClick={(e) => {  e.preventDefault();  window.location.pathname='Accueil';
         }}   variant="success">retour </button>{' '}
         </div>
         </div>
         <h2 class=" pa4 flex flex-column tc f9 f5-m f1 lh-copy fw5 black-90 mv9  "> Ajouter une Unité Pédagogique</h2>

        {this.state.loading || !this.state.liens ?
          (<div> loading... </div>) :
          <div class='pa3 flex flex-column'>

            {this.state.success === 'success' ?
              (<p> {this.state.message}</p>) :
              (<p></p>)

            }

            <p2 class='pa2 f3 lh-copy'> <b>  Entrez le nom de l'Unité Pédagogique : </b> </p2>
            <input class=" w-40 center pa2 input-reset ba bg-transparent hover-bg-black hover-black"  type="texte" value={this.state.name} name="nom" onChange={(data1) => {
              this.setState({ nom: data1.target.value })


              console.log(this.state.nom)

            }} />
            <div class='ph3 flex flex-column cf pa3 center'>
            {this.state.liens.map(item =>
              <li key={item.lien} class='tc flex items-center mb2 '>
                <input class='mr2 ' type="checkbox" name={test + (i)} value={i}

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
                <label for="name" class="f6 b db mb2">   {'\u00A0'}  {this.state.liens[i++].lien}  </label>
              </li>
            )}
            </div>

            {this.state.success === 'success' ?
              (<p> {this.state.message}</p>) :
              (<p></p>)

            }
            <p2 class='pa2 f3 lh-copy'> <b>  Ajouter un nouveau lien : </b> </p2>
            <input class=" w-40 center ma3 pa2 input-reset ba bg-transparent hover-bg-black hover-black" type="texte" value={this.state.name} name="lien" onChange={(data2) => {
              this.setState({ nomUrl: data2.target.value })


              console.log(this.state.nomUrl)

            }} />
            <button class=" w-20 center white b pv2 ph3 bg-green hover-bg-dark-green bn br2 hover-shadow-inner" onClick={() => this.postData2()}> Ajouter un lien</button>

            <p2 class='pa2 f3 lh-copy'> <b>  Entrez un mot clé  : </b> </p2>
            <input class=" w-40 center pa2 input-reset ba bg-transparent hover-bg-black hover-black" type="texte" value={this.state.name} name="nom" onChange={(data3) => {
              this.setState({ keyword: data3.target.value })

              console.log(this.state.keyword)

            }} />
            <button class=" w-20 ma3 center white b pv2 ph3 bg-green hover-bg-dark-green bn br2 hover-shadow-inner" onClick={() => this.postData3()}> Chercher</button>
            <div class='ph3 flex flex-column cf pa3 center'>
            {this.state.tabCd.map(item =>
              <li key={item.description} class='tc flex items-center mb2 '>
                <input  class='mr2 ' type="checkbox" name={test + (j)} value={j}

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
                <label for="name" class="f6 b db mb2">   {'\u00A0'}  {this.state.tabCd[j++].description}  </label>
              </li>
            )}
           </div>



            <div>
                <button class=" w-20 ma3 center white b pv2 ph3 bg-blue hover-bg-dark-blue bn br2 hover-shadow-inner" onClick={() => this.postData()}> Ajouter l'Unité Pédagogique</button>
            </div>


          </div>
        }


        
      </div>


    );



  }
}
export default UniteP;