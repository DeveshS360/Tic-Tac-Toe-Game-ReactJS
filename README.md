# Tic-Tac-Toe-Game
Fully functional Tic-Tac-Toe game made from skeleton code available on Tutorial on official reactjs.org website with addtional features added which were mentioned at the end of the Tutorial.

Features which were already available in the Game:
1) History of moves is shown and the user can navigate to any state of the board and can make another move at that point.
2) When X or O wins , the winning message is shown at the top of the screen.
3) The state of grid is stored in 1X9 array
4) All the squares of the grid are rendered by hardcoding their index in the renderSquare function call


Features which I've added:
1) Location of move is stored in a 3X3 grid, in a form of (row,col) in the movement history list
2) The currently selected move from the move list becomes bold
3) A toggle button is added which sorts the list in ascending time and vice versa
4) When someone wins, either X or O, the three squares which makes the winning trio are highlighted
5) When no one wins, the message is shown which says "Game Tied"
6) Made some UI changes to make it look better and more user friendly



# Steps to run the game ( Note: You must have nodejs installed in your machine )
1) create a new React app by the following command : npx create-react-app my-app ( here you can give any other name to your app instead of "my-app" ) 
2) replace the "src" folder of the newly created app with the one given above in the "React-Game-Tutorial" folder
3) To start the app navigate to the app folder and run this command: npm start 

# Deployment
The game is deployed at https://deveshs360.github.io/Tic-Tac-Toe-Game-ReactJS/ 
Have fun! :)
