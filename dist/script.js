class Jogo extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "game" },

      React.createElement("div", { className: "game-board" },
      React.createElement(Tabuleiro, null)),


      React.createElement("div", { className: "game-info" },
      React.createElement("span", { className: "game-history" }),

      React.createElement("ol", null))));





  }}




class Tabuleiro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true };

  }


  render() {
    const vencedor = calculateWinner(this.state.quadrados);
    const status = vencedor ? 'Vencedor: ' + vencedor : 'Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
    return (
      React.createElement("div", null,
      React.createElement("button", { class: "btn", onClick: () => this.reset() }, "Reiniciar"),
      React.createElement("button", { class: "btn", onClick: () => this.autoPlay() }, "Jogada Autom\xE1tica"),
      React.createElement("div", { class: "jogadorDaVez" }, status),

      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2)),


      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)),


      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8))));




  }

  renderizarQuadrado(i) {
    return (
      React.createElement(Quadrado, {
        value: this.state.quadrados[i],
        onClick: () => this.handleClick(i) }));


  }

  handleClick(i) {

    const quadrados = this.state.quadrados.slice();
    if (calculateWinner(quadrados)) {
      alert('Jogo já acabou');
      return;
    }
    if (quadrados[i]) {
      alert('Quadrado ocupado!');
      return;
    }
    quadrados[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }

  //jogada automatica
  autoPlay()
  {
    const quadrados = this.state.quadrados.slice();


    if (calculateWinner(quadrados)) {

      alert('Jogo já acabou');

      return;

    } else

    {

      let autoPlayer = false;
      while (!autoPlayer)
      {
        console.log(autoPlayer);
        let autoPlayPosicao = random();
        console.log(autoPlayPosicao);
        console.log(quadrados[autoPlayPosicao]);
        if (!quadrados[autoPlayPosicao])
        {
          quadrados[autoPlayPosicao] = this.state.xIsNext ? 'X' : 'O';
          autoPlayer = true;
          console.log(autoPlayer);

          console.log(quadrados);
          this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
        }
      }
    }

  }

  //limpa
  reset() {
    this.setState({
      quadrados: Array(9).fill(null),
      xIsNext: true });

  }}


class Quadrado extends React.Component {

  /*constructor (props){
                                          super (props);
                                          this.state = {
                                            value: null
                                          }
                                        }*/

  render() {
    return (
      React.createElement("button", {
        className: "square",
        onClick: this.props.onClick },

      this.props.value));


  }}


/*function Quadrado(props) {
       return (
         <button className="square" onClick={props.onClick}>
           {props.value}
         </button>
       );
     }*/


function calculateWinner(quadrados) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c])
    return quadrados[a];
  }
  return null;
}

function random()
{
  let number = Math.floor(10 * Math.random() - 2);

  if (number < 0)
  {
    return 0;
  } else

  return number;

}

ReactDOM.render(

React.createElement(Jogo, null),

document.getElementById('root'));







/*ReactDOM.render(
                                    <Tabuleiro quadrados={Array(9).fill().map((v, pos) => pos)} />,
                                    document.getElementById("root")  
                                  );*/

/*ReactDOM.render(
                                         <Quadrado onClick={() => alert("Clicou!")} value={2 + 2} />,
                                         document.getElementById("root")
                                       );*/