import { OverlayContext } from '@components/organisms/OverlayComponent';
import { useUserDetails } from '@sdk/react';
import { checkoutUrl } from '@temp/app/routes/paths';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import CheckoutAsGuest from './components/CheckoutAsGuest';
import ResetPasswordForm from './components/ResetPasswordForm';
import SignInForm from './components/SignInForm';
import * as S from './styles';

export const CheckoutLogin: React.FC<{}> = () => {
  const router = useRouter();
  const [resetPassword, setResetPassword] = useState(false);
  const [tabSelected, setTabSelected] = useState<
    'ScreenSignIn' | 'ScreenAsGuest'
  >('ScreenSignIn');
  const overlay = useContext(OverlayContext);
  const { data: user } = useUserDetails();

  React.useEffect(() => {
    if (user) {
      router.push(checkoutUrl);
    }
  }, [user]);

  const setToSignIn = () => setTabSelected('ScreenSignIn');
  const setToGuest = () => setTabSelected('ScreenAsGuest');
  const isGuest = tabSelected === 'ScreenAsGuest';
  const isSignIn = tabSelected === 'ScreenSignIn';
  return (
    <S.CheckoutLoginContainer className="fa-p-0 fa-relative fa-z-0">
      <S.Container>
        <div className="fa-flex fa-bg-white fa-rounded-full fa-h-14 fa-items-center fa-justify-around lg:fa-hidden lg:fa-mt-0 fa-mt-4">
          <div
            className={`
                ${
                  isSignIn ? 'fa-text-brand-01' : 'fa-text-gray-02'
                } fa-font-semibold fa-cursor-pointer fa-text-center
              `}
            style={{ width: 'calc(50% - 1px)' }}
            onClick={setToSignIn}
          >
            Soy cliente
          </div>
          <div className="fa-w-px fa-h-4 fa-bg-neutral-medium" />
          <div
            className={`
                ${
                  isGuest ? 'fa-text-brand-01' : 'fa-text-gray-02'
                } fa-font-semibold fa-cursor-pointer fa-text-center
              `}
            style={{ width: 'calc(50% - 1px)' }}
            onClick={setToGuest}
          >
            No soy cliente
          </div>
        </div>
        <div className="fa-block lg:fa-flex fa-gap-x-14 fa-grid-cols-2">
          <div
            className={`
                fa-bg-white fa-rounded-3xl fa-w-full fa-px-8 fa-pt-10 fa-pb-7 sm:fa-p-16 fa-my-6 block lg:fa-block ${
                  isSignIn ? 'fa-block' : 'fa-hidden'
                }
              `}
          >
            {resetPassword ? (
              <ResetPasswordForm
                onClick={() => {
                  setResetPassword(false);
                }}
              />
            ) : (
              <SignInForm
                onClick={() => {
                  setResetPassword(true);
                }}
              />
            )}
          </div>
          <div
            className={`
                fa-bg-white fa-rounded-3xl fa-w-full fa-px-8 fa-pt-10 fa-pb-7 sm:fa-p-16 fa-my-6 lg:fa-block ${
                  isGuest ? 'fa-block' : 'fa-hidden'
                }
              `}
          >
            <CheckoutAsGuest overlay={overlay} checkoutUrl={checkoutUrl} />
          </div>
        </div>
      </S.Container>
    </S.CheckoutLoginContainer>
  );
};
