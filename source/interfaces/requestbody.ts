export interface requestBodyDTO{
    price: number,
    //Async Order is not used
    itemDescription: string,
    itemId: string,
    paymentType?: string,
    requestNo?: string,
    discountSerial?: string,
    discountAmount?: number,

}

export interface cartItemRequestDTO extends requestBodyDTO{
    apiHeaders: string
}