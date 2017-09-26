import React, { Component } from 'react';
import $ from 'jquery';
const url = 'https://api.github.com/repos/bernardoholtz/GloboReactJS' ;
const urlCommit = 'https://api.github.com/repos/bernardoholtz/GloboReactJS/commits?page=1&per_page=20';

var page = 1;
var totalCommit =0;
class GitHubDet extends Component {
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
	  
	 fetch(urlCommit)
      .then(response => {
        if (!response.ok) {
          throw Error("Falha de conexão")
        }

        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          githubCommit: d
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

	
	var commits = function(item){
		
		if (item.author != null){
			return <li>
				<div className="userInfo">
					<img className="avatar" src={item.author.avatar_url} />
					<p>Nome: {item.commit.author.name}</p>	
					<p>Data: {item.commit.committer.date}</p>	
					<p className="msg">Mensagem: {item.commit.message}</p>	
								
				</div>
			</li>;
		}else{
			return <li>
				<div className="userInfo">
					<p>Nome: {item.commit.author.name}</p>	
					<p>Data: {item.commit.committer.date}</p>	
					
								
				</div>
			</li>;
		}
		
	}

	
	
    return (
      <div className="col-sm-6 dvDetalhe">
		<div className="cabecalho">
			<h3>Detalhes Projetos</h3>
			<p>Nome: {this.state.githubData.name}</p>
			<p>Nº Stars: {this.state.githubData.stargazers_count}</p>
			<p>Nº Forks: {this.state.githubData.forks_count}</p>
		
		</div>
		<div className="dvCommit">
			<h4>Lista de Commits</h4>
			<ul className="list-unstyled commit">
				{this.state.githubCommit.map(commits)}
				
			</ul>
			<button type="button" className="btn btn-primary btn-circle btn-xl btn-det" onClick={() => mostrarMais()}>Mais</button>
		</div>
		
      </div>

    )
	
	function mostrarMais(){
		 page = page +1;
		 var itens = [];
		 
		 $(document).ready(function() {
				$.getJSON( 'https://api.github.com/repos/bernardoholtz/' +  sessionStorage.getItem('projeto') +'/commits?page=' + page +'&per_page=20', function( data ) {
				  
				  $.each( data, function( key, val ) {
					itens.push(val);
				  });
				 
				  for (var i=0; i<itens.length;i++){
					
					 if (itens[i].author != null){
						var html = '<li><div class="userInfo">' +
								'<img class="avatar" src=' + itens[i].author.avatar_url +'/>' +
								'<p>' + 'Nome: ' + itens[i].commit.author.name +'</p>'	+
								'<p>' + 'Data: ' + itens[i].commit.committer.date +'</p>' +	
								'<p>' + 'Mensagem: ' + itens[i].commit.message +'</p></div></li>';
											
					 }else{
						var html = '<li><div class="userInfo">' +
								'<p>' + 'Nome: ' + itens[i].commit.author.name +'</p>'	+
								'<p>' + 'Data: ' + itens[i].commit.committer.date +'</p>' +	
								'<p>' + 'Mensagem: ' + itens[i].commit.message +'</p></div></li>';
					 };	
					$('.commit').append(html);
				  };
				  if (itens.length < 20) $('.btn-det').css('display','none');
				});
		  });
		 
	}

  }
  
  
}
obterTotalCommit();
function obterTotalCommit(){

	 
	  $(document).ready(function() {
		 var totais = []; 
	 	 $.ajax({
				 type: "GET",
				 url : 'https://api.github.com/repos/bernardoholtz/GloboReactJS/stats/contributors',
				 crossDomain: true,
				 cache: false,
				 success: function(data){
					 
					try{
						totais = data;
						if (totais == undefined) {
							alert('Não há lista de commits')
							return;
						}
					
						var tmr = setInterval(function() {
							for (var i=0; i<totais.length;i++){
							  totalCommit = totalCommit + totais[i].total;
							}
							//alert(totalCommit)
							clearInterval(tmr);
							if (totalCommit ==0)	{
								//alert(totais.length);
								obterTotalCommit()
							}
							if (totalCommit >=20) $('.btn-det').css('display','block');
							
							
						},1000);
					}catch(ex){
						alert(ex.message + ' ' + totais)
					}
					
					
				 }
		});
	   });
}



export default GitHubDet;


