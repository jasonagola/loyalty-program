import React, { useState } from 'react'
import BingoSquare from './bingoSquare';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect } from 'react';
import './board.css'

function Board() {
    const [rows, setRows] = useState(5)
    const [columns, setColumns] = useState(5)
    const [boardData, setBoardData] = useState()
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        //Want to set the CSS variable --windowDimension when the window loads or resizes
        window.addEventListener('resize', setWindowDimensions)
        window.addEventListener('DOMContentLoaded', setWindowDimensions)
    }, [])

    useEffect(() => {
        getBoardData()
    }, [])

    const setWindowDimensions = () => {
        //Get Window Dimensions
        const root = document.querySelector(':root')
        const windowWidth = root.clientWidth
        const windowHeight = root.clientHeight
        
        //Set --windowDimension as the smallest of the window width or heigt
        if (windowWidth <= windowHeight) {
            // console.log(`Window Width is smaller at ${windowWidth} compared to height at ${windowHeight}`)
            root.style.setProperty('--windowDimension', `${windowWidth}px`)
        } else {
            // console.log(`Window Height ${windowHeight} is smaller than window Width ${windowWidth}`)
            root.style.setProperty('--windowDimension', `${windowHeight}px`)
        }
    }

    const getBoardData = async () => {
        // console.log('Trying to get that board game data duh!')
        const options = {
            method:'GET',
            url: '/bingo/boardData'
        }
        const response = await axiosPrivate.request(options)
        try {
            console.log(response)
            setBoardData(response.data)
        } catch(error) {
            console.log(error)
        }

    }

    //Sample Data
    // const boxes = {
    //     1: "Visit a museum",
    //     2: "Try a new type of cuisine",
    //     3: "Take a yoga class",
    //     4: "Go for a hike",
    //     5: "Read a book by a new author",
    //     6: "Learn a new skill",
    //     7: "Try a new hobby",
    //     8: "Watch a classic movie",
    //     9: "Attend a live music performance",
    //     10: "Explore a new city",
    //     11: "Volunteer for a cause",
    //     12: "Attend a sporting event",
    //     13: "Take a dance class",
    //     14: "Visit a new country",
    //     15: "Try a new outdoor activity",
    //     16: "Take a cooking class",
    //     17: "Go stargazing",
    //     18: "Visit a national park",
    //     19: "Attend a theater performance",
    //     20: "Take a language class",
    //     21: "Try a new type of art",
    //     22: "Attend a book club",
    //     23: "Go to a comedy show",
    //     24: "Take a photography class",
    //     25: "Visit a historical site"
    //   };

    const board = []

    for (let i = 1; i <= 25; i++) {
        // board.push(<div key={i} className='squareContainer'><BingoSquare square_id={i} boardData={boardData}/></div>)
        board.push(<BingoSquare key={i} square_id={i} boardData={boardData}/>)
    }

    // for (let i = 0; i <=boxes.length; i++) {
    //     const row = [];
    //     for (let j = 0; j < columns; j++) {
    //         row.push(<div>This is a Square</div>)
    //     }
    //     board.push(<div className='row'>{row}</div>)
    // }

    return(
        <div id='bingoBoard'>
            {board}
        </div>
    )
    
}

export default Board