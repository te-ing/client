export interface ModalPropsType {
    isShowing: boolean;
    hide: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}