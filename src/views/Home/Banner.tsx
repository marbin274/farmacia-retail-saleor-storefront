import { BannerCarousel } from "@temp/@next/components/containers/BannerCarousel";
import * as React from "react";
import { useHistory } from "react-router-dom";
import "./scss/index.scss";
import { SkeletonBanner } from "./skeleton";

const baseUrlPattern = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})*\/?/;

interface IProps {
    banners?: Array<{ link: string | null, desktop: string, mobile: string }>;
    loading: boolean;
}

export const Banner: React.FC<IProps> = ({ banners, loading }) => {
    const history = useHistory();
    const [showBanner, setShowBanner] = React.useState<boolean>(false);

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
        <div className="banner-container">
            {
                !showBanner && <SkeletonBanner />
            }
            <BannerCarousel>
                {banners.map((banner, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                redirectTo(banner.link);
                            }}
                        >
                            <img
                                alt="banner desktop"
                                className={`banner-image desktop ${loading ? "loading" : ""}`}
                                height={500}
                                src={banner.desktop}
                                width={1920}
                                onLoad={() => setShowBanner(true)}
                            />
                            <img
                                alt="banner mobile"
                                className={`banner-image mobile ${loading ? "loading" : ""}`}
                                height={460}
                                src={banner.mobile}
                                width={360}
                                onLoad={() => setShowBanner(true)}
                            />

                        </div>
                    );
                })}
            </BannerCarousel>

        </div>

    );
}
