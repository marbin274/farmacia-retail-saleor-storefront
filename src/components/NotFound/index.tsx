import * as React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../core/config";
import { Button } from "@farmacia-retail/farmauna-components";
import * as S from "./styles";
interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = () => (
  <div className="fa-flex fa-items-center fa-justify-center fa-flex-col fa-text-center fa-py-8 fa-px-4">
    <S.NotFoundText className="fa-font-black fa-pb-5">404</S.NotFoundText>
    <S.RulerContent className="fa-mt-4 fa-mb-12" />
    <div>
      <p className="fa-inline sm:fa-block">
        We can’t seem to find a page you are looking for!{" "}
      </p>
      <p className="fa-inline sm:fa-block">
        You may have mistyped the address or the page may have moved.{" "}
      </p>
      <p className="fa-inline sm:fa-block">
        We’re sorry for the error and hope you’ll have a good day.
      </p>
    </div>
    <div className="fa-my-8 fa-mx-0">
      <Link to={BASE_URL}>
        <Button>Back to home</Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
