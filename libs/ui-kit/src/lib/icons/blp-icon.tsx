import styled from 'styled-components';

interface IComponentProps {
  iconName: string;
  fontSize?: string;
}

export const BlpIcon = styled.span.attrs<IComponentProps>(
  ({ iconName, className }) => ({
    className: `blp-ic20-${iconName} ${className}`,
  })
)<IComponentProps>`
  font-size: ${(p) => (p.fontSize ? p.fontSize : '20px')};
`;
