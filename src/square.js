

function Square(props) {

    if(props.win)
      return (
        <button className="square-win" onClick={props.onClick}>
          {props.value}
        </button>
      );
    return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
    
    
  }

export default Square;