import { useContext } from 'react';
import { ThemeName } from '../../style/theme';
import { ThemeContext } from '../../context/themeContext';

// interface Props {
//   themeName: ThemeName;
//   setThemeName: (themeName: ThemeName) => void; // 테마를 내부에서 변경하면, 테마를 외부에서 set 해주는 기능이 필요
// }

function ThemeSwitcher() {

  const {themeName, toggleTheme} = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>{themeName}</button>
  )
}

export default ThemeSwitcher;