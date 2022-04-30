import React, { useEffect, useRef } from 'react';
import * as S from './Editor.style';

import dynamic from 'next/dynamic';

import Quill = dynamic(() => import("quill"), { ssr: false });;
import 'quill/dist/quill.bubble.css';

const Editor: React.FC = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '작품에 대한 설명을 적어주세요',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link'],
        ],
      },
    });
  }, []);

  return (
    <S.Wrapper>
      <S.QuillWrapper>
        <S.Quill ref={quillElement} />
      </S.QuillWrapper>
    </S.Wrapper>
  );
};

export default Editor;
