export interface ButtonPropsType {
    sort: string;
    name?: string;
    navigateToInterest?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}