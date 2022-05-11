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
}

export interface TeamEditForm {
  title: string;
  description: string;
  team_profile_image: string;
  background_image: string;
}
