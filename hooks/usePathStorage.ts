import { useRouter } from 'next/router';

export const usePathStorage = () => {
  const router = useRouter();

  const savePath = () => {
    sessionStorage.setItem('path', window.location.pathname);
  };

  const replacePath = () => {
    const path = sessionStorage.getItem('path');
    router.replace(path);
    sessionStorage.removeItem('path');
  };

  return [savePath, replacePath];
};
