import Layout from './components/layout/Layout';
import Home from './pages/Home'; // 추후 알리아스를 통해 절대경로로 변경
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // 실제로 라우터를 생성해주는 역할
import Error from './components/common/Error';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient';

const routeList = [
  {
    path: "/",
    element: <Home /> 
  },
  {
    path: "/books",
    element: <Books />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/reset",
    element: <ResetPassword />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/order",
    element: <Order />
  },
  {
    path: "/orderlist",
    element: <OrderList />
  }
]

const router = createBrowserRouter(routeList.map((item) => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: <Error />
  }
}));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
