const ChessFigure = ({ type, color, index, figures, selected, setSelected, setPossibleMoves, currentTurn }) => {

  const getChessMoves = (position) => {
    const moves = [];
    const row = Math.floor(position / 8);
    const col = position % 8;
    const addMove = (newRow, newCol) => {
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const newPos = newRow * 8 + newCol;
        if (!figures[newPos] || figures[newPos].type === 'checker') {
          moves.push({ targetPos: newPos });
        }
      }
    };


    if (type.endsWith('pawn')) {
      const direction = color === 'white' ? -1 : 1;
      const startRow = color === 'white' ? 6 : 1;
      if (!figures[(row + direction) * 8 + col]) {
        addMove(row + direction, col);
        if (row === startRow && !figures[(row + direction * 2) * 8 + col]) {
          addMove(row + direction * 2, col);
        }
      }
      [-1, 1].forEach(offset => {
        const newCol = col + offset;
        const newRow = row + direction;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const newPos = newRow * 8 + newCol;
          if (figures[newPos]?.type === 'checker') {
            moves.push({ targetPos: newPos });
          }
        }
      });
    }
    if (type.endsWith('knight')) {
      const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      knightMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc));
    }
    if (type.endsWith('bishop')) {
      const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
      directions.forEach(([dr, dc]) => {
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (!figures[r * 8 + c]) {
            addMove(r, c);
          } else if (figures[r * 8 + c].type === 'checker') {
            addMove(r, c);
            break;
          } else {
            break;
          }
          r += dr;
          c += dc;
        }
      });
    }
    if (type.endsWith('rook')) {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      directions.forEach(([dr, dc]) => {
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (!figures[r * 8 + c]) {
            addMove(r, c);
          } else if (figures[r * 8 + c].type === 'checker') {
            addMove(r, c);
            break;
          } else {
            break;
          }
          r += dr;
          c += dc;
        }
      });
    }
    if (type.endsWith('queen')) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      directions.forEach(([dr, dc]) => {
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          if (!figures[r * 8 + c]) {
            addMove(r, c);
          } else if (figures[r * 8 + c].type === 'checker') {
            addMove(r, c);
            break;
          } else {
            break;
          }
          r += dr;
          c += dc;
        }
      });
    }
    if (type.endsWith('king')) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      directions.forEach(([dr, dc]) => addMove(row + dr, col + dc));
    }
    return moves;
  };

  const handleClick = () => {
    
    if (currentTurn !== 'chess') return;

    if (selected === index) {
      setSelected(null);
      setPossibleMoves([]);
      return;
    }
    const moves = getChessMoves(index);
    setSelected(index);
    setPossibleMoves(moves);
  };

  return (
    <div className={`pawn_pawn-${color}_pawn-${type}`} onClick={handleClick}>
      {type === 'bking' && '♚'}
      {type === 'bqueen' && '♛'}
      {type === 'brook' && '♜'}
      {type === 'bbishop' && '♝'}
      {type === 'bknight' && '♞'}
      {type === 'bpawn' && '♟'}
      {type === 'wking' && '♔'}
      {type === 'wqueen' && '♕'}
      {type === 'wrook' && '♖'}
      {type === 'wbishop' && '♗'}
      {type === 'wknight' && '♘'}
      {type === 'wpawn' && '♙'}
    </div>
  );
};

export default ChessFigure;
