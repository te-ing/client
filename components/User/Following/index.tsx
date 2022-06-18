import React from 'react';
import { FollowButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';
import { following_icon, unfollowing_icon } from 'constants/imgUrl';
import { useMutation, useQueryClient } from 'react-query';
import usersApi from 'apis/users.api';

interface Props {
  userId: string | string[];
  isFollowing: boolean;
}

const Following = ({ userId, isFollowing }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: followMutate } = useMutation(() => usersApi.followUser(userId, { isRequiredLogin: true }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-profile', userId]);
    },
  });

  const followingHandler = () => {
    followMutate();
  };
  return (
    <FollowButton bgColor onClick={followingHandler}>
      {!isFollowing ? (
        <>
          <Image src={following_icon} width={24} height={24} />
          <span>팔로우</span>
        </>
      ) : (
        <>
          <Image src={unfollowing_icon} width={24} height={24} />
          <span>언팔로우</span>
        </>
      )}
    </FollowButton>
  );
};

export default Following;
