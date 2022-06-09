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
        { value: 123 },
        { value: 456 },
        { value: 789 },
        { value: 147 },
        { value: 258 },
        { value: 369 },
        { value: 159 },
        { value: 357 }
    ]


    const trackClicked = (e, section) => {
        let playerOnePicks = []
        let playerTwoPicks = []
        e.target.disabled = true
        e.target.style.cursor = 'default'
        if (clickedSections.length % 2 === 0) {
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
            if (winningCombos.includes(parseInt(playerOnePicks.sort().join().replaceAll(',', '')))) {
                setGameOver('Player One wins!')
            }
            e.target.firstChild.textContent = 'O'
        } else if (clickedSections[clickedSections.length - 1]) {
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
            e.target.firstChild.textContent = 'X'
            if (winningCombos.includes(parseInt(playerTwoPicks.sort().join().replaceAll(',', '')))) {
                setGameOver('Player Two wins!')
            }
            console.log(parseInt(playerTwoPicks.sort().join().replaceAll(',', '')).contains('1'));
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
            {
                <div className='game-over-message'>{gameOver}</div>}
        </div >
    );
}

export default Home;
