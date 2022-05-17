import teamsApi from 'apis/teams.api';
import { ProfileWrapper } from 'components/common/Atomic/Profile';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { camera_icon, team_profile_icon, close_icon } from 'constants/imgUrl';
import useForm from 'hooks/useForm';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { TeamEditForm } from 'types/team';

interface Props {
  onOffHandler: React.Dispatch<React.SetStateAction<boolean>>;
}
const TeamCreate = ({ onOffHandler }: Props) => {
  const [values, setValues, handler] = useForm<TeamEditForm>({
    title: '',
    description: '안녕하세요.',
    team_profile_image: '',
    background_image: '',
  });
  const { mutate: teamCreate } = useMutation(() => teamsApi.createTeam(values, { isRequiredLogin: true }), {
    //   onSuccess: ({ data }) => {
    //     queryClient.setQueryData(['team-profile', '1'], data);
    //   },
  });
  useEffect(() => {
    console.log(values);
  }, [values]);

  const teamCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (values.title.length > 0) {
      teamCreate();
    }
  };

  return (
    <Modal>
      <ModalBox>
        <CloseButton onClick={() => onOffHandler(false)}>
          <Image src={close_icon} width={24} height={24} />
        </CloseButton>

        <h1>팀 생성</h1>
        <p>이미지와 팀 명을 입력 해주세요.</p>
        <form onSubmit={teamCreateSubmit}>
          <ImageUploadWrapper name="team_profile_image">
            <ProfileWrapper style={{ marginBottom: '8px' }}>
              <ImgWrapper alt="icon-profile" src={team_profile_icon} width={120} height={120} />
              <CameraIconWrapper>
                <Image alt="icon-camera" src={camera_icon} width={24} height={24} />
              </CameraIconWrapper>
            </ProfileWrapper>
          </ImageUploadWrapper>
          <TeamTitle>
            <label htmlFor="title">팀 명</label>
            <input type="text" name="title" placeholder="팀 명을 입력 해주세요." onChange={handler} />
          </TeamTitle>
        </form>
        <CreateButton>팀 생성</CreateButton>
      </ModalBox>
    </Modal>
  );
};

export default TeamCreate;

const Modal = styled.div`
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  //   background-color: ${({ theme }) => theme.color.gray_200};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ModalBox = styled.div`
  position: relative;
  width: 416px;
  height: 488px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
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
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
    & label {
      color: ${({ theme }) => theme.color.gray_500};
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
  & label {
    display: block;
    margin-bottom: 10px;
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
