import { Button, XIcon } from '@farmacia-retail/farmauna-components';
import { OverlayContextInterface } from '@temp/@next/components/organisms/OverlayComponent/context';
import React, { FC } from 'react';
import { searchProductsService } from '@temp/@next/services/searchProductsService';

type SearchOverlayTitleProps = {
  overlayContext: OverlayContextInterface;
};
export const SearchOverlayTitle: FC<SearchOverlayTitleProps> = ({
  overlayContext,
}) => {
  React.useEffect(() => {
    const suscription = searchProductsService
      .on()
      .subscribe((payload: string) => {
        if (!payload?.length) {
          overlayContext.hide();
        }
      });
    return () => {
      suscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="fa-w-full fa-flex fa-items-center fa-justify-between fa-mb-4">
      <span className="fa-text-neutral-lightest fa-font-semibold fa-text-base fa-leading-5">
        Resultado de búsqueda
      </span>
      <div className="fa-flex fa-items-center fa-mr-2">
        <span className="fa-font-normal fa-text-sm fa-text-neutral-lightest fa-mr-2">
          Cerrar
        </span>
        <Button
          className="fa-bg-highlight-medium"
          size="small"
          iconOnly
          icon={<XIcon color="white" size={12} />}
          onClick={() => {
            overlayContext.hide();
            searchProductsService.hide();
          }}
        ></Button>
      </div>
    </div>
  );
};
