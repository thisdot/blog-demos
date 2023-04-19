import React from "react";
import logo from "./logo.svg";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const AppIntro = styled.p`
  font-size: large;
`;

const AppTitle = styled.h1`
  font-size: 1.5em;
`;

const spinElement = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppLogo = styled.img`
  animation: ${spinElement} infinite 20s linear;
  height: 80px;
`;

const App = () => {
  return (
    <Container>
      <Header>
        <AppLogo src={logo} />
        <AppTitle>Welcome to React</AppTitle>
      </Header>
      <AppIntro>
        To get started, edit <code>src/App.js</code> and save to reload.
      </AppIntro>
    </Container>
  );
};

export default App;
