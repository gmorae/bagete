import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { get } from './services/getData'
import { post } from './services/post'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      post: {
        qtd: 0
      },
      valorBaguete: 0,
      totalReais: 0,
      totalBaguete: 0,
      dados: []
    }
  }

  componentDidMount = async () => {
    const retorno = await get()
    const dados = retorno.data;
    this.setState({ dados: dados.data });
    this.setState({ totalReais: dados.total });
    this.setState({ totalBaguete: dados.qtd });
  }


  up = async e => {
    e.preventDefault();
    const { qtd, totalReais, totalBaguete } = this.state;
    let { valorBaguete } = this.state

    qtd >= 3 ? valorBaguete = 6 : valorBaguete = 7

    let value = qtd * valorBaguete

    if (!qtd) {
      toast.error('Preencha o campo')
    } else {
      this.setState({ totalReais: totalReais + value })
      this.setState({ totalBaguete: totalBaguete + +qtd })
      document.querySelector('#app input').value = ''
      toast.success('Cadastrado com sucesso')
      let total = value      
      post(qtd, total)
    }
  };

  format = value => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  formatDecimal = value => Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(value)

  render() {
    return (
      <div className="container col-md-6 mt-5">
        <ToastContainer />
        <div className="d-flex justify-content-between mb-3">
          <h5>Total em reais até agora: {this.format(this.state.totalReais)}</h5>
          <h5>Total em unidades até agora: {this.formatDecimal(this.state.totalBaguete)}</h5>
        </div>
        <main id="app">
          <form onSubmit={this.up}>
            <input type="text" className="form-control mb-2" placeholder="Quantidade" onChange={e => this.setState({ qtd: e.target.value })} />
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </main>
      </div>
    )
  }
}

export default App