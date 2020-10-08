import React, { useEffect, useRef } from 'react';

const ClickOutsideHandler = (props) => {
  const wrapperRef = useRef(null);
  const handleClick = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      props.handleClickOutside();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return <div ref={wrapperRef}>{props.children}</div>;
}

export default ClickOutsideHandler;