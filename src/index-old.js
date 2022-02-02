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
      return <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />;
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
          squares: Array(9).fill(null),
        }
      ],
      siguienteNumber: 0,
      xEsSiguiente: true
    };
  }

  hacerClick(i)
  {
    const historial = this.state.historial.slice(0, this.state.siguienteNumber + 1);
    const actual = historial[historial.length-1];


    //Hago una copia del estado de los cuadrados
    const newSquares = actual.squares.slice();
    console.log(newSquares);


    if(this.comprobarGanador(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = this.state.xEsSiguiente ? "X" : "O";


    //Cambia el estado de 7, por ejemplo, a una X
    //Al cambiar el estado, como es una prop, notifica al objeto que recibe (internamente a través de un obsever)
    //El estado en react es como en Java, inmutable, es por eso que hacemos una copia
    //de squares y lo cambiamos con la copia, después con setState lo destruimos y lo volvemos a crear
    //ya que es inmutable
    this.setState({
      historial: historial.concat(
        [
          {
            squares: newSquares
          }
        ]),
      siguienteNumber: historial.length,
      turnoX: !this.state.turnoX
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

  jumpTo(paso) {
    this.setState({
      siguienteNumber: paso,
      xEsSiguiente: (paso % 2) === 0
    });
  }

  render() {

    const historial = this.state.history;
    const actual = historial[this.state.siguienteNumber];

    //const ganador = this.comprobarGanador(actual.squares);


    const movimientos = historial.map((paso, movim) => {
        let desc = null;
        if(movim) desc = "Se mueve a #" + movim;
        else desc = "Va al principio";
        
        return (
          <li key={movim}>
            <button onClick={() => this.jumpTo(movim)}>{desc}</button>
          </li>
        )
    });


    let estado;
    //Hago una copia del estado de los cuadrados
    //const newSquares = this.state.squares.slice();

    /*if(ganador) {
      estado = "Ganador: " + this.state.history.squares[0];
    } else {
      estado = "Siguiente jugador: " + (this.state.xEsSiguiente ? "X" : "O");
    }*/


    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={actual.squares}
          onClick={i => this.hacerClick(i)}/>
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
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  