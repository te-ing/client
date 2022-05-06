import usersApi from 'apis/users.api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const Oauth = () => {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  const route = useRouter();

  const getGoogleToken = async () => {
    const googleAccessCode = await new URL(window.location.href).searchParams.get('code');
    if (googleAccessCode) {
      const googleAccessToken = await axios.post(
        `https://oauth2.googleapis.com/token?code=${googleAccessCode}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
      );
      const {
        data: { access_token },
      } = googleAccessToken;
      const body = { access_token };
      const { data } = await usersApi.kakaoOauth(body);
      console.log(data);
      sessionStorage.setItem('jwtToken', data.accessToken);

      if (data.message === 'signup') {
        route.push({ pathname: '/oauth', query: { isSignUp: true } });
      } else {
        route.push('/');
      }
    }
  };

  useEffect(() => {
    getGoogleToken();
  }, []);

  return (
    <>
      <OauthWrapper>
        <OauthContent>
          <div>구글로그인이에요</div>
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
