import { useState, useEffect } from "react";
import ChessFigure from "./ChessFigure";
import CheckersFigure from "./CherckersFigure";

const Board = () => {
    const [figures, setFigures] = useState(Array(64).fill(null));
    const [selected, setSelected] = useState(null);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [isCheckersWhiteBottom, setIsCheckersWhiteBottom] = useState(true);
    const [currentTurn, setCurrentTurn] = useState(isCheckersWhiteBottom ? 'checker' : 'chess');
    const [gameState, setGameState] = useState('playing');
    const [moveCount, setMoveCount] = useState(0);

    const getCheckerMoves = (position, isWhite, boardState) => {
        const moves = [];
        const row = Math.floor(position / 8);
        const col = position % 8;
        
        const directions = isWhite ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
        
        directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const newPos = newRow * 8 + newCol;
                if (!boardState[newPos]) {
                    moves.push({ targetPos: newPos });
                }
            }
        });

        const captureDirections = [
            [-1, -1], [-1, 0], [-1, 1],  
            [0, -1],          [0, 1],    
            [1, -1],  [1, 0],  [1, 1]
        ];
        
        captureDirections.forEach(([dr, dc]) => {
            let newRow = row + dr;
            let newCol = col + dc;
            
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const jumpOverPos = newRow * 8 + newCol;
                const pieceToJump = boardState[jumpOverPos];
                
                if (pieceToJump && pieceToJump.type === 'chess') {
                    newRow = row + dr * 2;
                    newCol = col + dc * 2;
                    
                    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                        const landingPos = newRow * 8 + newCol;
                        if (!boardState[landingPos]) {
                            moves.push({ targetPos: landingPos, capturePos: jumpOverPos });
                        }
                    }
                }
            }
        });
        
        return moves;
    };

    const checkGameEnd = (newFigures) => {
        let chessCount = 0;
        let checkersCount = 0;
        let chessKingAlive = false;
        let checkersCanMove = false;

        for (let i = 0; i < 64; i++) {
            if (newFigures[i]) {
                if (newFigures[i].type === 'chess') {
                    chessCount++;
                    if (newFigures[i].figure === 'bking' || newFigures[i].figure === 'wking') {
                        chessKingAlive = true;
                    }
                } else if (newFigures[i].type === 'checker') {
                    checkersCount++;
                }
            }
        }

        for (let i = 0; i < 64; i++) {
            if (newFigures[i] && newFigures[i].type === 'checker') {
                const moves = getCheckerMoves(i, newFigures[i].color === "white", newFigures);
                if (moves.length > 0) {
                    checkersCanMove = true;
                    break;
                }
            }
        }

        if (!chessKingAlive) {
            setGameState('checkersWin');
            return;
        }

        if (chessCount <= 1) {
            setGameState('checkersWin');
            return;
        }

        if (checkersCount === 0) {
            setGameState('chessWin');
            return;
        }

        if (!checkersCanMove) {
            setGameState('chessWin');
            return;
        }

        if (moveCount > 100) {
            setGameState('draw');
            return;
        }
    };

    const resetGame = () => {
        setGameState('playing');
        setMoveCount(0);
        setSelected(null);
        setPossibleMoves([]);
        setIsCheckersWhiteBottom(v => !v);
        setCurrentTurn(isCheckersWhiteBottom ? 'checker' : 'chess');
    };

    useEffect(() => {
        const arr = Array(64).fill(null);
        
        const chess = isCheckersWhiteBottom ? 
            { pieces: ["brook", "bknight", "bbishop", "bqueen", "bking", "bbishop", "bknight", "brook"], pawn: "bpawn", color: "black", start: 0 } :
            { pieces: ["wrook", "wknight", "wbishop", "wqueen", "wking", "wbishop", "wknight", "wrook"], pawn: "wpawn", color: "white", start: 56 };

        chess.pieces.forEach((piece, i) => {
            arr[chess.start + i] = { type: "chess", figure: piece, color: chess.color };
        });
        
        for (let i = 0; i < 8; i++) {
            arr[chess.start + (chess.start === 0 ? 8 + i : -8 + i)] = { 
                type: "chess", 
                figure: chess.pawn, 
                color: chess.color 
            };
        }

        const checkerRows = isCheckersWhiteBottom ? [5, 6, 7] : [0, 1, 2];
        const checkerColor = isCheckersWhiteBottom ? "white" : "black";
        for (let row of checkerRows) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 0) {
                    arr[row * 8 + col] = { type: "checker", color: checkerColor };
                }
            }
        }

        setFigures(arr);
        setSelected(null);
        setPossibleMoves([]);
        setGameState('playing');
        setMoveCount(0);
    }, [isCheckersWhiteBottom]);



    const handleCellClick = (index) => {
        if (gameState !== 'playing') return;
        
        if (
            figures[index] &&
            (
                (currentTurn === 'chess' && figures[index].type === 'chess') ||
                (currentTurn === 'checker' && figures[index].type === 'checker')
            )
        ) {
            setSelected(index);
            return;
        }

        const moveInfo = possibleMoves.find(move => move.targetPos === index);
        if (moveInfo && selected !== null) {
            const newFigures = [...figures];

            newFigures[index] = newFigures[selected];
            newFigures[selected] = null;

            if (moveInfo.capturePos !== undefined) {
                newFigures[moveInfo.capturePos] = null;
            }

            setFigures(newFigures);
            setSelected(null);
            setPossibleMoves([]);
            setCurrentTurn(currentTurn === 'chess' ? 'checker' : 'chess');
            setMoveCount(prev => prev + 1);


            setTimeout(() => checkGameEnd(newFigures), 100);
        }
    };

    const getGameStatusMessage = () => {
        switch (gameState) {
            case 'chessWin':
                return 'Шахмати перемогли!';
            case 'checkersWin':
                return 'Шашки перемогли!';
            case 'draw':
                return 'Нічия!';
            default:
                return `Хід: ${currentTurn === 'chess' ? '♔ Шахмати' : '⚪ Шашки'}`;
        }
    };

    return (
        <div className="game-container">
            <div className="game-info">
                <div className="status-message">
                    {getGameStatusMessage()}
                </div>
                <div className="game-stats">
                    <div className="stat-item">
                        <span className="stat-label">Ходів:</span>
                        <span className="stat-value">{moveCount}</span>
                    </div>
                </div>
                
                <div className="controls">
                    <button 
                        className="control-btn reset-btn"
                        onClick={resetGame}
                        disabled={gameState === 'playing'}
                    >
                        🔄 Нова гра
                    </button>
                    <button 
                        className="control-btn switch-btn"
                        onClick={() => setIsCheckersWhiteBottom(v => !v)}
                        disabled={gameState !== 'playing'}
                    >
                        {isCheckersWhiteBottom ? "⚪ Білі шашки" : "⚫ Чорні шашки"}
                    </button>
                </div>
            </div>

            <div className="board-container">
                <div className="field">
                    {Array(64).fill(null).map((_, i) => {
                        const row = Math.floor(i / 8);
                        const col = i % 8;
                        const isWhite = (row + col) % 2 ? 'white' : 'black';
                        
                        return (
                            <div
                                key={i}
                                className={`field-item_${isWhite} ${selected === i ? 'selected' : ''} ${possibleMoves.some(move => move.targetPos === i) ? 'possible-move' : ''}`}
                                onClick={() => handleCellClick(i)}
                            >
                                {figures[i]?.type === "checker" && (
                                    <CheckersFigure
                                        color={figures[i].color}
                                        className={`Checkers_${figures[i].color}`}
                                        index={i}
                                        figures={figures}
                                        selected={selected}
                                        setSelected={setSelected}
                                        possibleMoves={possibleMoves}
                                        setPossibleMoves={setPossibleMoves}
                                        currentTurn={currentTurn}
                                    />
                                )}
                                {figures[i]?.type === "chess" && (
                                    <ChessFigure
                                        type={figures[i].figure}
                                        color={figures[i].color}
                                        index={i}
                                        figures={figures}
                                        selected={selected}
                                        setSelected={setSelected}
                                        setPossibleMoves={setPossibleMoves}
                                        currentTurn={currentTurn}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {gameState !== 'playing' && (
                <div className="game-overlay">
                    <div className="game-overlay-content">
                        <h2>{getGameStatusMessage()}</h2>
                        <p>Гра завершена!</p>
                        <button className="control-btn reset-btn" onClick={resetGame}>
                            🎮 Грати знову
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Board;