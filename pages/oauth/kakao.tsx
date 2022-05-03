import usersApi from 'apis/users.api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const Oauth = () => {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_SECRET_KEY;

  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

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
      sessionStorage.setItem('jwtToken', data.accessToken);
      if (data.message === 'signup') {
        route.push({ pathname: '/oauth', query: { isSignUp: '' } });
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
      <OauthWrapper>
        <OauthContent>
          <div>여기서 로그인하세요~~</div>
          <div>
            <p>카카오 로그인 성공했어요~~</p>
          </div>
          <div>login here</div>
        </OauthContent>
      </OauthWrapper>
    </>
  );
};

export default Oauth;

export const OauthWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const OauthContent = styled.div`
  margin: 0 30px;
`;
