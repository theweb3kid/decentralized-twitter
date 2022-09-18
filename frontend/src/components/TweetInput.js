import React, {useState} from 'react';
import styled from 'styled-components';

const Main = styled.div`
margin-top: 3rem;
padding: 2rem 1rem;

button {
    color: white;
    border: none;
    height: calc(1.4rem + 1.4vh);
    width: calc(5rem + 3vw);
    border-radius: calc(0.7rem + 0.7vh);
    padding: 0.5vh;
    font-size: calc(0.8rem + 0.7vw);
    background-color: #1DA1F2;
}

input {
    padding: 0.5vh;
    font-size: calc(1rem + 0.8vw);
    height: auto;
    width: 50vw;
    margin-right: 2rem;
    background: transparent;
    border: none; 
    color: white;
}

input:focus {
    outline: none;
}
`

const TweetInput = (props) => {

    const [data, setData] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.tweet(data)
    }

    const handleOnChange = (e) => {
        setData(e.target.value)
    }

  return (
      <Main>
          <form onSubmit={handleSubmit}>
          <input onChange={handleOnChange} placeholder="What's happening?" type={"text"}/>
          <button>Tweet</button>
          </form>
      </Main>
  );
};

export default TweetInput;

