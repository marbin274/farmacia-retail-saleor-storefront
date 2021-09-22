import { INavItem, MobileNavList } from '@components/organisms/MobileNav';
import {
  Overlay,
  OverlayContextInterface,
} from '@components/organisms/OverlayComponent';
import { Button } from '@farmacia-retail/farmauna-components';
import { PHONE_NUMBER } from '@temp/core/config';
import { generateCategoryUrl } from '@temp/core/utils';
import Link from 'next/link';
import * as React from 'react';
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
          <Link href={generateCategoryUrl(openParent.id, openParent.name)}>
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
            <div className="fa-font-normal fa-text-sm fa-leading-6 fa-text-black">
              <a
                className="fa-text-primary-medium"
                href="mailto:consultas@farmauna.com"
              >
                consultas@farmauna.com
              </a>
            </div>
          </ContactNavWrapper>
          <ContactPhoneWrapper className="fa-border-t fa-border-solid fa-border-gray-light fa-flex fa-items-center">
            <img
              src="/assets/contact-phone.svg"
              alt="phone-icon"
              width="25"
              height="25"
            />
            <span className="fa-text-h2 fa-leading-6 fa-text-primary-medium fa-font-semibold">
              {PHONE_NUMBER}
            </span>
          </ContactPhoneWrapper>
        </div>
      )}
    </Overlay>
  );
};

export default MobileNav;
