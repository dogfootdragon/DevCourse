import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
}

function Dropdown({children, toggleButton, isOpen = false}: Props) {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      // 토글 외부를 클릭했을때만 작동하게
      if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [dropdownRef]);

  return (
    <DropdownStyle $open={open} ref={dropdownRef}>
      <button className='toggle' onClick={() => setOpen(!open)}>
        {toggleButton}
      </button>
      {open && <div className="panel">{children}</div>}
    </DropdownStyle>
  );
}

interface DropdownStyleProps {
  $open: boolean;
}

const DropdownStyle = styled.div<DropdownStyleProps>`
  position: relative;

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    svg {
      width: 30px;
      height: 30px;
      fill: ${({theme, $open}) => $open ? theme.color.primary : theme.color.text};
    }
  }

  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: ${({theme}) => theme.borderRadius.default};
    z-index: 100;
  }
`;

export default Dropdown;