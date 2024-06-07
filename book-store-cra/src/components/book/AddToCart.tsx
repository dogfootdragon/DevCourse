import styled from 'styled-components';
import { BookDetail } from '../../models/book.model';
import InputText from '../common/InputText';
import Button from '../common/Button';
import { useState } from 'react';
import { addCart } from '../../api/carts.api';
import { Link } from 'react-router-dom';
import { useBook } from '../../hooks/useBook';

interface Props {
  book: BookDetail;
}

function AddToCart({book}: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  // const [cartAdded, setCartAdded] = useState(false);
  const {addToCart, cartAdded} = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  }

  const handleIncrese = () => {
    setQuantity(quantity + 1);
  }

  const handleDecrese = () => {
    if(quantity === 1) return;
    setQuantity(quantity - 1);
  }

  // useBook.is hook에 분리
  // const addToCart = () => {
  //   addCart({
  //     book_id: book.id,
  //     quantity: quantity
  //   }).then(() => {
  //     setCartAdded(true);
  //     setTimeout(() => {
  //       setCartAdded(false);
  //     }, 3000);
  //   })
  // }

  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText inputType='number' value={quantity} onChange={handleChange}/>
        <Button size='medium' scheme='normal' onClick={handleIncrese}>+</Button>
        <Button size='medium' scheme='normal' onClick={handleDecrese}>-</Button>
      </div>
      <Button size='medium' scheme='primary' onClick={() => addToCart(quantity)}>장바구니 담기</Button>
      
      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/cart">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  )
}

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({theme}) => theme.color.background};
    border-radius: ${({theme}) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({$added}) => ($added ? '1' : '0')};
    transition: all 0.5s ease;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default AddToCart;