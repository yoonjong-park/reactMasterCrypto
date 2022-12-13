import React from "react";
import ReactDOM from "react-dom/client";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./theme";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Source Sans Pro", sans-serif;
    background-color : ${theme.bgColor};
    color : ${theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;  // 부모 속성 상속 받기
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
