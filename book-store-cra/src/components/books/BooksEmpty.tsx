import styled from 'styled-components';
import {FaSmileWink} from "react-icons/fa"
import Title from '../common/Title';
import { Link } from 'react-router-dom';
import Empty from '../common/Empty';

function BooksEmpty() {
  return (
    // 해당 컴포넌트 common Empty에 공용으로 고도화함. 아래는 가져와서 사용한것
    <Empty 
    title='검색 결과가 없습니다.' 
    icon={<FaSmileWink />} 
    description={<Link to="/books">전체 검색 결과로 이동</Link>}/>
  )
}

export default BooksEmpty;