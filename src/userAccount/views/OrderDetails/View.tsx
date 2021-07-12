import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Loader } from "@components/atoms";
import { useOrderDetails, useUserDetails } from "@sdk/react";

import Page from "./Page";
import { useDistrictSelected } from "@temp/@next/hooks";
import * as S from "./styles";

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  match: {
    params: { token },
  },
}) => {
  const [district] = useDistrictSelected();
  const { data: order, loading } = useOrderDetails({
    token,
    districtId: district?.id,
  });
  const { data: user } = useUserDetails();
  const guest = !user;

  if (loading) {
    return <Loader />;
  }

  return (
    <S.Wraper className='fa-w-full'>
      <div className="order-details container">
        <Page guest={guest} order={order} />
      </div>
    </S.Wraper>
  );
};

export default View;
