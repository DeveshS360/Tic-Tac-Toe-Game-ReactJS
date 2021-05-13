import React from 'react';
import Board from './board.js';

class Game extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        history:[
          {squares:Array(3).fill(null).map(x => x = new Array(3).fill(null))
          }
        ],
        XChance:true,
        stepNo:0,
        reverseStepNo:0,
        reverseHistory:[
            {squares:Array(3).fill(null).map(x => x = new Array(3).fill(null))
            }
        ],
        sortedReverse:false
      }
        
    }


    handleClick= (i,j)=>{
      var his = this.state.history.slice(0,this.state.stepNo+1);
      const current = his[his.length-1];
      const square = JSON.parse(JSON.stringify(current.squares));

      const win = Winner(square);
      if(win.won){
        return ;
      }
      else if(square[i][j])
        return ;

      square[i][j] = this.state.XChance ? 'X' : 'O';
      
      const step = his.length;
      his = his.concat({squares:square});
      const rev = JSON.parse(JSON.stringify(his));
      rev.reverse();
      
      this.setState({history:his,XChance:!this.state.XChance,stepNo:step,reverseHistory:rev});
      
      
      
    
    }


    jumpTo=(moveNo)=>{
      this.setState({stepNo:moveNo,XChance:(moveNo%2) === 0});
       
    }

    jumpReverseTo=(moveNo)=>{
        this.setState({reverseStepNo:moveNo,XChance:(moveNo%2)===0});
    }

    handleToggle = ()=>{
        this.setState({sortedReverse:!this.state.sortedReverse});
    }


    render() {

      const history = this.state.history;
      const revHistory = this.state.reverseHistory;
      
      const current = history[this.state.stepNo];
      
      
      const win = Winner(current.squares);
      const isTied = Tie(current.squares);

      const currTurn = this.state.XChance?'X':'O';
      let moves = null;
      if(this.state.sortedReverse===false){
         moves = history.map((curr,moveNo)=> {
            
            const desc = moveNo ? 'Go to move #' + moveNo : 'Go to start';
            return (
            <li key={moveNo}> 
                <button className={`click${this.state.stepNo===moveNo ? " bold" : ""}`}  onClick={()=>{this.jumpTo(moveNo)}}>{desc} </button>
            </li>
            )
        })
      }
      else
        {
            moves = revHistory.map((curr,moveNo)=>{

                const val = revHistory.length-1-moveNo;
                const desc = moveNo!==revHistory.length-1 ? 'Go to move #' + val : 'Go to start';
                return (
                    <li key={moveNo}> 
                        <button className={`click${this.state.stepNo===val ? " bold" : ""}`}  onClick={()=>{this.jumpTo(val)}}>{desc} </button>
                    </li>
                    )
            })
        }


      let status;
      if(win.won){
        status = win.won + ' Won, Game Over!';
      }
      else if(isTied){
        status = 'Game tied!';
      }
      else
        {
          status = 'Next Player: '+currTurn;
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
            onClick={(i,j)=>{this.handleClick(i,j)}} winGrid={win.winGrid}/>
            
            <button className='toggle' onClick={()=>{this.handleToggle()}}>Toggle History</button>
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol style={{listStyle:"none"}}>{moves}</ol>
          </div>
        </div>  
      );
    }
  }
  
  function Tie(sq)
    {
      
      for(let i=0;i<3;i++)
        for(let j=0;j<3;j++)
          if(sq[i][j]===null)
            return false;

      return true;
    }

  function Winner(sq){

    const winner = {won:null,winGrid:null};

    

    for(let i=0;i<3;i++)
      {
        for(let j=0;j<3;j++)
          {
            if(sq[i][j]===null)
              continue;
            const cnt1=[],cnt2=[],cnt3=[],cnt4=[];
            cnt1.push([i,j]);
            cnt2.push([i,j]);
            cnt3.push([i,j]);
            cnt4.push([i,j]);
            if(j+1<3 && sq[i][j]===sq[i][j+1])
              cnt1.push([i,j+1]);
            if(j-1>=0 && sq[i][j]===sq[i][j-1])
              cnt1.push([i,j-1]);
            if(i+1<3 && sq[i][j]===sq[i+1][j])
              cnt2.push([i+1,j])
            if(i-1>=0 && sq[i][j]===sq[i-1][j])
              cnt2.push([i-1,j])
            if(i+1<3 && j+1<3 && (sq[i][j]===sq[i+1][j+1]))
              cnt3.push([i+1,j+1]);
            if(i-1>=0 && j-1>=0 && (sq[i][j]===sq[i-1][j-1]))
              cnt3.push([i-1,j-1]);
            if(i-1>=0 && j+1<3 && (sq[i][j]===sq[i-1][j+1]))
              cnt4.push([i-1,j+1])
            if(i+1<3 && j-1>=0 && (sq[i][j]===sq[i+1][j-1]))
              cnt4.push([i+1,j-1]);
            if(cnt1.length===3 || cnt2.length===3 || cnt3.length===3 || cnt4.length===3){
              
              winner.won=sq[i][j];
            }
            if(cnt1.length===3)
              {
                winner.winGrid=cnt1;
              }
            else if(cnt2.length===3)
              {
                winner.winGrid=cnt2;
              }
            else if(cnt3.length===3)
              {
                winner.winGrid=cnt3;
              }
            else if(cnt4.length===3)
              {
                winner.winGrid=cnt4;
              }
            

          }
      }

    return winner;

}

export default Game;

