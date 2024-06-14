import { RouterProvider, useLocation, useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { router } from "./routes/router";
import { createGlobalStyle } from "styled-components";
import { LightMode, DarkMode } from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

const GlobalStyles = createGlobalStyle`
  
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}

}
a{
  text-decoration: none;
  color:inherit
}

`;

const Btn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  margin: 20px;
`;
const Back = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 10px 40px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  margin: 20px;
`;
const Navigation = styled.header`
  display: flex;
  justify-content: end;
`;
function App() {
  // const location = useLocation();
  const [mode, setMode] = useState(false);
  const onClick = () => {
    setMode((mode) => !mode);
  };
  

  return (
    <>
      <Navigation>
        
        <Btn onClick={onClick}>{mode ? "LightMode" : "DarkMode"}</Btn>
      </Navigation>

      <ThemeProvider theme={mode ? DarkMode : LightMode}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
