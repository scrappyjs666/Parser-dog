import { Nav } from 'components/ui/Nav';
import { HeaderContainer, HeaderWrap } from './styled';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrap>
        <Nav />
      </HeaderWrap>
    </HeaderContainer>
  );
};
