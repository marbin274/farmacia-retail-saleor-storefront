import { Button } from "@farmacia-retail/farmauna-components";
import { generateCategoryUrl } from "@temp/core/utils";
import * as React from "react";
import { Link } from "react-router-dom";
import { INavItem, MobileNavList, Overlay, OverlayContextInterface } from "..";

const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const [openParent, setOpenParent] = React.useState<INavItem | null>(null);

  const { categories, collections } = overlay.context.data;

  return (
    <Overlay context={overlay}>
      <div
        className="fa-flex fa-flex-col fa-bg-highlight-lightest side-nav"
        onClick={evt => evt.stopPropagation()}
      >
        <div className={"side-nav--body"}>
          <MobileNavList
            categories={categories}
            collections={collections}
            hideOverlay={overlay.hide}
            openParent={openParent}
            setOpenParent={setOpenParent}
          />
        </div>
      </div>
      {openParent && (
        <div
          className={"fa-mt-auto fa-bg-highlight-lightest side-nav--actions"}
        >
          <Link to={generateCategoryUrl(openParent.id, openParent.name)}>
            <Button>
              <span className="fa-mr-2">Ver todos</span>
            </Button>
          </Link>
        </div>
      )}
      {!openParent && (
        <div className="fa-bg-white info-contact">
          <div className="contact-nav">
            <p>¿Necesitas asesoría?</p>
            <p>
              <a href="mailto:consultas@farmauna.com">consultas@farmauna.com</a>
            </p>
          </div>
          <div className="contact-phone">
            <span>01 3913655</span>
          </div>
        </div>
      )}
    </Overlay>
  );
};

export default MobileNav;
