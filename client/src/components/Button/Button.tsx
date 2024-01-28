import classNames from 'classnames';
import { ButtonType } from './types';

export const Button = ({ children, primary, disabled, clxNames, onClick }: ButtonType) => {
    const clx = classNames(
        clxNames,
        'px-4 py-2 rounded focus:outline-none transition ease-in-out duration-300', 
        {
            'bg-blue-500 hover:bg-blue-700 text-white': primary && !disabled, 
            'bg-gray-300 text-gray-700': !primary && !disabled, 
            'opacity-50 cursor-not-allowed': disabled,
        }
    );

    return (
        <button className={clx} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};