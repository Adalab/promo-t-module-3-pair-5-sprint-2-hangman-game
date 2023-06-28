import { useEffect, useState } from 'react';
import '../styles/main.scss';
import Dummy from './Dummy';
import Header from './Header';


function App() {
  const [numberOfErrors, setNumberOfError] = useState(0);
  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);

  /*
 const handleClick = (event) => {
    setNumberOfError(numberOfErrors + 1);
  }
*/

useEffect (() => {
fetch ('https://dev.adalab.es/api/random/word')
.then(response => response.json())
.then(wordApi => {
  console.log(wordApi);
  setWord(wordApi.word);
});
}, []);


  const handleLastLetter = (event) => {
    const lastLetterValue = event.target.value.toLowerCase();
    const regex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ€]+$/u; 
    setLastLetter(lastLetterValue);
    if (regex.test(lastLetterValue)) {
     
      console.log('esta letra es valida');
      if (!word.includes(lastLetterValue)) {
        setNumberOfError(numberOfErrors + 1);
      }
      setUserLetters([...userLetters, lastLetterValue]);
    }
    
  };
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

  const renderErrorLetters = () => {
  
      /* opcion sin filter tb funciona. Con el filter sustituiríamos el if de este ejemplo:
      return userLetters.map((eachLetter, index) => {
        if (!word.includes(eachLetter)) {
       
        return <li key={index} className="letter">{eachLetter}</li>;

        }
      });
      */
     return userLetters
      .filter((eachLetter) => !word.includes(eachLetter ))
      .map((eachLetter, index) => <li className="letter" key={index}>{eachLetter}</li>)
    };
    console.log(numberOfErrors);
    console.log(renderErrorLetters());


  return (
    <div className="page">
      <Header/>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">{renderSolutionLetters()}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">{renderErrorLetters()}
              {/*}
              <li className="letter">f</li>
              <li className="letter">q</li>
              <li className="letter">h</li>
              <li className="letter">p</li>
              <li className="letter">x</li>
             */}
            </ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">Escribe una letra:</label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={lastLetter}
              onChange={handleLastLetter}
            />
          </form>
         {/* <button onClick={handleClick} className='sumbtn'>Incrementar</button>*/}
        </section>
        <Dummy numberOfErrors={numberOfErrors}/>
        
      </main>
    </div>
  );
}

export default App;
