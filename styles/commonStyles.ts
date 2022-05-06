import styled from 'styled-components';

export const SizedBox = styled.div<{ width?: number; height?: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const FlexCenter = styled(FlexBox)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(FlexBox)`
  flex-direction: column;
`;

export const ButtonCenter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainCardBox = styled.div`
  height: 200px;
  border-radius: 12px;
  border-top: 1px solid #8e8e8e;
`;

export const TextBox = styled.p<{
  size: string;
  weight?: number;
  center?: boolean;
  marginBottom?: string;
}>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  ${(props) => (props.center ? 'margin: 0 auto' : '')};
  ${(props) => (props.marginBottom ? `margin-bottom: ${props.marginBottom}` : '')};
`;
