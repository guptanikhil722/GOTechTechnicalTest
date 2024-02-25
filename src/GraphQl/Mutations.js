import { gql } from "@apollo/client";

export const addUpdateStoreMenu = gql`
mutation addUpdateStoreMenu(
    $main_cat_id: Int!
    $child_cats_obj: [child_cats_obj]
    $store_id: Int!
  ) {
    addUpdateStoreMenu(
      main_cat_id: $main_cat_id
      child_cats_obj: $child_cats_obj
      store_id: $store_id
    )
  }
`;