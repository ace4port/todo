import styled from 'styled-components'

export const Heading = styled.h3`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0;
  color: #7600e6;
  background-color: #fff;
`

export const Main = styled.main`
  font: 16px 'Poppins', sans-serif;
  margin: 0;
  background-color: #d5d5d5;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 1rem);
`

export const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  padding: 1rem;
  margin: 0;
  background-color: #75a0e6;
`

export const Clm = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem;
  border-radius: 3px;
  background-color: #a3d3d3;
  h2 {
    margin: 0;
    display: flex;
    justify-content: space-between;
    em {
      font-size: 1rem;
      color: #7600e6;
      align-self: center;
    }
  }
  .bot {
    justify-self: end;
  }
`
export const Scroll = styled.div`
  padding: 0.5rem;
  border-radius: 3px;
  .active {
    background-color: #00e676;
  }
  min-width: 250px;
  max-height: 380px;
  overflow-y: auto;
`

export const Item = styled.div`
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  background-color: white;
  border-radius: 3px;
  margin: 0.5rem 0;

  label {
    border-radius: 3px;
    transition: all 0.5s ease-in-out;
    background-color: #7600e6;
    display: block;
    padding: 10px 0;
    color: white;
    cursor: grab;
  }
  .checked {
    color: #7600e6;
    background-color: #7600e602;
    text-decoration: line-through;
  }

  &:focus {
    outline: 2px solid #00e6e6;
  }
`

export const AddTodo = styled.form`
  display: flex;
  border-radius: 3px;

  margin: 0.5rem 0;

  input {
    padding: 0.5rem;
    flex: 1;
  }
`

export const Button = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #00000000;
  border-radius: 3px;
  font-size: 1rem;
  color: white;
  background-color: #e60076;
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  .contents {
    background-color: white;
    border-radius: 3px;
    padding: 1rem;
    max-width: 500px;
    width: 50%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
      margin: 0;
    }
  }
`

export const Question = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.7rem;
  border-radius: 50%;
  background-color: #7600e6;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-size: 2.5rem;
  color: white;
  transition: all 0.5s ease-in;
  &:hover {
    background-color: #e70076;
  }
`
