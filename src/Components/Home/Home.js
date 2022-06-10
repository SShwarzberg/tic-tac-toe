import './Home.css'
import sectionsData from '../../data/sections.json'
import { useState } from 'react'

const Home = () => {
    const [sections, setSections] = useState(sectionsData[0].sections)
    const [gameOver, setGameOver] = useState(null)
    const playerOne = 'X'
    const playerTwo = 'O'
    let playerOneArray = []
    let playerTwoArray = []
    let clickedSections = []
    const winningCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

    const checkIfWon = (playerOnePicks, playerPiece) => {
        winningCombos.map(items => {
            let containsAll
            containsAll = items.every(element => {
                return playerOnePicks.includes(element)
            })
            if (containsAll === true) {
                setGameOver(`Game Over! ${playerPiece} Wins!`)
            }
        })
    }

    const setFinalArray = (playerOnePicks, section) => {
        clickedSections.push({
            "id": section.id,
            "value": playerOne
        })
        playerOneArray.push({
            "id": section.id + 1,
            "value": playerOne
        })
        playerOneArray.map(item => {
            const playerOnePick = item.id
            playerOnePicks.push(playerOnePick)
        })
    }

    const setFinalArrayX = (section, playerTwoPicks) => {
        clickedSections.push({
            "id": section.id,
            "value": playerTwo
        })
        playerTwoArray.push({
            "id": section.id + 1,
            "value": playerTwo
        })
        playerTwoArray.map(item => {
            const playerTwoPick = item.id
            playerTwoPicks.push(playerTwoPick)
        })
    }

    const trackClicked = (e, section) => {
        let playerOnePicks = []
        let playerTwoPicks = []
        let playerPiece
        e.target.disabled = true
        e.target.style.cursor = 'default'
        if (clickedSections.length % 2 === 0) {
            playerPiece = 'O'
            e.target.firstChild.textContent = playerPiece
            setFinalArray(playerOnePicks, section)
            checkIfWon(playerOnePicks, playerPiece)
        } else if (clickedSections[clickedSections.length - 1]) {
            playerPiece = 'X'
            e.target.firstChild.textContent = playerPiece
            setFinalArrayX(section, playerTwoPicks)
            checkIfWon(playerTwoPicks, playerPiece)
        }
    }

    return (
        <div className="Home">
            <h2>Tic Tac Toe</h2>
            <div className="tic-tac-toe-board" >
                {sections.map(section => (
                    <button className='section' key={section.id} onClick={(e) => {
                        trackClicked(e, section)
                    }}>
                        <div className='x-and-o'></div>
                    </button>
                ))}
            </div>
            {gameOver &&
                <div className='game-over-message'>{gameOver}</div>}
        </div >
    );
}

export default Home;
