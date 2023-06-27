import { useEffect, useState } from 'react';
import '../styles/main.scss';


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
    /*
    return userLetters
    .filter((eachLetter) => {
      if (word.includes(eachLetter)){
        return <li class="letter"></li>
    
      }
    })
   */
  //cómo lo haríamos con filter? (agrega guión en letras falladas al agregar letra válida)
      return userLetters.map((eachLetter, index) => {
        if (word.includes(eachLetter)) {
          return <li class="letter"></li>; // No se mostrará nada si la letra existe en la palabra
        } else {
          return <li key={index} className="letter">{eachLetter}</li>;
        }
      });
    };
    


  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
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
        <section className={`dummy error-${numberOfErrors}`} >
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
      </main>
    </div>
  );
}

export default App;
