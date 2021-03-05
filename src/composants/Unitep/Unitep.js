import React from 'react';
import { Component } from 'react';

class Unitep extends Component {
 
  state = {
    options: [],
    loading: true,
    up: null,
    nom: "",

  }
  
  async componentDidMount() {
    const url = "http://localhost:7552/nom";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ up: data, loading: false })
    console.log(data);
  }
 
  render() {
    console.log(this.state.itemChecked);
    var i = 0;
    var test ="mf" ;
    return (

      <div>
        <h1> Ajouter un Module de Formation</h1>
        
        {this.state.loading || !this.state.up ?
          (<div> loading... </div>) :
          <div>
            <p>affichage up</p>
            
            <p2> <b>  Entrez le nom de l'unité de formation : </b> </p2>
          <input type="texte" value={this.state.name}  name="nom" onChange={(data1)=>{this.setState({nom:data1.target.value})
        
                                                  
        console.log(this.state.nom)
                                                  
                                                  }}/>
            
              {this.state.up.map(item =>
                <li key={item.id}>
                 <input  type="checkbox"  name={test+(i) }  value={this.state.up[i].nom} 
                 
                 onChange={event => {
                    let checked = event.target.checked; console.log(checked);
                    if(checked){
                      this.state.options.push(this.state.up[item.id-1].nom)
                    }
                    if(!checked){
                      this.setState({options: this.state.options.filter(word => word === 'this.state.up[item.id-1].nom') })
                      
                    }
                    console.log(this.state.up[item.id-1].nom)
                    console.log(this.state.options)
                    
                    }}
                 />
                  <label>   {'\u00A0'}  {this.state.up[i++].nom}  </label> 
                </li>
              )}
            
            <input type="submit" value="Submit" />
            
          </div>
        }

      </div>


    );
    
    

  }
}
export default Unitep;

/*
 return (

      <div>
        <h1> Ajouter un Module de Formation</h1>
        
        {this.state.loading || !this.state.up ?
          (<div> loading... </div>) :
          <div>
            <p>affichage up</p>
            <form action="http://localhost:7552/post/">
            <p2> <b>  Entrez le nom de l'unité de formation : </b> </p2>
          <input type="texte" value={this.state.name}  name="nom" onChange={(data1)=>{this.setState({name:data1.target.value})}}/>
            
              {this.state.up.map(item =>
                <li key={item.id}>
                 <input type="checkbox"  name={test+(i) }  value={this.state.up[i].nom}  />
                 <label for="up">   {this.state.up[i++].nom} </label>
                </li>
              )}
            
            <input type="submit" value="Submit" />
            </form>
          </div>
        }

      </div>


    );

*/