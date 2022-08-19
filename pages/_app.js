import StoreContextProvider from "context/store";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "constants/theme";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fontFamily};
    margin: 0;
    padding: 0;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <StoreContextProvider>
        <GlobalStyle whiteColor />
        <Component {...pageProps} />
      </StoreContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
