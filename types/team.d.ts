type AppliedMemberType = { user: number; memberType: string };

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
  id: number;
  nickname: string;
  postCount: number;
  image: string;
  memberType: string;
  followingCount: number;
  followerCount: number;
}
