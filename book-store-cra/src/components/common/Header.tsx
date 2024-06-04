import {styled} from "styled-components";
import logo from '../../assets/images/logo.png'
import {FaSignInAlt, FaRegUser} from "react-icons/fa";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Category } from '../../models/category.model';
import { fetchCategory } from '../../api/category.api';
import { useCategory } from '../../hooks/useCategory';

function Header() {
  const { category } = useCategory();

  return (
    <HeaderStyle>
      <h1 className='logo'>
        <Link to="/">
          <img src={logo} alt="book sotre" />
        </Link>
      </h1>
      <nav className='category'>
        <ul>
          {
            category.map((item) => (
              <li key={item.category_id}>
                <Link to={item.category_id === null ? '/books' : `/books?category_id=${item.category_id}`}>
                  {item.category_name}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <nav className='auth'>
        <ul>
          <li>
            <a href="/login">
              <FaSignInAlt></FaSignInAlt> 로그인
            </a>
          </li>
          <li>
            <a href="/signup">
              <FaRegUser></FaRegUser> 회원가입
            </a>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  )
}

// background와 h1 같은 표현방식. 위는 Destructuring(구조분해할당)
const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({theme}) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({theme}) => theme.color.background};

  .logo {
    img{
      width: 200px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({theme}) => theme.color.text};

          &:hover {
            color: ${({theme}) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        a {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-item: center;
          line-height: 1;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
`

export default Header;