import React, { useState } from "react";
import { darkTheme, lightTheme } from "theme";
import router from "router";
import { RouterProvider } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    max-width : 70vh;
    margin : 0 auto;
    font-family: "Source Sans Pro", sans-serif;
    background-color : ${props => props.theme.bgColor};
    color : ${props => props.theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;  // 부모 속성 상속 받기
  }
`;

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(current => !current);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <button onClick={toggleDark}>모드선택</button>
        <GlobalStyle />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
