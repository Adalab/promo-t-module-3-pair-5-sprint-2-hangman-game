import '../styles/components/form.scss'
const Form = (props) => {
    
   
return (
<form className="form">
    <label className="title" htmlFor="last-letter">Escribe una letra:</label>
    <input
      autoComplete="off"
      className="form__input"
      maxLength="1"
      type="text"
      name="last-letter"
      id="last-letter"
      value={props.lastLetter}
      onChange={props.handleLastLetter}
    />
  </form>
);
}

export default Form;