export type TicketType = {
    hash: string, 
    url: string, 
    url_type: string, 
}

export type ShowType = {
    id: string,
    title: string, 
    image: string, 
    see_tickets_url_infos: TicketType[]
}