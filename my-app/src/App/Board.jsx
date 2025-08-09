import { useState, useEffect } from "react";
import ChessFigure from "./ChessFigure";
import CheckersFigure from "./CherckersFigure";

const Board = () => {
    const [figures, setFigures] = useState(Array(64).fill(null));
    const [selected, setSelected] = useState(null);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [isCheckersWhiteBottom, setIsCheckersWhiteBottom] = useState(true);
    const [currentTurn, setCurrentTurn] = useState('chess'); 

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
    }, [isCheckersWhiteBottom]);

    const handleCellClick = (index) => {
        
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
        }
    };

    return (
        <>
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
                                    setFigures={setFigures}
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
            <div style={{ textAlign: "center", marginTop: 16 }}>
                <div style={{ marginBottom: 10 }}>
                    Ход: {currentTurn === 'chess' ? 'Шахмати' : 'Шашки'}
                </div>
                <button onClick={() => setIsCheckersWhiteBottom(v => !v)}>
                    {isCheckersWhiteBottom ? "Білі шашки" : "Чорні шашки"}
                </button>
            </div>
        </>
    );
};

export default Board;