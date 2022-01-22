import styled from 'styled-components'
import Todo from './Todo'

const Main = styled.main`
  font: 16px 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 18px);
  margin: 0;
  padding: 0;
  background-color: #d5d5d5;
`

const Heading = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
`

const App = () => {
  return (
    <Main>
      <Heading>Simple todo list</Heading>
      <Todo />
    </Main>
  )
}

export default App
