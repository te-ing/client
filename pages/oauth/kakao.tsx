import usersApi from 'apis/users.api';
import axios from 'axios';
import Layout from 'components/Layout';
import useModal from 'hooks/useModal';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { socialLoginState } from 'recoil/auth';
import styled from 'styled-components';
import SignUpModal from './_components/SignUpModal';

const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_SECRET_KEY;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const { isShowing, setModalVisible } = useModal();
  const [, setSocialLoginState] = useRecoilState(socialLoginState);

  const route = useRouter();

  // 카카오 인가 코드를 받고 나서 회원가입 or 로그인 진행
  const getKakaoToken = async () => {
    const kakaoAccessCode = await new URL(window.location.href).searchParams.get('code');
    if (kakaoAccessCode) {
      const kakaoAccessToken = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&code=${kakaoAccessCode}&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&client_secret=${KAKAO_CLIENT_SECRET}`
      );

      const {
        data: { access_token },
      } = kakaoAccessToken;
      const body = { access_token };
      const { data } = await usersApi.kakaoOauth(body);
      setSocialLoginState(data);
      sessionStorage.setItem('jwtToken', data.accessToken);
      sessionStorage.setItem('id', String(data.id));
      if (data.message === 'signup') {
        setModalVisible();
      } else {
        route.push('/');
      }
    }
  };

  useEffect(() => {
    getKakaoToken();
  }, []);

  return (
    <>
      <Layout>
        <OauthContent>
          <SignUpModal isShowing={isShowing} setModalVisible={setModalVisible} />
        </OauthContent>
      </Layout>
    </>
  );
};

export default KakaoLogin;

const OauthContent = styled.div`
  margin: 0 30px;
`;
