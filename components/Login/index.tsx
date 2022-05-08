import Modal from 'components/common/Modal';
import ModalTemplate from 'components/common/Modal/ModalTemplate';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  isShowing: boolean;
  setModalVisible: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Login: FC<Props> = ({ isShowing, setModalVisible }) => {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const kakaoAccessCodeUri = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const GoogleAccessCodeUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  return (
    <>
      <Modal isShowing={isShowing} hide={setModalVisible}>
        <ModalTemplate hide={setModalVisible}>
          <OauthWrapper>
            <OauthContent>
              <div>여기서 로그인하세요~~</div>
              <div>
                <a href={kakaoAccessCodeUri}>kakaoLogin here</a>
              </div>
              <div>
                <a href={GoogleAccessCodeUri}>google login here</a>
              </div>
              <div>login here</div>
            </OauthContent>
          </OauthWrapper>
        </ModalTemplate>
      </Modal>
    </>
  );
};

export default Login;

export const OauthWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const OauthContent = styled.div`
  margin: 0 30px;
`;
