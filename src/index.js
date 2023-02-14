import Hangman, {renderPuzzleAndRemainingGuesses, renderErrorMessage} from './hangman'
import getPuzzle from './requests'


let game
window.addEventListener('keypress', (e) => {
    game.guess(e.key)
    renderPuzzleAndRemainingGuesses(game)
})

const startGame = async () => {
    try {
        const puzzle = await getPuzzle(1)
        game = new Hangman(puzzle, 5)
        renderPuzzleAndRemainingGuesses(game)
    } catch (e) {
        renderErrorMessage()
    }
}

document.querySelector('#reset').addEventListener('click', startGame)
startGame()



