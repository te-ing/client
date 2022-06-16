type AppliedMemberType = { member: number; memberType: string };

export interface TeamTypes {
  id: string;
  title: string;
  description: string;
  leader: number;
  teamProfileImage: string;
  backgroundImage: string;
  postCount: number;
  memberCount: number;
  teamFollowCount: number;
  checkApplied: AppliedMemberType[];
}

export interface TeamEditForm {
  title: string;
  description: string;
  team_profile_image: string;
  background_image: string;
}

export interface MemberTypes {
  memberId: number;
  userId: number;
  nickname: string;
  postCount: number;
  mainCategory?: { mainCategory: string }[];
  subCategory?: { subCategory: string }[];
  image: string;
  memberType: string;
  followingCount: number;
  followerCount: number;
}
