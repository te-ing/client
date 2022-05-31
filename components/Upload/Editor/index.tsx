import React, { useState } from 'react';
import * as S from './Editor.style';
import { UploadType } from 'types/post';

interface Props {
  values: UploadType;
  handler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Editor = ({ values, handler }: Props) => {
  return (
    <S.Wrapper>
      <S.EditorWrapper>
        <S.TitleInput name="title" placeholder="제목을 입력해주세요" value={values.title} onChange={handler} />
        <S.Description
          name="description"
          placeholder="작품에 대한 설명을 적어주세요."
          maxLength={500}
          required
          value={values.description}
          onChange={handler}
        ></S.Description>
        <span>{values.description.length}/500</span>
      </S.EditorWrapper>
    </S.Wrapper>
  );
};

export default Editor;
