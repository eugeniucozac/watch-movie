import { ReactNode } from 'react';

export type ButtonType = {
    children: ReactNode, 
    primary?: boolean,
    clxNames?: string,
    disabled?: boolean,
    onClick: () => void
}