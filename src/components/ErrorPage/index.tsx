import "./scss/index.scss";

import * as React from "react";
import { EmailLink } from "@components/atoms/EmailLink";
import ReactSVG from "react-svg";
import errorLogo from "@temp/images/auna/error-logo.svg";

const ErrorPage: React.FC = () => (
    <div className="error-page">
        <div className="error-page__error-logo">
            <ReactSVG path={errorLogo} />
        </div>
        <br />
        <br />
        <br />
        <h3 className="error-page__title"><strong>¡Encontraste un error!</strong></h3>
        <br />
        <div className="error-page__message">
            <p>Estamos en versión beta y es posible que encuentres algunos errores. Pedimos disculpas por los inconvenientes. Muy pronto tendremos una versión mejorada para ti.</p>
            <br />
            <p>Para cualquier consulta o sugerencia, por favor escríbenos a:</p>
            <br />
            <p><EmailLink link="ayuda@auna.pe" /></p>
        </div>
    </div>
);

export default ErrorPage;
