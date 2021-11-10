export const firstLetterToCaps = (sentence) => {
    const wordsArray = sentence.split(' ')
    const modifiedArray = wordsArray.map(word => word[0].toUpperCase() + word.slice(1))
    
    return modifiedArray.join(' ')
}
