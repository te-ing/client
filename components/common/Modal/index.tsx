import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as S from './Modal.style';

export interface ModalPropsType {
  isShowing: boolean;
  hide: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: JSX.Element;
}

const Modal = ({ isShowing, hide, children }: ModalPropsType) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (mounted) {
    if (isShowing) {
      document.getElementById('body').style.overflow = 'hidden';
      return ReactDOM.createPortal(
        <>
          <S.BodyBlackoutStyle onClick={hide} />
          {children}
        </>,
        document.querySelector('#portal-section')
      );
    } else {
      document.getElementById('body').style.overflow = 'scroll';
      return null;
    }
  } else return null;
};

export default Modal;
