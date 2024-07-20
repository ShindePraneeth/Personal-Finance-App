import styled from 'styled-components';

const Card = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

export default Card;