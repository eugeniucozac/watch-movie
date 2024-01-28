import classNames from 'classnames';
import { CardType } from './types';

export const Card = ({ children, clxNames }: CardType) => {
    const clx = classNames(
        {
            'w-full': !clxNames
        },
        clxNames
    );

    return (
        <section className={clx}>
            {children}
        </section>
    );
};