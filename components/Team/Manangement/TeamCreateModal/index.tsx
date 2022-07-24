import teamsApi from 'apis/teams.api';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';
import { ProfileWrapper } from 'components/common/Atomic/Profile';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { camera_icon, team_profile_icon, close_icon } from 'constants/imgUrl';
import useForm from 'hooks/useForm';
import { useUploadImage } from 'hooks/useUploadImage';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { TeamEditForm } from 'types/team';

interface Props {
  onOffHandler: React.Dispatch<React.SetStateAction<boolean>>;
}
const TeamCreateModal = ({ onOffHandler }: Props) => {
  const queryClient = useQueryClient();
  const [profileImg, setProfileImg, profileImgUpload] = useUploadImage('');
  const [error, setError] = useState('');
  const [values, setValues, handler] = useForm<TeamEditForm>({
    title: '',
    description: '안녕하세요.',
    team_profile_image: '',
    background_image: '',
  });
  const { mutate: teamCreate } = useMutation(() => teamsApi.createTeam(values, { isRequiredLogin: true }), {
    onSuccess: ({ status }) => {
      queryClient.invalidateQueries(['team-list']);
      if (status === 400) {
        setError('중복되는 팀 명 입니다.');
      } else {
        onOffHandler(false);
        alert('팀 생성이 완료 되었습니다.');
      }
    },
    onError: (error) => {
      alert(error); //추후에 체크
    },
  });

  const teamCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (values.title.length > 0) {
      teamCreate();
    }
  };
  useEffect(() => {
    setValues({ ...values, team_profile_image: profileImg });
  }, [profileImg]);
  return (
    <Modal>
      <ModalBox>
        <CloseButton onClick={() => onOffHandler(false)}>
          <Image src={close_icon} width={24} height={24} />
        </CloseButton>

        <h1>팀 생성</h1>
        <p>이미지와 팀 명을 입력 해주세요.</p>
        <form onSubmit={teamCreateSubmit}>
          <div>
            <ProfileLabel htmlFor="create-input">
              <ProfileWrapper style={{ margin: '0 auto 32px' }}>
                <ImgWrapper
                  alt="icon-profile"
                  src={profileImg.length > 0 ? profileImg : team_profile_icon}
                  width={120}
                  height={120}
                />
                <CameraIconWrapper>
                  <Image alt="icon-camera" src={camera_icon} width={24} height={24} />
                </CameraIconWrapper>
              </ProfileWrapper>
              <FileInput id="create-input" type="file" name="team_profile_image" onChange={profileImgUpload} />
            </ProfileLabel>
            <TeamTitle>
              <label htmlFor="title">팀 명</label>
              <span>{error}</span>
              <input type="text" name="title" placeholder="팀 명을 입력 해주세요." onChange={handler} />
            </TeamTitle>
            <TeamDescription>
              <textarea name="description" placeholder="팀에 대한 설명을 입력해주세요." onChange={handler} />
            </TeamDescription>
          </div>
          <CreateButton>팀 생성</CreateButton>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default TeamCreateModal;

const Modal = styled.div`
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ModalBox = styled.div`
  position: relative;
  width: 416px;
  height: 631px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: 24px;
    line-height: 1.458333;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.color.black};
  }

  & p {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.25;
    margin-bottom: 18px;
    color: ${({ theme }) => theme.color.gray_800};
  }

  & form {
    width: 100%;
    height: 282px;

    & label {
      color: ${({ theme }) => theme.color.gray_500};
    }

    & > div {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 12px 16px;
    }
  }
`;
const ImgWrapper = styled(Image)`
  border-radius: 12px;
`;
const CameraIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  position: absolute;
  bottom: 0;
  right: -16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray_700};
`;

const TeamTitle = styled.div`
  width: 100%;
  margin-bottom: 16px;
  position: relative;
  & label {
    display: inline-block;
    margin-bottom: 10px;
  }

  & span {
    // width: 100%;

    color: ${({ theme }) => theme.color.warningRed};
    font-weight: 400;
    font-size: 16px;
    line-height: 1.4375;

    position: absolute;
    right: 0;
    top: -5px;
  }

  & input {
    padding-left: 16px;
    width: 100%;
    height: 56px;
    border: 1px solid #979797;
    border-radius: 4px;

    &::placeholder {
      font-weight: 400;
      letter-spacing: 0.15px;
      color: ${({ theme }) => theme.color.gray_400};
      font-size: 16px;
      line-height: 1.5;
    }
  }
`;

const TeamDescription = styled.div`
  width: 100%;

  & textarea {
    padding: 16px;
    width: 100%;
    height: 160px;
    border: 1px solid #979797;
    border-radius: 4px;
    resize: none;

    &::placeholder {
      font-weight: 400;
      letter-spacing: 0.15px;
      color: ${({ theme }) => theme.color.gray_400};
      font-size: 16px;
      line-height: 1.5;
    }
  }
`;

const CreateButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.PressedPrimaryGreen};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 16px;
  line-height: 1.4375;
  color: ${({ theme }) => theme.color.black};
  &:hover {
    background-color: ${({ theme }) => theme.color.DefaultPrimaryGreen};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.DefaultPrimaryGreen};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
`;
