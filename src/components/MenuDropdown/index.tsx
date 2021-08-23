import classNames from 'classnames';
import * as React from 'react';
import * as S from './styles';

type Props = {
  content: React.ReactNode;
  head: React.ReactNode;
  suffixClass?: string;
};

const MenuDropdown: React.FC<Props> = (props) => {
  const [active, setActive] = React.useState(false);
  return (
    <div
      data-testid="user-btn"
      className="fa-relative"
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {props.head}
      <S.MenuDropwdownBody
        className={classNames(
          `fa-absolute fa-right-4 fa-top-6 fa-bg-neutral-lightest fa-p-4 fa-w-60 fa-rounded-lg ${props.suffixClass}`,
          {
            'fa-hidden': !active,
            'fa-block fa-z-2': active,
          }
        )}
      >
        {props.content}
      </S.MenuDropwdownBody>
    </div>
  );
};

MenuDropdown.defaultProps = {
  suffixClass: '',
};

export default MenuDropdown;
