import React, { useState, Fragment } from 'react';
import * as S from './styles';
import Image from 'next/image';
import ProfileEdit from '../ProfileEdit';
import { camera_icon, default_profile } from 'constants/imgUrl';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';
import { numberWithCommas } from 'utils/numberWithCommas';
import UploadProduct from '../UploadProduct';
import { User } from 'types/user';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { ProfileIcon, CameraIcon, CameraIconWrapper, ProfileWrapper } from 'components/common/Atomic/Profile';
import { UseMutateFunction } from 'react-query';
import { AxiosResponse } from 'axios';
import Following from 'components/User/Following';
import Message from 'components/User/Message';

const UserInfo: React.FC = ({ children }) => {
  return <S.InfoWrapper>{children}</S.InfoWrapper>;
};

// interface Props {
//   editMode?: boolean;
//   info: User;
//   editModeOnOff?: (flag: boolean) => () => void;
//   testFormHook?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
//   userInfoMutate?: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>;
// }
// const UserInfo: React.FC<Props> = ({ editMode, info, editModeOnOff, testFormHook, userInfoMutate }) => {
//   return (
//     <S.InfoWrapper>
//       <S.ProfileImg>
//         {editMode ? (
//           <ImageUploadWrapper name="editProfile">
//             <ProfileWrapper>
//               <ProfileIcon
//                 alt="icon-profile"
//                 src={!info.profileImage ? default_profile : info.profileImage}
//                 width={116}
//                 height={116}
//               />
//               <CameraIconWraper direction="left">
//                 <CameraIcon alt="icon-camera" src={camera_icon} width={24} height={24} />
//               </CameraIconWraper>
//               {/* <S.ImgWrapper alt="icon-camera" src={camera_icon} width={36} height={36} /> */}
//             </ProfileWrapper>
//           </ImageUploadWrapper>
//         ) : (
//           <ProfileWrapper>
//             <S.ImgWrapper
//               alt="icon-profile"
//               src={!info.profileImage ? default_profile : info.profileImage}
//               width={116}
//               height={116}
//             />
//           </ProfileWrapper>
//         )}
//       </S.ProfileImg>
//       <S.InfoSection>
//         <h1>{info.nickname}</h1>
//         <S.InfoDescription>
//           {/* <div>
//             {info.categories.map((ability) => (
//               <Keyword key={ability.id}>{ability.name}</Keyword>
//             ))}
//           </div> */}
//           <S.FollowInfo>
//             <span>팔로워</span>
//             <span>{numberWithCommas(info.followerCount)}</span>
//             <span>팔로잉</span>
//             <span>{numberWithCommas(info.followingCount)}</span>
//           </S.FollowInfo>
//           {editMode ? (
//             <S.DescriptionArea name="description" onChange={testFormHook} placeholder="사용자 소개를 입력해주세요." />
//           ) : (
//             <p>{info.description}</p>
//           )}
//         </S.InfoDescription>
//       </S.InfoSection>
//       <S.InfoAside>
//         {editMode ? (
//           <>
//             <ProfileEdit editMode={editMode} editModeOnOff={editModeOnOff} />
//             {!editMode && <UploadProduct />}
//           </>
//         ) : (
//           <>
//             <Following />
//             <Message />
//           </>
//         )}
//       </S.InfoAside>
//     </S.InfoWrapper>
//   );
// };

export default UserInfo;
