import usersApi from 'apis/users.api';
import axios from 'axios';
import Layout from 'components/Layout';
import useModal from 'hooks/useModal';
import { usePathStorage } from 'hooks/usePathStorage';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { socialLoginState } from 'recoil/auth';

import SignUpModal from './_components/SignUpModal';

const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_SECRET_KEY;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const { isShowing, setModalVisible } = useModal();
  const [savePath, replacePath] = usePathStorage();
  const setSocialLoginState = useSetRecoilState(socialLoginState);

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
        replacePath();
      }
    }
  };

  useEffect(() => {
    getKakaoToken();
  }, []);

  return (
    <>
      <Layout>
        <SignUpModal isShowing={isShowing} setModalVisible={setModalVisible} />
      </Layout>
    </>
  );
};

export default KakaoLogin;
