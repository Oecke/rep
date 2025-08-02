

const ChessFigure = ({ type, color }) => {

  return (
    <div className={`pawn_pawn-${color}_pawn-${type}`}>
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
}

export default ChessFigure;