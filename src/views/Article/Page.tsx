import * as React from "react";
import { RichTextContent } from "@components/atoms";
import { Breadcrumb, Breadcrumbs } from "../../components";
import { Article_page } from "./gqlTypes/Article";

interface PageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  page: Article_page;
}

export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  headerImage,
  page,
}) => {

  const isMainBlog: boolean = page.slug === "blog";

  const imageSection = () => (
    <>
      {page?.contentImage ? (
        <div className="article-page__image container">
          <img alt="page-image" src={page.contentImage} />
        </div>
      ) : (
        <> </>
      )}
    </>
  );

  return (
    <>
      {
        !isMainBlog && <div
          className="article-page__header"
          style={headerImage ? { backgroundImage: `url(${headerImage})` } : null}
        >
          <span className="article-page__header__title">
            <h1>{page.title}</h1>
          </span>
        </div>
      }
      <div className="article-page">
        {
          isMainBlog && <>{imageSection()}</>
        }

        <div className="container">
          <Breadcrumbs breadcrumbs={breadcrumbs} breadcrumbsAlwaysVisible />
        </div>
        {
          !isMainBlog && <div className="blog-page">{imageSection()}</div>
        }
        <div className="container">
          <div className="article-page__container">
            <RichTextContent
              descriptionJson={page.contentJson}
              className="article-page__content"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
