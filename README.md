# Smart Thinker Chess Engine

## Inspiration
The challenge of creating a sophisticated chess engine that adheres to the intricate rules of chess and offers intelligent gameplay inspired us. We aimed to combine classic strategy with modern technology to enhance the chess experience for players of all levels.

## What it does
Smart Thinker is a chess engine that provides a fully functional chess game with a built-in AI capable of generating and evaluating moves based on established chess rules. It ensures accurate gameplay, including piece movement and captures, and offers intelligent move recommendations through a minimax algorithm with alpha-beta pruning.

## How we built it
We developed Smart Thinker using JavaScript to implement the chess logic and AI. The chess board is displayed in an HTML/CSS interface, while the game logic and move generation are handled by a Web Worker in `engine.js`. This setup allows for smooth and responsive gameplay, with moves being processed and evaluated efficiently.

### Technologies Used
- **HTML/CSS**: For the front-end interface and styling of the chessboard.
- **JavaScript**: For implementing the chess game logic and AI.
- **Web Workers**: For handling AI computations and move evaluations without blocking the main thread.

## Challenges we ran into
- **Complexity of Chess Rules**: Implementing all chess rules and move validations, including special moves like castling, en passant, and pawn promotion, was complex.
- **Move Generation**: Ensuring accurate move generation and capturing logic for all pieces while maintaining performance was challenging.
- **User Interaction**: Synchronizing the chessboard display with the underlying game logic to reflect accurate piece movements and captures required careful handling.

## Accomplishments that we're proud of
- **Accurate Game Play**: Successfully implemented all chess rules, including complex scenarios like castling and en passant.
- **Efficient AI**: Developed a functional AI using the minimax algorithm with alpha-beta pruning, providing intelligent move recommendations.
- **Responsive Design**: Created a user-friendly and responsive chessboard interface that dynamically updates based on user interactions and AI recommendations.

## What we learned
- **In-depth Chess Mechanics**: Gained a deeper understanding of chess rules and how to implement them programmatically.
- **Algorithm Optimization**: Learned how to optimize AI performance using minimax and alpha-beta pruning.
- **Web Worker Integration**: Gained experience in using Web Workers to handle intensive computations without blocking the main thread.

## What's next for Smart Thinker
- **Enhanced AI Features**: Improve the AI with additional features like different difficulty levels and learning capabilities.
- **User Interface Enhancements**: Add more interactive elements, such as move highlighting and undo functionality.
- **Multiplayer Support**: Implement online multiplayer functionality to allow users to compete against each other in real-time.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/smart-thinker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd smart-thinker
    ```
3. Serve the application:
    ```bash
    http-server . -p 8000
    ```

## Usage
1. Open your browser and navigate to `http://localhost:8000`.
2. Click the "Start Game" button to begin playing.

## Contributing
Feel free to submit issues or pull requests. We welcome contributions to improve the game and its features.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any questions or feedback, please contact us at pravallikachejerla@gmail.com
