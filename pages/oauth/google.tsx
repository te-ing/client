import usersApi from 'apis/users.api';
import axios from 'axios';
import Layout from 'components/Layout';
import useModal from 'hooks/useModal';
import { usePathStorage } from 'hooks/usePathStorage';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { socialLoginState } from 'recoil/auth';
import SignUpModal from './_components/SignUpModal';

const GoogleLogin = () => {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const { isShowing, setModalVisible } = useModal();
  const [savePath, replacePath] = usePathStorage();
  const setSocialLoginState = useSetRecoilState(socialLoginState);

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
      const { data } = await usersApi.googleOauth(body);
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
    getGoogleToken();
  }, []);

  return (
    <Layout>
      <SignUpModal isShowing={isShowing} setModalVisible={setModalVisible} />
    </Layout>
  );
};

export default GoogleLogin;
