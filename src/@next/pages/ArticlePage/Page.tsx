import * as React from "react";
import { RichTextContent } from "@components/atoms";
import { Breadcrumb, Breadcrumbs } from "@temp/components";
import { ArticleDetail_page } from "@sdk/queries/gqlTypes/ArticleDetail";
import * as S from "./styles";

interface PageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  page: ArticleDetail_page;
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
        <div className="fa-mt-8 lg:fa-px-4 fa-p-0 fa-mx-auto">
          <img className="fa-w-full lg:fa-rounded-3xl fa-overflow-hidden" alt="page-image" src={page.contentImage} />
        </div>
      ) : (
        <> </>
      )}
    </>
  );

  return (
    <>
      {
        !isMainBlog && <S.Header
          className="fa-mt-8 fa-flex fa-justify-center fa-items-center fa-bg-cover fa-bg-primary-lightest fa-bg-blend-multiply"
          style={headerImage ? { backgroundImage: `url(${headerImage})` } : null}
        >
          <S.Title className="fa-px-8 fa-py-4 fa-text-primary-medium fa-inline-block fa-text-center">
            <span className="fa-text-display-3-m fa-font-semibold">{page.title}</span>
          </S.Title>
        </S.Header>
      }
      <div className="fa-mx-auto fa-my-0">
        {
          isMainBlog && <>{imageSection()}</>
        }

        <div className="container">
          <Breadcrumbs breadcrumbs={breadcrumbs} breadcrumbsAlwaysVisible />
        </div>
        {
          !isMainBlog && <S.Blog className="blog-page">{imageSection()}</S.Blog>
        }
        <div className="container">
          <S.Content className="fa-mx-0 fa-mt-0 fa-mb-14">
            <RichTextContent
              descriptionJson={page.contentJson}
              className="fa-w-full fa-text-left fa-text-neutral-darkest"
            />
          </S.Content>
        </div>
      </div>
    </>
  );
}
export default Page;
