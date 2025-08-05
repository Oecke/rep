const CheckersFigure = ({
    className,
    color,
    index,
    figures,
    setFigures,
    selected,
    setSelected,
    possibleMoves,
    setPossibleMoves
}) => {
    
    function getCheckerMoves(position, isWhite, boardState) {
        const moves = [];
        const row = Math.floor(position / 8);
        const col = position % 8;
        
        // Определяем направление движения в зависимости от цвета и положения шашек
        const directions = isWhite ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const newPos = newRow * 8 + newCol;
                // Проверяем, что клетка пуста (нет ни шашки, ни шахматной фигуры)
                if (!boardState[newPos]) {
                    moves.push(newPos);
                }
            }
        }
        return moves;
    }

    const handleClick = () => {
        if (selected === index) {
            setSelected(null);
            setPossibleMoves([]);
            return;
        }
        const moves = getCheckerMoves(index, color === "white", figures);
        setSelected(index);
        setPossibleMoves(moves);
    };

    return (
        <div className={className} onClick={handleClick}>
            {color === 'white' && '⚪'}
            {color === 'black' && '⚫'}
        </div>
    );
};

export default CheckersFigure;