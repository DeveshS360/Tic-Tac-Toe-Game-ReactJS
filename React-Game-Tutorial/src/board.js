import React from 'react';
import Square from './square.js';

class Board extends React.Component {
   
    renderSquare(i,j,winState) { 
      return <Square key={3*i+j} value={this.props.squares[i][j]} win={winState}
      onClick={()=>this.props.onClick(i,j)}/>;
    }


    createGrid(winGrid){
      
      const grid = [];
      for(let i=0;i<3;i++)
        {
          const row = [];
          for(let j=0;j<3;j++)
            {
              let winState=false;
              if(winGrid)
                for(let k=0;k<3;k++)
                  {
                    if(winGrid[k][0]===i && winGrid[k][1]===j)
                      winState=true;
                  }
              row.push(this.renderSquare(i,j,winState));
            }
          grid.push(<div key={i} className="board-row" >{row}</div>);
        }
      return grid;
    }
  
    render() {

      return (
        <div>
          {this.createGrid(this.props.winGrid)}
        </div>
      );
    }
  }

export default Board;