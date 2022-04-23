export interface UserSubCategoryInfoType {
    id: number;
    name: string;
}

export interface UserInterestInfoType {
    mainCategory: string;
    subcategory: UserSubCategoryInfoType[];
}