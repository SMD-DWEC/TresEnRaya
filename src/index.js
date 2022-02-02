import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {
          this.props.value
        }
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historial: [
        {
          cuadrados: Array(9).fill(null)
        }
      ],
      siguienteNumero: 0,
      xEsSiguiente: true
    };
  }

  hacerClick(i) {
    const historial = this.state.historial.slice(0, this.state.siguienteNumero + 1);
    const actual = historial[historial.length-1];


    //Hago una copia del estado de los cuadrados
    const nuevosCuadrados = actual.cuadrados.slice();

    if (this.comprobarGanador(nuevosCuadrados) || nuevosCuadrados[i]) {
      return;
    }

    nuevosCuadrados[i] = this.state.xEsSiguiente ? "X" : "O";


    //Cambia el estado de 7, por ejemplo, a una X
    //Al cambiar el estado, como es una prop, notifica al objeto que recibe (internamente a través de un obsever)
    //El estado en react es como en Java, inmutable, es por eso que hacemos una copia
    //de squares y lo cambiamos con la copia, después con setState lo destruimos y lo volvemos a crear
    //ya que es inmutable
    this.setState({
      historial: historial.concat(
        [
          {
            cuadrados: nuevosCuadrados
          }
        ]),
      siguienteNumero: historial.length,
      xEsSiguiente: !this.state.xEsSiguiente
    });
  }

  jumpTo(step) {
    this.setState({
      siguienteNumero: step,
      xEsSiguiente: (step % 2) === 0
    });
  }

    /**
   * Comprueba que hubo 3 en raya
   * @param {*} estado 
   * @returns 
   */
    comprobarGanador(estado) {
      const filas = [
          [0,1,2], [3,4,5], [6,7,8], //horizontales
          [0,3,6], [1,4,7], [2,5,8], // verticales
          [0,4,8], [2,4,6], //[8,4,0] //diagonales
      ];
      for(let i=0;i<filas.length;i++){
          if(estado[filas[i][0]] &&
            estado[filas[i][0]] === estado[filas[i][1]] && 
            estado[filas[i][1]] === estado[filas[i][2]])
              return true;
      }
      return false;
    }

  render() {
    const historial = this.state.historial;
    const actual = historial[this.state.siguienteNumero];
    const ganador = this.comprobarGanador(actual.cuadrados);

    const movimientos = historial.map((paso, movimiento) => {
      const desc = movimiento ?
        'Ir a la posición #' + movimiento :
        'Ir al principio';
      return (
        <li key={movimiento}>
          <button onClick={() => this.jumpTo(movimiento)}>{desc}</button>
        </li>
      );
    });

    let estado;
    if (ganador) {
      estado = "Ganador: " + (this.state.xEsSiguiente ? "O" : "X");
    } else {
      estado = "Siguiente jugador: " + (this.state.xEsSiguiente ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={actual.cuadrados}
            onClick={i => this.hacerClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{estado}</div>
          <ol>{movimientos}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
