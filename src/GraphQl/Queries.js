import { gql } from "@apollo/client";

export const getMainMenus = gql`
  query {
    mainCategoriesAdmin( 
        paginated: false  
        limit: 10 
        offset: 0  
        searchTerm: "" 
        sortBy: "category_title"
        sortOrder: "ASC" 
        ){
            list { 
            id     
            category_title
            enable_add_subcategory 
            category_display_homepage
            category_display_order
            category_type
            category_status
            category_slug
            category_reward_points
            } 
            total 
        }
    }
`;

export const getSubMenus =  gql`
query {
    categoriesMerchant(
        paginated: false
        limit: 10 
        offset: 0 
        searchTerm: "" 
        sortBy: "category_title" 
        sortOrder: "ASC"
        ) {   
            list {
                id    
                category_title 
                category_parent_ids
                enable_add_subcategory 
                category_display_order
                category_type    
                category_status
                category_slug
                parentcategory 
            } 
            total 
        } 
  }
`;
