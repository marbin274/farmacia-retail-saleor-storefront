import { Button } from '@farmacia-retail/farmauna-components';
import {
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from '@temp/@next/components/organisms/OverlayComponent';
import Link from 'next/link';
import React from 'react';

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => (
  <div className="fa-flex fa-flex-col fa-items-center">
    <span className="fa-mb-10 fa-text-2xl fa-font-semibold">
      No soy cliente
    </span>
    <img
      className="fa-mb-6"
      src="/assets/medical-health.svg"
      alt="No soy cliente de Farmauna"
      style={{ maxWidth: '4.5rem' }}
    />
    <span className="fa-mb-6 fa-font-medium fa-text-sm">
      Quiero comprar como:
    </span>
    <Link href={checkoutUrl}>
      <div className="fa-w-full fa-mb-4">
        <Button size="large" className="fa-w-full">
          Invitado
        </Button>
      </div>
    </Link>
    <span className="fa-mb-4 fa-font-medium fa-text-sm">
      ¿No tienes cuenta?
    </span>
    <Button
      size="large"
      className="fa-w-full"
      variant="outline"
      onClick={() => overlay.show(OverlayType.register, OverlayTheme.center)}
    >
      Regístrate
    </Button>
  </div>
);

export default CheckoutAsGuest;
