import styled from 'styled-components';
import { ButtonCenter, FlexColumn, TextBox } from 'styles/commonStyles';

// 코드만 작성하고 뷰 상태는 아직 확인 안 된 컴포넌트!!

export const NoticeBox = () => {
  return (
    <Wrapper>
      <TextBox size="16px" weight={700} marginBottom="8px">
        알림 제목입니다.
      </TextBox>
      <TextBox size="14px" weight={400} marginBottom="16px">
        알림내용 입니다.알림내용 입니다.알림내용 입니다.알림내용 입니다.알림내용 입니다.알림내용 입니다.알림내용
        입니다.알림내용 입니다.
      </TextBox>
      <ConfirmButton>확인</ConfirmButton>
    </Wrapper>
  );
};

const Wrapper = styled(FlexColumn)`
  width: 352px;
  min-height: 167px;
  padding: 16px;
`;

const ConfirmButton = styled(ButtonCenter)`
  width: 320px;
  height: 40px;
  color: #fff;

  border-radius: 4px;
  background-color: #000;
`;
