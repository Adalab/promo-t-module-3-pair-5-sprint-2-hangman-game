import '../styles/components/letters.scss'
const SolutionLetters = ({word, userLetters}) => {

    const renderSolutionLetters = () => {

        const wordLetters = word.split('');
        return wordLetters.map((wordLetter) => {
          if(!userLetters.includes(wordLetter)) {
           return <li class="letter"></li>
          }else{
             return <li class="letter">{wordLetter}</li>
          }
        });
      }

    return (
        <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">{renderSolutionLetters()}
            </ul>
        </div>
    );
}

export default SolutionLetters;