export interface ssoDTO{
    endpointSyncOrderUrl: string,
    //Async Order is not used
    endpointDiscountCodeValidationUrl: string,
    apiHeaders: string,
    logoImageUrl: string,
    contactText: string,
    primaryColor: string,
    secondaryColor: string,
    tag: string,
    paymentTypes: string,
    callbackUrl: string,
    projectCode: string,
    userInfo: {
        //rest of data omitted
        email: string;
        credit: number
    }
}