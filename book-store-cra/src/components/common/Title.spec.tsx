import {render, screen} from '@testing-library/react';
import Title from './Title';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe('Title 컴포넌트 테스트', () => {
  it('렌더를 확인', () => {
    // 1. 렌더 (지정한 theme를 해당 파일이 모르기 때문에 만들어둔 themeProvider로 감싸준다)
    render(
      <BookStoreThemeProvider> 
        <Title size='large'>제목</Title>
      </BookStoreThemeProvider>
    )

    // 2. 확인 (렌더한 화면에 셀렉한 요소가 doument에 있는지 확인)
    expect(screen.getByText('제목')).toBeInTheDocument();
  })

  it('size props 적용', () => {
    const {container} = render(
      <BookStoreThemeProvider> 
        <Title size='large'>제목</Title>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({fontSize: "2rem"})
  })

  it('color props 적용', () => {
    const {container} = render(
      <BookStoreThemeProvider> 
        <Title size='large' color='primary'>제목</Title>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({color: "brown"})
  })
})
