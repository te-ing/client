export interface ButtonPropsType {
    sort: string;
    name?: string;
    navigateToNext?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}