import styled from 'styled-components';
import Footer from '../common/Footer';
import Header from '../common/Header';

interface LayoutProps {
  children: React.ReactNode; // 코파일럿이 자동으로 리액트에서 리액트노드 타입을 지정해준다
            // React.ReactNode: 리액트로 만든 모든 리액트 컴포넌트들이 배치될 수 있다고 선언
}

function Layout({children}: LayoutProps) {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  )
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({theme}) => theme.layout.width.large};
  padding: 20px 0;
`;

export default Layout;