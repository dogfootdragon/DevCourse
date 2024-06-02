import Layout from './components/layout/Layout';
import Home from './pages/Home'; // 추후 알리아스를 통해 절대경로로 변경
import { GlobalStyle } from './style/global';
import { ThemeProvider } from 'styled-components';
import { light, dark, ThemeName, getTheme } from './style/theme';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { useContext, useState } from 'react';
import { BookStoreThemeProvider, ThemeContext } from './context/themeContext';

function App() {
  return (
    // <Layout children={<Home />} /> 아래 방식과 같다.
    <BookStoreThemeProvider>
        <ThemeSwitcher />
        <Layout>
          <Home />
        </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
