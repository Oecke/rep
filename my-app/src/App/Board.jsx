import React, { useState, useEffect } from "react";
import ChessFigure from "./ChessFigure";
import CheckersFigure from "./CherckersFigure";

const Board = () => {
    const [figures, setFigures] = useState(Array(64).fill(null));
    const [selected, setSelected] = useState(null);
    const [possibleMoves, setPossibleMoves] = useState([]);
    
    const [isCheckersWhiteBottom, setIsCheckersWhiteBottom] = useState(true);

    useEffect(() => {
        const arr = Array(64).fill(null);

        if (isCheckersWhiteBottom) {
            
            arr[0] = { type: "chess", figure: "brook", color: "black" };
            arr[1] = { type: "chess", figure: "bknight", color: "black" };
            arr[2] = { type: "chess", figure: "bbishop", color: "black" };
            arr[3] = { type: "chess", figure: "bqueen", color: "black" };
            arr[4] = { type: "chess", figure: "bking", color: "black" };
            arr[5] = { type: "chess", figure: "bbishop", color: "black" };
            arr[6] = { type: "chess", figure: "bknight", color: "black" };
            arr[7] = { type: "chess", figure: "brook", color: "black" };
            for (let i = 8; i < 16; i++) {
                arr[i] = { type: "chess", figure: "bpawn", color: "black" };
            }

            
            const placeCheckers = (rows) => {
                for (let row of rows) {
                    for (let col = 0; col < 8; col++) {
                        if ((row + col) % 2 === 0) {
                            arr[row * 8 + col] = { type: "checker", color: "white" };
                        }
                    }
                }
            };
            placeCheckers([5, 6, 7]);
        } else {
            
            arr[56] = { type: "chess", figure: "wrook", color: "white" };
            arr[57] = { type: "chess", figure: "wknight", color: "white" };
            arr[58] = { type: "chess", figure: "wbishop", color: "white" };
            arr[59] = { type: "chess", figure: "wqueen", color: "white" };
            arr[60] = { type: "chess", figure: "wking", color: "white" };
            arr[61] = { type: "chess", figure: "wbishop", color: "white" };
            arr[62] = { type: "chess", figure: "wknight", color: "white" };
            arr[63] = { type: "chess", figure: "wrook", color: "white" };
            for (let i = 48; i < 56; i++) {
                arr[i] = { type: "chess", figure: "wpawn", color: "white" };
            }

            const placeCheckers = (rows) => {
                for (let row of rows) {
                    for (let col = 0; col < 8; col++) {
                        if ((row + col) % 2 === 0) {
                            arr[row * 8 + col] = { type: "checker", color: "black" };
                        }
                    }
                }
            };
            placeCheckers([0, 1, 2]);
        }
        setFigures(arr);
        setSelected(null);
        setPossibleMoves([]);
    }, [isCheckersWhiteBottom]);

    const fields = [];
    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const isWhite = (row + col) % 2 ? 'white' : 'black';
        const isSelected = selected === i;
        const isMove = possibleMoves.includes(i);

        let cellClass = `field-item_${isWhite}`;
        if (isSelected) cellClass += " selected";
        if (isMove) cellClass += " possible-move";

        const handleCellClick = (index) => {
            if (possibleMoves.includes(index) && selected !== null) {
                const newFigures = [...figures];
                newFigures[index] = newFigures[selected];
                newFigures[selected] = null;
                setFigures(newFigures);
                setSelected(null);
                setPossibleMoves([]);
            }
        };

        fields.push(
            <div
                key={i}
                className={cellClass}
                id={i + 1 + "-field-item"}
                onClick={() => handleCellClick(i)}
            >
                {figures[i]?.type === "checker" &&
                    <CheckersFigure
                        color={figures[i].color}
                        className={figures[i].color === "white" ? "Checkers_white" : "Checkers_black"}
                        index={i}
                        figures={figures}
                        setFigures={setFigures}
                        selected={selected}
                        setSelected={setSelected}
                        possibleMoves={possibleMoves}
                        setPossibleMoves={setPossibleMoves}
                    />
                }
                {figures[i]?.type === "chess" &&
                    <ChessFigure
                        type={figures[i].figure}
                        color={figures[i].color}
                    />
                }
            </div>
        );
    }

    return (
        <>
            <div className="field">
                {fields}
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
                <button onClick={() => setIsCheckersWhiteBottom(v => !v)}>
                    {isCheckersWhiteBottom
                        ? "білі шашки"
                        : "чорні шашки"}
                </button>
            </div>
        </>
    );
};

export default Board;