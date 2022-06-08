import Modal from 'components/common/Modal';
import ModalTemplate from 'components/common/Modal/ModalTemplate';
import { FC } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Image from 'next/image';
import { usePathStorage } from 'hooks/usePathStorage';

interface Props {
  isShowing: boolean;
  setModalVisible: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
const Login: FC<Props> = ({ isShowing, setModalVisible }) => {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const kakaoAccessCodeUri = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const GoogleAccessCodeUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  const [savePath] = usePathStorage();

  return (
    <>
      <Modal isShowing={isShowing} hide={setModalVisible}>
        <ModalTemplate hide={setModalVisible}>
          <Wrapper>
            <MainHeader>
              <Image src={'/images/logo.svg'} width="100%" height="20%" />
            </MainHeader>

            <MainContentWrapper>
              <MainContentHeader>
                <TextColorGreen>드림인</TextColorGreen>에서 여러분의
                <br />
                꿈을 펼쳐보세요.
              </MainContentHeader>
              <MainContentParagraph>
                작품을 공유하고 다양한 사람들로부터 새로운 영감을 받을 수 있습니다.
              </MainContentParagraph>
            </MainContentWrapper>

            <SocialLoginButtonWrapper>
              <SocialLoginIntro>간편하게 SNS로 로그인하기</SocialLoginIntro>

              <KakaoLoginButton href={kakaoAccessCodeUri} onClick={savePath}>
                <Image src={'/images/kakaoLogo.svg'} width="15%" height="15%" />
                카카오로 시작하기
                <span />
              </KakaoLoginButton>

              <GoogleLoginButton href={GoogleAccessCodeUri} onClick={savePath}>
                <Image src={'/images/googleLogo.svg'} width="15%" height="15%" />
                Google로 시작하기
                <span />
              </GoogleLoginButton>
            </SocialLoginButtonWrapper>
          </Wrapper>
        </ModalTemplate>
      </Modal>
    </>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 300px;
  height: 450px;
  displya: flex;
  justify-contents: center;
  margin: 0 auto;
  text-align: center;
`;

const MainHeader = styled.div`
  margin-bottom: 20px;
`;
const MainContentWrapper = styled.div`
  margin: 80px 0;
  line-height: 34px;
`;
const MainContentHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 12px;
  
}`;

const MainContentParagraph = styled.p<{ theme: DefaultTheme }>`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.darkGray};
`;

const TextColorGreen = styled.span<{ theme: DefaultTheme }>`
  color: ${({ theme }) => theme.color.mainLogoGreen};
`;

const SocialLoginButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SocialLoginIntro = styled.h1`
  text-align: left;
  color: ${({ theme }) => theme.color.gray_400};
`;

const KakaoLoginButton = styled.a<{ theme: DefaultTheme }>`
  margin-top: 20px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: center;
  text-decoration: none;
  background-color: ${({ theme }) => theme.color.kakaoLoginButtonYellow};
  color: ${({ theme }) => theme.color.black};
`;

const GoogleLoginButton = styled.a<{ theme: DefaultTheme }>`
  border: 1px solid;
  border-radius: 10px;
  margin-top: 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.color.black};
`;
