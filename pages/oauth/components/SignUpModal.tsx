import { VFC } from 'react';

import Modal from '../../../components/common/Modal';
import ModalTemplate from '../../../components/common/Modal/ModalTemplate';
import SetUserProfile from '../../../components/initialRegister/SetUserProfile';

interface Props {
  setModalVisible: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isShowing: boolean;
}

const SignUpModal: VFC<Props> = ({ setModalVisible, isShowing }) => {
  return (
    <>
      <Modal isShowing={isShowing} hide={setModalVisible}>
        <ModalTemplate hide={setModalVisible}>
          <SetUserProfile />
        </ModalTemplate>
      </Modal>
    </>
  );
};

export default SignUpModal;
