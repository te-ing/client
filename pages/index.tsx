import { useMaybeDeferContent } from 'next/dist/server/render';
import React from 'react';

import Modal from '../components/common/modal/Modal'
import ModalTemplate from '../components/common/modal/modalTemplate/ModalTemplate';
import SetUserProfile from '../components/initialRegister/setUserProfile/SetUserProfile';

import useModal from '../hooks/useModal';

const Index: React.FC = () => {
<<<<<<< HEAD
  const { isShowing, setModalVisible} = useModal();

  // return <Login />;
  return (
    <Modal isShowing={isShowing} hide={setModalVisible}>
      <ModalTemplate>
        <SetUserProfile />
      </ModalTemplate>
    </Modal>
  )
=======
  
  return <Login />;
>>>>>>> develop
};

export default Index;
