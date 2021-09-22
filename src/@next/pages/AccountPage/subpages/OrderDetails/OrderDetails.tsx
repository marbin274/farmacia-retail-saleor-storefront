import * as React from 'react';
import { Loader } from '@components/atoms';
import { useOrderDetails, useUserDetails } from '@sdk/react';
import Page from './Page';
import { useDistrictSelected } from '@temp/@next/hooks';
import * as S from './styles';

export const OrderDetails: React.FC<{ token: string }> = ({ token }) => {
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
    <S.Wraper className="fa-w-full">
      <div className="container">
        <Page guest={guest} order={order} />
      </div>
    </S.Wraper>
  );
};

export default OrderDetails;
