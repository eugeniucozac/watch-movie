import classNames from 'classnames';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ShowType } from './types';
import { TicketType } from '../../types';

export const Show = ({ title, imgSrc, soldOut, tickets }:  ShowType) => {
    const clx = {
        wrapper: classNames(
            'flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md text-center',
            { 'grayscale opacity-45': soldOut }
        ),
        content: 'flex flex-col justify-between flex-grow pt-4',
        title: 'text-2xl font-bold px-4 mb-1',
        subTitle: 'text-gray-600 font-semibold',
        img: 'w-full h-full object-cover',
        button: 'w-full text-white rounded-t-none font-semibold mt-2 bg-custom-gradient',
        imgWrapper: classNames(
            'aspect-w-16 aspect-h-9 w-full overflow-hidden',
            { 'grayscale opacity-45': soldOut }
        ),
        sold: 'uppercase font-bold mb-2 mt-1'
    };

    const handleBooking = (tickets: TicketType[]) => {
        const primaryUrl = tickets.find((urlInfo: TicketType) => new URL(urlInfo.url).hostname === 'tktsonline.seetickets.com');
        const secondaryUrl = tickets.find((urlInfo: TicketType) => new URL(urlInfo.url).hostname === 'officiallondontheatre.seetickets.com');
        if (primaryUrl) {
            window.open(primaryUrl.url, '_blank');
        }else{
            return secondaryUrl ? window.open(secondaryUrl.url, '_blank') : window.open('https://officiallondontheatre.com/', '_blank');
        }
    }

    return (
        <Card clxNames={clx.wrapper}>
            <div className={clx.imgWrapper}>
                <img src={imgSrc} alt={title} className={clx.img} />
            </div>
            <div className={clx.content}>
                <div>
                    <h3 className={clx.title}>{title}</h3>
                    {!soldOut && <p className={clx.subTitle}>About the show</p>}
                </div>
                {soldOut 
                    ?
                    <h4 className={clx.sold}>Sold Out</h4>
                    :
                    <Button clxNames={clx.button} onClick={() => handleBooking(tickets)}>
                        Book Now
                    </Button>
                }
            </div>
        </Card>
    );
};