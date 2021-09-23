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
    <div className="fa-w-full fa-bg-neutral-light">
      <S.Wraper>
        <Page guest={guest} order={order} />
      </S.Wraper>
    </div>
  );
};

export default OrderDetails;
