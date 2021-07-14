import { BannerCarousel } from "@temp/@next/components/containers/BannerCarousel";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { TypedBannerQuery } from "./queries";
import "./scss/index.scss";
import BannerMobile from "images/auna/home-banner-mob.png";
import BannerDesktop from "images/auna/home-banner-top.png";
import { SkeletonBanner } from "./skeleton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const baseUrlPattern = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})*\/?/;

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

    return (
        <TypedBannerQuery
            alwaysRender
            loader={<SkeletonBanner />}
        >
            {
                ({ data }) => {
                    const banners: Array<{ link: string | null, desktop: string, mobile: string }> =
                        data?.mainBanner?.frames ?
                            data?.mainBanner.frames.map((banner): { link: string | null, desktop: string, mobile: string } => {
                                const bannerDesktop = banner.images?.find(
                                    it => it.screenType === "desktop"
                                );
                                const bannerMobile = banner.images?.find(
                                    it => it.screenType === "mobile"
                                );
                                const result: { link: string | null, desktop: string, mobile: string } = {
                                    link: banner.link,
                                    desktop: bannerDesktop?.url || '',
                                    mobile: bannerMobile?.url || '',
                                }
                                return result;
                            })
                            : [{
                                link: null,
                                desktop: BannerDesktop,
                                mobile: BannerMobile,
                            }];

                    return <div className="banner-container">
                        <BannerCarousel>
                            {banners.map((banner, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            redirectTo(banner.link);
                                        }}
                                    >
                                        <span className={`banner-image desktop`}>
                                            <LazyLoadImage
                                                alt="banner desktop"
                                                effect="blur"
                                                height={500}
                                                src={banner.desktop}
                                                width={1920}
                                            />
                                        </span>
                                        <span className={`banner-image mobile`}>
                                            <LazyLoadImage
                                                alt="banner mobile"
                                                effect="blur"
                                                height={460}
                                                src={banner.mobile}
                                                width={360}
                                            />
                                        </span>

                                    </div>
                                );
                            })}
                        </BannerCarousel>

                    </div>
                }
            }
        </TypedBannerQuery>
    );
}
