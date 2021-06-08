import { Button } from "@temp/@next/components/atoms";
import { generateCategoryUrl } from "@temp/core/utils";
import * as React from "react";
import { Link } from "react-router-dom";
import { INavItem, MobileNavList, Overlay, OverlayContextInterface } from "..";

const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const [openParent, setOpenParent] = React.useState<INavItem | null>(null);

  const items: INavItem[] = overlay.context.data;

  return (
    <Overlay context={overlay}>
      <div className="side-nav" onClick={evt => evt.stopPropagation()}>
        <div className={"side-nav--body"}>
        <MobileNavList
          items={items}
          openParent={openParent}
          hideOverlay={overlay.hide}
          setOpenParent={setOpenParent}
        />
        </div>   
        {
        openParent &&
        <div className={"side-nav--actions"}>
          <Link to={generateCategoryUrl(openParent.id, openParent.name)}>
            <Button>Ver todos</Button>
          </Link>
        </div>
      }     
      </div>      
    </Overlay>
  );
};

export default MobileNav;
