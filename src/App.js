import styled from 'styled-components'
import './App.css';
import Container from './Container'

const Nav = styled.div`
  font-size: 1rem;
  background-color: black;
  width: 100%;
  height: 60px;
  padding-top: 2%;
  padding-bottom: 2%;
  border-bottom: 1px solid green;
`
const ButtonGrayscale = styled.button`
  width: 10%;
  display: inline;
  background-color: black;
  border: 2px solid green;
  height: 40px;
  border-radius: 20px;
  color: grey;
  line-height: 35px;
  cursor: pointer;

  &:hover{
    text-transform: uppercase;
    width: 11%
  }
`


const ButtonBlur = styled(ButtonGrayscale)`
  margin-left: 5%
`

function App() {
  return (
    <div className="App">
      <Nav>
      <ButtonGrayscale>grayscale</ButtonGrayscale >
      <ButtonBlur>blur</ButtonBlur>
      </Nav>
      <Container/>
    </div>
  );
}

export default App;
