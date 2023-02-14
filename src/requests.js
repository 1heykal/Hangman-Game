const getPuzzle = async (numOfWords) => {

    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${numOfWords}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error()
    }
}

export {getPuzzle as default}