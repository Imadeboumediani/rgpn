import React from 'react';
import {Component} from 'react';


class Unitep extends Component {
  state = {
    loading: true,
    up: null,
  }
 async componentDidMount(){
    const url = "http://localhost:7552/nom";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({up : data.properties , loading : false})
    console.log(data.properties);
   
  }
  render() {
    console.log(this.state.up);
      return (
        <div>
          {this.state.loading || !this.state.up ?
          (<div> loading... </div> ) : 
          <div>
            <p>affichage up</p>
            <div>{this.state.up.id}</div> 
            <div>{this.state.up.nom}</div> 
            <div>{this.state.up.idenseignant}</div> 
          </div>
        }
          
        </div>
      );
      /*
    console.log("coucou")
    console.log(this.state.post.properties.id)
    return(
      <main class="pa4 black-80">
        {data.properties.id}
      </main>
    )*/
  }
}
export default Unitep ;
/*class Unitep extends Component {

    constructor(props) {
      super(props);
        this.state = {
          items: [],
          isLoaded: false,
        }
    }
    componentDidMount(){
      fetch ('http://localhost:7552/nom')
        .then(res => res.json())
        .then(json => {
            this.setState({
              isLoaded: true,
              items : json,
            })
        });    
    }

    render(){
      var { isLoaded, items} = this.state;
      
      if(!isLoaded){
       // return <div>Loading...</div>;
      }
      else{
        return(
          <main class="pa4 black-80">
            <div>
              <ul>
                {items.map(item => (
                    <li>key={item.identity}>
                      Nom : {item.nom}
                    </li>
                ))};
              </ul>
                
             </div>
            </main>
        )
      }
    }
}
const Unitep = () => {
    return(
        <main class="pa4 black-80">
  
  </main>

    )
}*/