import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { MetaWrapper, NotFound } from "@temp/components";
import { Loader } from "@components/atoms";
import { generatePageUrl, maybe } from "@temp/core/utils";
import { ArticleDetail_shop } from "@sdk/queries/gqlTypes/ArticleDetail";
import Page from "./Page";
import { useArticle } from "@sdk/react";

const canDisplay = (page) =>
  maybe(() => !!page && !!page.title && !!page.contentJson);
const getHeaderImage = (shop: ArticleDetail_shop) =>
  maybe(() => shop.homepageCollection.backgroundImage.url);

type ViewProps = RouteComponentProps<{ slug: string }>;

export const ArticlePage: React.FC<ViewProps> = ({
  match: {
    params: { slug },
  },
}) => {
  const { data, loading } = useArticle({ slug });

  if (loading) {
    return <Loader />;
  }

  const { page, shop } = data;

  if (canDisplay(page)) {
    const breadcrumbs = [
      {
        link: generatePageUrl(slug),
        label: page.title,
      },
    ];
    return (
      <MetaWrapper
        meta={{
          description: page.seoDescription,
          title: page.seoTitle,
        }}
      >
        <Page
          breadcrumbs={breadcrumbs}
          headerImage={getHeaderImage(shop)}
          page={data.page}
        />
      </MetaWrapper>
    );
  }
  if (page === null) {
    return <NotFound />;
  }
};
export default ArticlePage;
