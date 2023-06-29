import '../styles/components/letters.scss';

const ErrorLetters = ({word, userLetters}) => {
    const renderErrorLetters = () => {
  
        return userLetters
         .filter((eachLetter) => !word.includes(eachLetter ))
         .map((eachLetter, index) => <li className="letter" key={index}>{eachLetter}</li>)
       };
    return (
        <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">{renderErrorLetters()}
            </ul>
        </div>
    );
}

export default ErrorLetters;