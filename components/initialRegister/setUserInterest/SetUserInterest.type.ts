export interface UserSubCategoryInfoType {
    id: number;
    name: string;
}

export interface UserInterestInfoType {
    id: number;
    mainCategory: string;
    subCategory: UserSubCategoryInfoType[];
}

export interface StyledTagType {
    isActive: boolean;
}