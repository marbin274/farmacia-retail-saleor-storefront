import * as React from 'react';
import { EmailLink } from '@components/atoms/EmailLink';
import ReactSVG from 'react-svg';
import errorLogo from '@temp/images/auna/error-logo.svg';

export const ErrorPage: React.FC = () => (
  <div className="fa-flex fa-items-center fa-justify-center fa-flex-col fa-text-center fa-pt-40 fa-pb-16 fa-px-4 sm:fa-px-8">
    <div className="fa-pl-12">
      <ReactSVG path={errorLogo} />
    </div>
    <br />
    <br />
    <br />
    <h3 className="fa-text-primary-medium fa-font-semibold fa-tracking-wide">
      <strong>¡Encontraste un error!</strong>
    </h3>
    <br />
    <div className="fa-text-black fa-max-w-2xl fa-leading-5 fa-tracking-wide">
      <p>
        Estamos en versión beta y es posible que encuentres algunos errores.
        Pedimos disculpas por los inconvenientes. Muy pronto tendremos una
        versión mejorada para ti.
      </p>
      <br />
      <p>Para cualquier consulta o sugerencia, por favor escríbenos a:</p>
      <br />
      <EmailLink link="consultas@farmauna.com" />
    </div>
  </div>
);
