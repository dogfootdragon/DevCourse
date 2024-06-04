import Layout from './components/layout/Layout';
import Home from './pages/Home'; // 추후 알리아스를 통해 절대경로로 변경
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // 실제로 라우터를 생성해주는 역할
import Error from './components/common/Error';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
    errorElement: <Error />,
  },
  {
    path: "/books",
    element: <Layout><div>도서 목록</div></Layout>
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    )
  }
])

function App() {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
