import React from 'react';

<<<<<<< HEAD
import Modal from '../components/common/modal/Modal'
import ModalTemplate from '../components/common/modal/ModalTemplate';
import SetUserProfile from '../components/initialRegister/SetUserProfile';
=======
import Modal from '../components/common/modal/Modal';
import ModalTemplate from '../components/common/modal/modalTemplate/ModalTemplate';
import SetUserProfile from '../components/initialRegister/setUserProfile/SetUserProfile';
>>>>>>> da4e79f31df2eaa3e1755a187947fc399e564b33

import useModal from '../hooks/useModal';

const Index: React.FC = () => {
  const { isShowing, setModalVisible } = useModal();

  // return <Login />;
  return (
    <>
      <button onClick={setModalVisible}>test</button>
      <Modal isShowing={isShowing} hide={setModalVisible}>
        <ModalTemplate hide={setModalVisible}>
          <SetUserProfile />
        </ModalTemplate>
      </Modal>
    </>
  );
};

export default Index;
