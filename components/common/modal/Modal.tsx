import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as S from './Modal.style';

export interface ModalPropsType {
    isShowing: boolean;
    hide: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Modal: React.FC<ModalPropsType> = ({ isShowing, hide, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (mounted) {
    if (isShowing) {
      document.getElementById('body').style.overflow = 'hidden';
      return ReactDOM.createPortal(
        <Fragment>
          <S.BodyBlackoutStyle onClick={hide} />
          {children}
        </Fragment>,
        document.querySelector('#portal-section')
      );
    } else {
      document.getElementById('body').style.overflow = 'scroll';
      return null;
    }
  } else return null;
};

export default Modal;
