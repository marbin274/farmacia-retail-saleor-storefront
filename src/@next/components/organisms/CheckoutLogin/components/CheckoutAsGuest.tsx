import React from 'react';
import { Link } from 'react-router-dom';
import {
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from '@temp/@next/components/organisms/OverlayComponent';
import { Button } from '@farmacia-retail/farmauna-components';
import MedicalHealth from 'images/medical-health.svg';

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
      src={MedicalHealth}
      alt="No soy cliente de Farmauna"
      style={{ maxWidth: '4.5rem' }}
    />
    <span className="fa-mb-6 fa-font-medium fa-text-sm">
      Quiero comprar como:
    </span>
    <Link to={checkoutUrl} className="fa-w-full fa-mb-4">
      <Button size="large" className="fa-w-full">
        Invitado
      </Button>
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
