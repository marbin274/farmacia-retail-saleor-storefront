interface CategoryCategoryAncestorsEdgesNode {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

interface CategoryCategoryAncestorsEdges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryCategoryAncestorsEdgesNode;
}

export interface IProps {
  categories: CategoryCategoryAncestorsEdges[];
}
