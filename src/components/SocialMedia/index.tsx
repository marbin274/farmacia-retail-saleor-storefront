import React from 'react';
import { SocialMediaIcon } from '..';
import { SOCIAL_MEDIA } from '@temp/core/config';

const SocialMedia: React.FC = () => {
  return (
    <div className="fa-flex fa-flex-col">
      <h5 className="fa-text-neutral-lightest fa-text-sm fa-pl-1.5 fa-mb-9 fa-hidden lg:fa-block">
        Síguenos
      </h5>
      <div className="fa-flex fa-flex-row">
        {SOCIAL_MEDIA.map((media, index) => (
          <SocialMediaIcon
            key={index}
            medium={{
              ariaLabel: media.ariaLabel,
              href: media.href,
              path: media.path,
              rel: media.rel,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default SocialMedia;
