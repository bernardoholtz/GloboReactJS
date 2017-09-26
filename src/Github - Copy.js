import React, { Component } from 'react';

const url = 'https://api.github.com/users/bernardoholtz/repos?page=1&per_page=250';
const url2 = 'https://api.github.com/users/bernardoholtz/repos?page=2&per_page=250';
const url3 = 'https://api.github.com/users/bernardoholtz/repos?page=3&per_page=250';
var  urldet = 'https://api.github.com/repos/bernardoholtz/' + sessionStorage.getItem('projeto') ;
class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
	
  }
 	
 
  componentDidMount() {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error("Falha de conexão")
        }

        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          githubData: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
	  
	 fetch(url2)
      .then(response => {
        if (!response.ok) {
          throw Error("Falha de conexão")
        }

        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          githubData2: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
	  
	  fetch(url3)
      .then(response => {
        if (!response.ok) {
          throw Error("Falha de conexão")
        }

        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          githubData3: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
	  
	 
  }
  

  

  render() {
	
    if (this.state.requestFailed) return <p></p>
    if (!this.state.githubData) return <p>Carregando...</p>
	var obj = this.state.githubData;
	obj = obj.concat(this.state.githubData2);
	obj = obj.concat(this.state.githubData3);
	obj.sort(function(a,b) {return (a.stargazers_count < b.stargazers_count) ? 1 : ((b.stargazers_count < a.stargazers_count) ? -1 : 0);} ); 
	var projetos = function(item){
		
		return <li><a onClick={handleClick} href="#">{item.name}</a></li>;
	
	}
	function mostrarDetalhes(param){
		sessionStorage.setItem('projeto',param);
		alert(param);	
	}
	
    return (
      <div className="col-sm-6 dvProjeto">
		<h3>Lista de Projetos</h3>
		<ul className="list-unstyled">
			{obj.map(projetos)}
		</ul>
		
      </div>

    )

  
	function handleClick(param) {
		
		alert((param));
	}


  }
  
  
}



export default GitHub;


