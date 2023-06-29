import { useEffect, useState } from 'react';
import '../styles/main.scss';
import Dummy from './Dummy';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Header from './Header';
import SolutionLetters from './SolutionLetters';


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
  /*
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
*/


  return (
    <div className="page">
      <Header/>
      <main className="main">
        <section>
          <SolutionLetters word={word} userLetters={userLetters}/>
          <ErrorLetters word={word} userLetters={userLetters}/>
         <Form handleLastLetter={handleLastLetter}/>
        </section>
        <Dummy numberOfErrors={numberOfErrors}/>
        
      </main>
    </div>
  );
}

export default App;
