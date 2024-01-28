import { TicketType } from "../../types"

export type ShowType = {
    title: string, 
    imgSrc: string, 
    soldOut: boolean
    tickets: TicketType[]
}