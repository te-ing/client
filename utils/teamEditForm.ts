import { TeamTypes, TeamEditForm } from 'types/team';

export const teamEditForm = (team: TeamTypes): TeamEditForm => {
  console.log('editForm', team);
  return {
    title: team.title,
    description: team.description,
    team_profile_image: team.teamProfileImage,
    background_image: team.backgroundImage,
  };
};
