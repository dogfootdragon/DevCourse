import styled from 'styled-components';
import Button from '../common/Button';
import {FaList, FaTh} from "react-icons/fa"
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';
import { useEffect } from 'react';

const viewOptions = [
  {
    value: 'list',
    icon: <FaList />
  },
  {
    value: "grid",
    icon: <FaTh />
  }
]

export type ViewMode = 'grid' | 'list';

function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  }

  useEffect(() => { // 초기에 view라는 쿼리스트링이 존재하지 않을때를 위해 사용(기본값 그리드)
    if(!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch('grid');
    }
  }, []);

  return (
    <BooksViewSwitcherStyle>
      {
        viewOptions.map((option) => (
          <Button 
          key={option.value} 
          size='medium' 
          scheme={searchParams.get(QUERYSTRING.VIEW) === option.value ? 'primary' : 'normal'} 
          onClick={() => handleSwitch(option.value as ViewMode)}>
            {option.icon}
          </Button>
        ))
      }
    </BooksViewSwitcherStyle>
  )
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
  
  svg {
    fill: #fff;
  }
`;

export default BooksViewSwitcher;