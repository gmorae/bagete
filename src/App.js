import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


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
    }
  };

  format = value => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  render() {
    return (
      <div>
        <ToastContainer />
        <h5>Total em reais até agora: {this.format(this.state.totalReais)}</h5>
        <h5>Total em unidades até agora: {this.state.totalBaguete}</h5>
        <main id="app">
          <form onSubmit={this.up}>
            <input type="text" placeholder="Quantidade" onChange={e => this.setState({ qtd: e.target.value })} />
            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    )
  }
}

export default App