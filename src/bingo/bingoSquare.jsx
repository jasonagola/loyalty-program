import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './bingoSquare.css'

function BingoSquare(props) {
    const boardData = props.boardData
    const square_id = props.square_id

    const [squareData, setSquareData] = useState({})

    useEffect(() => {
        getSquareData()
    }, [square_id, boardData])

    const getSquareData = () => {
        if(boardData && square_id)
        for (let i = 0; i < boardData.length; i++) {
            if (boardData[i].square_id === square_id) {
              setSquareData(boardData[i])
            }
        }
    }
    
    const handleDetails = () => {

    }

    return (
        <div className='bingoSquare'>
            <h2>{squareData.title}</h2>
            <p>{squareData.short_description}</p>
            {/* <p>Description: {squareData.description}</p> */}
            <Link to={`/bingoSquare/${square_id}`}></Link>
        </div>

    )
}

export default BingoSquare
