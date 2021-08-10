import { BannerCarousel } from "@temp/@next/components/containers/BannerCarousel";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { TypedBannerQuery } from "../../queries";
import BannerMobile from "images/auna/home-banner-mob.png";
import BannerDesktop from "images/auna/home-banner-top.png";
import { SkeletonBanner } from "../../skeleton";
import { Banner as BannerData } from "../../gqlTypes/Banner";
import * as S from "./styles";

const baseUrlPattern = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})*\/?/;

type BannerType = {
  link: string | null;
  desktop: string;
  mobile: string;
};

export const Banner: React.FC = () => {
  const history = useHistory();

  const redirectTo = (url?: string) => {
    if (!url) {
      return;
    }
    let result = "";
    const match = baseUrlPattern.exec(url);
    if (match != null) {
      result = match[0];
    }
    if (result.length > 0) {
      url = url.replace(result, "");
    }
    history.push(url);
  };

  const getBannersFromData = (data: BannerData): BannerType[] => {
    return data?.mainBanner?.frames
      ? data?.mainBanner.frames.map(
          (banner): BannerType => {
            const bannerDesktop = banner.images?.find(
              it => it.screenType === "desktop"
            );
            const bannerMobile = banner.images?.find(
              it => it.screenType === "mobile"
            );
            const result: BannerType = {
              link: banner.link,
              desktop: bannerDesktop?.url || "",
              mobile: bannerMobile?.url || "",
            };
            return result;
          }
        )
      : [
          {
            link: null,
            desktop: BannerDesktop,
            mobile: BannerMobile,
          },
        ];
  };

  return (
    <TypedBannerQuery alwaysRender loader={<SkeletonBanner />}>
      {({ data }) => {
        const banners = getBannersFromData(data);

        return (
          <S.BannerWrapper className="fa-relative fa-text-center">
            <BannerCarousel>
              {banners.map((banner, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      redirectTo(banner.link);
                    }}
                  >
                    <span className="fa-w-full fa-my-0 fa-mx-auto sm:fa-hidden">
                      <img
                        className="fa-mx-auto fa-my-0"
                        alt="banner mobile"
                        height={460}
                        src={banner.mobile}
                        width={360}
                      />
                    </span>
                    <span className="fa-w-full fa-my-0 fa-mx-auto fa-hidden sm:fa-block">
                      <img
                        className="fa-mx-auto fa-my-0"
                        alt="banner desktop"
                        height={500}
                        src={banner.desktop}
                        width={1920}
                      />
                    </span>
                  </div>
                );
              })}
            </BannerCarousel>
          </S.BannerWrapper>
        );
      }}
    </TypedBannerQuery>
  );
};