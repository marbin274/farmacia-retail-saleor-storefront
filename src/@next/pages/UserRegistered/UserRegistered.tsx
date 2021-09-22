import { Button } from '@farmacia-retail/farmauna-components';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

const UserRegistered: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = sessionStorage.getItem('user-registered-email') || null;
    if (userEmail) {
      setEmail(userEmail);
    } else {
      router.push('/login');
    }
    sessionStorage.removeItem('user-registered-email');
  }, []);

  return (
    <div className="fa-h-screen fa-p-0 fa-text-base fa-flex fa-flex-col fa-items-center fa-max-w-full fa-my-16 fa-mx-auto">
      <div className="fa-text-center fa-mb-4">
        <ReactSVG
          className="fa-mx-auto fa-my-0"
          src="/assets/auna/reset-password-mail-sent.svg"
        />
      </div>
      <div className="fa-text-center fa-mb-6 fa-w-full fa-text-xl md:fa-text-2xl">
        <p className="fa-font-semibold">Revisa tu correo electrónico</p>
      </div>
      <div className="fa-text-center fa-mb-6 fa-text-sm fa-w-full">
        <p className="fa-leading-normal fa-text-gray-100 fa-font-medium">
          Hemos enviado las instrucciones para que
          <br /> puedas restaurar la contraseña a <br />
          <strong className="fa-font-semibold">{email}</strong>
        </p>
      </div>
      <div className="fa-grid fa-w-72 fa-text-center">
        <Button
          type="button"
          variant="default"
          onClick={() => {
            router.push('/login');
          }}
        >
          Entendido
        </Button>
      </div>
    </div>
  );
};

export { UserRegistered };
