const CheckersFigure = ({ color }) => {


    return (
        <div className={`checker_checker-${color}`}>
            {color === 'white' && '⚪'}
            {color === 'black' && '⚫'}
        </div>
    )
}

export default CheckersFigure;