import React, { useEffect } from 'react';
import styled from 'styled-components';
interface Props {
  TeamId: number;
  editMode?: boolean;
}
const TeamPostList: React.FC<Props> = ({ TeamId, editMode }) => {
  return <ItemList></ItemList>;
};

export default TeamPostList;
