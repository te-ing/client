import { useQuery } from 'react-query';
import styled from 'styled-components';
import { MemberTypes } from 'types/team';
import MemberCard from '../MemberCard';

interface Props {
  //   teamId: string | string[];
  memberList: MemberTypes[];
}
const MemberList = ({ memberList }: Props) => {
  //   const { isLoading, isError, error, data } = useQuery(['team-posts', teamId], () => teamsApi.getTeamPosts(teamId));

  return (
    <MemberListWrapper>
      {memberList.map((member) => (
        <MemberCard key={member.memberId} memberInfo={member} />
      ))}
    </MemberListWrapper>
  );
};

export default MemberList;

const MemberListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(364px, 1fr));

  row-gap: 24px;
  column-gap: 24px;
`;
