class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }

    get puzzle() {
        let puzzle = ''
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        return puzzle
    }

    guess(guess) {
        if (this.status !== 'playing') {
            return
        }
        const type = typeof guess
        if (type === 'string') {
            guess = guess.toLowerCase()
            if (!this.guessedLetters.includes(guess)) {
                this.guessedLetters.push(guess)
                if (!this.word.includes(guess)) { this.remainingGuesses-- }
            }
        }
    }

    setStatus() {
        const puzzle = this.puzzle
        if (this.remainingGuesses > 0 && !puzzle.includes('*')) {
            this.status = 'finished'
        }
        else if (this.remainingGuesses === 0) {
            this.status = 'failed'
        }
    }

    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! the word was " ${this.word.join('')} "`
        } else {
            return 'Great work! You guessed the word.'
        }
    }
}

const puzzleElement = document.querySelector('#puzzle')
const errorElement = document.querySelector('body')
const remainingGuessesElement = document.querySelector('#guesses')

const renderPuzzleAndRemainingGuesses = (object) => {

    puzzleElement.innerHTML = ''
    const puzzle = object.puzzle.split('')
    puzzle.forEach((character) => {
        const charElement = document.createElement('span')
        charElement.textContent = character
        puzzleElement.appendChild(charElement)

    })
    object.setStatus()
    remainingGuessesElement.textContent = object.statusMessage
}

const renderErrorMessage = () => {
    puzzleElement.innerHTML = `<div> <h2> An Error has occur</h2> <p>Try again by clicking reset or refresh the page!</p></div>`
}

export {Hangman as default, renderPuzzleAndRemainingGuesses, renderErrorMessage}

