const CheckersFigure = ({ className, color, index, figures, selected, setSelected, setPossibleMoves, currentTurn }) => {
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

    const handleClick = () => {
        if (currentTurn !== 'checker') {
            return;
        }

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
            {color === 'white' ? '⚪' : '⚫'}
        </div>
    );
};

export default CheckersFigure;
