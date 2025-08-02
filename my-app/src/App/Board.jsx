import ChessFigure from "./ChessFigure";
import CheckersFigure from "./CherckersFigure";

const Board = () => {
    // Создаем массив фигур по индексам
    const figures = Array(64).fill(null);

    // Расставляем шахматные фигуры
    const placeChessFigures = (color) => {
        if (color === 'white') {
            figures[0] = <ChessFigure type="wrook" color="white" />;
            figures[1] = <ChessFigure type="wknight" color="white" />;
            figures[2] = <ChessFigure type="wbishop" color="white" />;
            figures[3] = <ChessFigure type="wqueen" color="white" />;
            figures[4] = <ChessFigure type="wking" color="white" />;
            figures[5] = <ChessFigure type="wbishop" color="white" />;
            figures[6] = <ChessFigure type="wknight" color="white" />;
            figures[7] = <ChessFigure type="wrook" color="white" />;
            for (let i = 8; i < 16; i++) {
                figures[i] = <ChessFigure type="wpawn" color="white" />;
            }
        } else if (color === 'black') {
            figures[56] = <ChessFigure type="brook" color="black" />;
            figures[57] = <ChessFigure type="bknight" color="black" />;
            figures[58] = <ChessFigure type="bbishop" color="black" />;
            figures[59] = <ChessFigure type="bqueen" color="black" />;
            figures[60] = <ChessFigure type="bking" color="black" />;
            figures[61] = <ChessFigure type="bbishop" color="black" />;
            figures[62] = <ChessFigure type="bknight" color="black" />;
            figures[63] = <ChessFigure type="brook" color="black" />;
            for (let i = 48; i < 56; i++) {
                figures[i] = <ChessFigure type="bpawn" color="black" />;
            }
        }
    };

    const placeCheckersFigures = (color) => {
        if (color === 'white') {
            const rows = [0, 1, 2];
            for (let row of rows) {
                for (let col = 0; col < 8; col++) {
                    if ((row + col) % 2 === 0) {
                        figures[row * 8 + col] = <CheckersFigure color="white" className="Checkers_white" />;
                    }
                }
            }
        } else if (color === 'black') {
            const rows = [5, 6, 7];
            for (let row of rows) {
                for (let col = 0; col < 8; col++) {
                    if ((row + col) % 2 === 0) {
                        figures[row * 8 + col] = <CheckersFigure color="black" className="Checkers_black" />;
                    }
                }
            }
        }
    };

    placeCheckersFigures('black');
    placeChessFigures('white');

    const fields = [];
    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const isWhite = (row + col) % 2 ? 'white' : 'black';
        fields.push(
            <div key={i} className={`field-item_${isWhite}`} id={i + 1 + "-field-item"}>
                {figures[i]}
            </div>
        );
    }

    return (
        <div className="field">
            {fields}
        </div>
    );
};

export default Board;