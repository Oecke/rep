const CheckersFigure = ({ className, color, index, figures, selected, setSelected, setPossibleMoves }) => {
    const getCheckerMoves = (position, isWhite, boardState) => {
        const moves = [];
        const row = Math.floor(position / 8);
        const col = position % 8;
        
        const directions = isWhite ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
        

        const captureDirections = [
            [-1, -1], [-1, 0], [-1, 1],  
            [0, -1],          [0, 1],    
            [1, -1],  [1, 0],  [1, 1]
        ];
        

        directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const newPos = newRow * 8 + newCol;
                if (!boardState[newPos]) {
                    moves.push(newPos);
                }
            }
        });

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
                            moves.push(landingPos);
                        }
                    }
                }
            }
        });
        
        return moves;
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (selected === index) {
            setSelected(null);
            setPossibleMoves([]);
            return;
        }
      
        const moves = getCheckerMoves(index, color === "white", figures);
        

        const movesWithCaptures = moves.map(targetPos => {
            const startRow = Math.floor(index / 8);
            const startCol = index % 8;
            const endRow = Math.floor(targetPos / 8);
            const endCol = targetPos % 8;
            
            if (Math.abs(endRow - startRow) === 2 || Math.abs(endCol - startCol) === 2) {
                const jumpRow = (startRow + endRow) / 2;
                const jumpCol = (startCol + endCol) / 2;
                const jumpPos = Math.floor(jumpRow * 8 + jumpCol);
                return { targetPos, capturePos: jumpPos };
            }
            return { targetPos };
        });

        setSelected(index);
        setPossibleMoves(movesWithCaptures);
    };

    return (
        <div className={className} onClick={handleClick}>
            {color === 'white' ? '⚪' : '⚫'}
        </div>
    );
};

export default CheckersFigure;
