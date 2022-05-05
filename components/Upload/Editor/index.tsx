import React from 'react';
import * as S from './Editor.style';

import dynamic from 'next/dynamic';
const Quill = dynamic(import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.bubble.css';

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
    ],
  },
};

const formats = ['header', 'align', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link'];

const Editor: React.FC = () => {
  return (
    <S.Wrapper>
      <S.EditorWrapper>
        <S.TitleInput placeholder="제목을 입력해주세요" />
        <Quill
          style={{ height: '175px', border: 'none', background: '#F5F5F5' }}
          modules={modules}
          formats={formats}
          theme="bubble"
          placeholder="작품에 대한 설명을 적어주세요"
        />
      </S.EditorWrapper>
    </S.Wrapper>
  );
};

export default Editor;
