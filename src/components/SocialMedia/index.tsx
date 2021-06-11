import React from 'react'
import { SocialMediaIcon } from '..';
import "./scss/index.scss";
import { SOCIAL_MEDIA } from '@temp/core/config';


const SocialMedia: React.FC = () => {
  return (
    <div className="social_media_container">
      <h5 className="social_media_container__title">Síguenos</h5>
      <div className="social_media_container__icons">
        {SOCIAL_MEDIA.map((media, index) =>
          <SocialMediaIcon
            key={index}
            medium={{
              ariaLabel: media.ariaLabel,
              href: media.href,
              path: media.path,
              rel:media.rel,
            }}
          />
        )}
      </div>
    </div>
  )
}
export default SocialMedia;
