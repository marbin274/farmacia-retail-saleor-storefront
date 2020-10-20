import {IImage} from "@app/types/IImage";
import {INode} from "@app/types/INode";
import {IObjectWithMetadata} from "@app/types/IObjectWithMetadata";

export interface ICategory extends INode, IObjectWithMetadata {
  seoTitle?: string;
  seoDescription?: string;
  name?: string;
  description?: string;
  descriptionJson?: string;
  slug?: string;
  parent?: ICategory;
  level?: number;
  backgroundImage?: IImage;

  // ancestors(...): CategoryCountableConnection
  // products(...): ProductCountableConnection
  // children(...): CategoryCountableConnection
  // translation(...): CategoryTranslation
}
