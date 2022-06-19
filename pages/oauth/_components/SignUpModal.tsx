import CelebrateRegister from 'components/initialRegister/CelebrateRegister';
import { useRouter } from 'next/router';
import { VFC } from 'react';

import Modal from '../../../components/common/Modal';
import ModalTemplate from '../../../components/common/Modal/ModalTemplate';

interface Props {
  isShowing: boolean;
  setModalVisible: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SignUpModal: VFC<Props> = ({ isShowing }) => {
  const route = useRouter();

  const setModalVisible = () => {
    route.push('/');
  };
  return (
    <>
      <Modal isShowing={isShowing} hide={setModalVisible}>
        <ModalTemplate hide={setModalVisible} showDelete={false}>
          <CelebrateRegister />
        </ModalTemplate>
      </Modal>
    </>
  );
};

export default SignUpModal;
