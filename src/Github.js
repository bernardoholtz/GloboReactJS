import React, { Component } from 'react';
import $ from 'jquery';

const url = 'https://api.github.com/users/globocom/repos?page=1&per_page=250&access_token=6d45d159e41a4c7e5702ef39eca20bb108303b33';
const url2 = 'https://api.github.com/users/globocom/repos?page=2&per_page=250&access_token=6d45d159e41a4c7e5702ef39eca20bb108303b33';
const url3 = 'https://api.github.com/users/globocom/repos?page=3&per_page=250&access_token=6d45d159e41a4c7e5702ef39eca20bb108303b33';
const urlDet = 'https://api.github.com/repos/globocom/' ;
var page = 0;
var totalCommit =0;
var repoName;
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
		
		return <li><a onClick={() => mostrarDetalhes(item.name)} href="#">{item.name}</a></li>;
		
	}

	
    return ( 
	  <div>
		  <div className="col-sm-6 dvProjeto">
			<h3>Lista de Projetos</h3>
			<ul className="list-unstyled">
				{obj.map(projetos)}
			</ul>
		  </div>
		  
		  <div className="col-sm-6 dvDetalhe">
			<div className="cabecalho">
				
			</div>
			<div className="dvCommit">
				
				<ul className="list-unstyled commit">
					
				</ul>
				<button type="button" className="btn btn-primary btn-circle btn-xl btn-det" onClick={() => listarCommits(repoName,"more")}>Mais</button>
			 </div>
		  </div>
	    </div>
	  
    )
	

	function mostrarDetalhes(param){
	 repoName = param;
	 fetch(urlDet + param + '?&access_token=6d45d159e41a4c7e5702ef39eca20bb108303b33')
      .then(response => {
        if (!response.ok) {
          throw Error("Falha de conexão")
        }

        return response
      })
      .then(d => d.json())
      .then(d => {
          
		
			$('.cabecalho_').remove()
			
			$('.cabecalho').append('<div class="cabecalho_"><h3>Detalhes Projetos</h3>' +
				'<p>Nome: ' + d.name + '</p>' +
				'<p>Nº Stars: ' + d.stargazers_count + '</p>' +
				'<p>Nº Forks: ' + d.forks_count +'</p></div>');
			
				
			listarCommits(param,"init");
			
		
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
			
	}
	
	
	


  }
  

  
 
}

  function listarCommits(param,tipo){
		if (tipo === "init") {
			page = 0;
			$('.lsCommit').remove();
		}else {
			page+=1;
		}
		
		var itens = [];
		 $.ajax({
				 type: "GET",
				 url : 'https://api.github.com/repos/globocom/' + param +'/commits?page=' + page +'&per_page=20&access_token=6d45d159e41a4c7e5702ef39eca20bb108303b33',
				 crossDomain: true,
				 cache: false,
				 success: function(data){
					 					 
					  $.each( data, function( key, val ) {
						itens.push(val);
					  });
					 
					  for (var i=0; i<itens.length;i++){
						var html;
						 if (itens[i].author != null){
							 html = '<li class="lsCommit"><div class="userInfo">' +
									'<img class="avatar" src=' + itens[i].author.avatar_url +'/>' +
									'<p>Nome: ' + itens[i].commit.author.name +'</p>'	+
									'<p>Data: ' + itens[i].commit.committer.date +'</p>' +	
									'<p class="msg">Mensagem: ' + itens[i].commit.message +'</p></div></li>';
												
						 }else{
						     html = '<li class="lsCommit"><div class="userInfo">' +
									'<p>Nome: ' + itens[i].commit.author.name +'</p>'	+
									'<p>Data: ' + itens[i].commit.committer.date +'</p>' +	
									'<p class="msg">Mensagem: ' + itens[i].commit.message +'</p></div>';
						 };	
						$('.commit').append(html);
					  };
					  
					  if (itens.length < 20){ $('.btn-det').css('display','none')} else {$('.btn-det').css('display','block');}
					
					
				 }
		});
	}	



export default GitHub;


