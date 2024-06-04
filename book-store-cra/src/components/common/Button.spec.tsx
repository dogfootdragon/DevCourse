import {render, screen} from '@testing-library/react';
import Button from './Button';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe('Button 컴포넌트 테스트', () => {
  it('렌더를 확인', () => {
    // 1. 렌더 (지정한 theme를 해당 파일이 모르기 때문에 만들어둔 themeProvider로 감싸준다)
    render(
      <BookStoreThemeProvider> 
        <Button size='large' scheme='primary'>버튼</Button>
      </BookStoreThemeProvider>
    )

    // 2. 확인 (렌더한 화면에 셀렉한 요소가 doument에 있는지 확인)
    expect(screen.getByText('버튼')).toBeInTheDocument();
  })

  it("size props", () => {
    const {container} = render(
      <BookStoreThemeProvider> 
        <Button size='large' scheme='primary'>버튼</Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole("button")).toHaveStyle({fontSize: "1.5rem"})
  })
});