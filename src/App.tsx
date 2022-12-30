import React, { useState } from "react";
import { darkTheme, lightTheme } from "theme";
import router from "router";
import { RouterProvider } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "atoms";

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
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
