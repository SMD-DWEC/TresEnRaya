import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    constructor(props) {
        super(props);
    }

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

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            turnoX: true,
        };
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}/>;
    }

    handleClick(i)
    {
        //Hago una copia del estado de los cuadrados
        const newSquares = this.state.squares.slice();
        //Cambio el valor de i
        if(this.state.turnoX) newSquares[i] = "X";
        else newSquares[i] = "O";

        if(this.comprobarGanador(newSquares)) {
            console.log("Hay ganador");
        }

        //Cambia el estado de 7, por ejemplo, a una X
        //Al cambiar el estado, como es una prop, notifica al objeto que recibe (internamente a través de un obsever)
        //El estado en react es como en Java, inmutable, es por eso que hacemos una copia
        //de squares y lo cambiamos con la copia, después con setState lo destruimos y lo volvemos a crear
        //ya que es inmutable
        this.setState({squares: newSquares, turnoX: !this.state.turnoX})
    }

    comprobarGanador(estado) {
        const filas = [
            [0,1,2], [3,4,5], [6,7,8], //horizontales
            [0,3,6], [1,4,7], [2,5,8], // verticales
            [0,4,8], [2,4,6], //[8,4,0] //diagonales
        ];
        console.log(estado);
        for(let i=0;i<filas.length;i++){
            console.log(estado[filas[i][0]], estado[filas[i][1]], estado[filas[i][2]]);
            console.log(estado[filas[i][0]] &&
                estado[filas[i][0]] == estado[filas[i,1]] && 
                estado[filas[i,1]] == estado[filas[i,2]]
            )
            if(estado[filas[i][0]] &&
                estado[filas[i][0]] == estado[filas[i,1]] && 
                estado[filas[i,1]] == estado[filas[i,2]]
            )

             return true;
        }
        return false;

    }
  
    render() {
      const status = 'Siguiente jugador: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  