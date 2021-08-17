import { Button } from '@farmacia-retail/farmauna-components';
import { generateCategoryUrl } from '@temp/core/utils';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  INavItem,
  MobileNavList,
  Overlay,
  OverlayContextInterface,
} from '../..';
import {
  ContactNavWrapper,
  ContactPhoneWrapper,
  MobileNavWrapper,
} from './styles';
const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const [openParent, setOpenParent] = React.useState<INavItem | null>(null);

  const { categories, collections } = overlay.context.data;

  return (
    <Overlay context={overlay}>
      <MobileNavWrapper
        className="fa-flex fa-flex-col fa-bg-highlight-lightest fa-min-h-screen"
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="fa-relative fa-overflow-auto">
          <MobileNavList
            categories={categories}
            collections={collections}
            hideOverlay={overlay.hide}
            openParent={openParent}
            setOpenParent={setOpenParent}
          />
        </div>
      </MobileNavWrapper>
      {openParent && (
        <div className="fa-mt-auto fa-bg-highlight-lightest fa-h-20 fa-p-4 fa-text-center fa-w-full">
          <Link to={generateCategoryUrl(openParent.id, openParent.name)}>
            <Button>
              <span className="fa-mr-2">Ver todos</span>
            </Button>
          </Link>
        </div>
      )}
      {!openParent && (
        <div className="fa-bg-white fa-relative fa-w-full fa-bottom-0">
          <ContactNavWrapper>
            <p className="fa-font-normal fa-text-sm fa-leading-6 fa-text-black">
              ¿Necesitas asesoría?
            </p>
            <p className="fa-font-normal fa-text-sm fa-leading-6 fa-text-black">
              <a
                className="fa-text-primary-medium"
                href="mailto:consultas@farmauna.com"
              >
                consultas@farmauna.com
              </a>
            </p>
          </ContactNavWrapper>
          <ContactPhoneWrapper className="contact-phone fa-border-t fa-border-solid fa-border-gray-light">
            <span className="fa-text-h2 fa-leading-6 fa-text-primary-medium fa-font-semibold">
              01 3913655
            </span>
          </ContactPhoneWrapper>
        </div>
      )}
    </Overlay>
  );
};

export default MobileNav;
