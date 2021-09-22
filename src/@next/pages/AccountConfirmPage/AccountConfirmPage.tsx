import { useAccountConfirm } from '@temp/@sdk/react';
import { BASE_URL } from '@temp/core/config';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAlert } from 'react-alert';

export const AccountConfirmPage: React.FC = () => {
  const router = useRouter();

  const alert = useAlert();

  const [accountConfirm] = useAccountConfirm();

  const displayConfirmationAlert = (anyErrors) => {
    alert.show(
      {
        content:
          anyErrors.length > 0
            ? anyErrors.map((error) => error.message).join(' ')
            : 'You can now log in',
        title: anyErrors.length > 0 ? 'Error' : 'Account confirmed',
      },
      { type: anyErrors.length > 0 ? 'error' : 'success', timeout: 5000 }
    );
  };

  const handleAccountConfirm = async () => {
    const { data, error } = await accountConfirm({
      email: router.query.email as string,
      token: router.query.token as string,
    });
    if (data?.confirmAccount?.accountErrors) {
      const possibleErrors = data.confirmAccount.accountErrors;
      displayConfirmationAlert(possibleErrors);
    } else if (error) {
      const errors = [
        {
          message: 'Something went wrong while activating your account.',
        },
      ];
      displayConfirmationAlert(errors);
    }
    router.push(BASE_URL);
  };

  React.useEffect(() => {
    if (router.isReady) handleAccountConfirm();
  }, [router.query]);

  return <div></div>;
};

export default AccountConfirmPage;
