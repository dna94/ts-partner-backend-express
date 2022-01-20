import { Request, Response, NextFunction, request } from 'express';
import axios, { AxiosResponse } from 'axios';
import {ssoDTO} from '../interfaces/sso'
import { requestBodyDTO, cartItemRequestDTO } from '../interfaces/requestbody';
import { responseBodyDTO } from '../interfaces/responsebody';
const crypto = require('crypto');
const https = require('https');
const CartItem = require('../models/cartitem')
const User = require('../models/user')

const encryption_key = "byz9VFNtbRQM0yBODcCb1lrUtVVH3D3x";
const initialization_vector = "X05IGQ5qdBnIqAWD";

//var sso:ssoDTO;

function encrypt(text: string){
    const cipher = crypto.createCipheriv('aes-256-cbc',Buffer.from(encryption_key), Buffer.from(initialization_vector))
    var crypted = cipher.update(text, 'utf8', 'base64')
    crypted += cipher.final('base64')
    return crypted
}
  
function decrypt(text: string){
    const decipher = crypto.createDecipheriv('aes-256-cbc',Buffer.from(encryption_key), Buffer.from(initialization_vector))
    let dec = decipher.update(text, 'base64', 'utf8')
    dec += decipher.final('utf8')
    return dec
}

//////////////////////////////////////// ENDPOINTS /////////////////////////////////////


// Richiesta POST in ingresso, nel body ci sono i dati dell'SSO
const postSSO = async (req: Request, res: Response, next: NextFunction) => {

    var sso: ssoDTO;

    const encrypted = req.body.sso;
    const decrypted = decrypt(encrypted);
    sso = JSON.parse(decrypted);
    
    //In user salvo i dati utenti utili, per ora solo header per autenticazione/autorizzazione per TS
    const user = new User({
        apiHeaders: JSON.stringify(sso.apiHeaders),
        endpointSyncOrderUrl: sso.endpointSyncOrderUrl,
        date: Date.now()
    })

    await user.save();
    console.log("User Added")

    return res.status(200).json({
        message: "User Added",
        user
    });
};

// Richiesta POST in ingresso, per ora solo il minimo indispensabile (campi obbligatori) per farsi accettare l'acquisto
const addCart = async (req: Request, res: Response, next: NextFunction) => {

    var orderData: cartItemRequestDTO = req.body;

    const cartItem = new CartItem({
        price: orderData.price,
        itemDescription: orderData.itemDescription,
        itemId: orderData.itemId,
        date: Date.now()
    })

    await cartItem.save()
    console.log("CART ITEM ADDED");


    return res.status(200).json({
        message: "Cart item added",
        cartItem
    });

};


const confirmOrder = async (req: Request, res: Response, next: NextFunction) => {
    
    const user:ssoDTO = await User.findOne().sort({date: -1})

    const cartItem:requestBodyDTO = await CartItem.findOne().sort({date: -1})

    console.log("User: ", user);
    console.log("Cart Item: ", cartItem);

    let requestHeaders = JSON.parse(user.apiHeaders);

    //const endpointurl = user.endpointSyncOrderUrl;
    //TEST API
    const endpointurl = 'https://middleware.tantosvago.com/latest/api/1.1/tantosvago/public/partner/order/mock'


    console.log("API HEADERS: ", requestHeaders);


    let responseFromTS: responseBodyDTO = await axios.post(endpointurl, {
        price: cartItem.price,
        itemDescription: cartItem.itemDescription,
        itemId: cartItem.itemId
    }, {headers: requestHeaders});

    return res.status(200).json(responseFromTS.data);
    
    // Se viene risposto OK, possibile anche fare clear delle collection

    // Qua sotto fare la procedura di rollback se la risposta è KO


};











//////////////////////////////////////////////////////////// ENDPOINT DI TEST ///////////////////////////////////////////////////


const tryEncription = async (req: Request, res: Response, next: NextFunction) => {
    var input = 'ping';
    console.log("decrypted 1: ", input)
    input = encrypt(input);
    console.log("encrypted 1: ", input)
    input = decrypt(input);
    console.log("decrypted 2: ", input)
    
    return res.status(200).json({
        message: "ping"
    })
};

const tryGet = async (req: Request, res: Response, next: NextFunction) => {

    var input = req.query.headers;
/*
    const user = await User.findOne(
        {apiHeaders: input}
    )
*/
    const cartItem:requestBodyDTO = await CartItem.findOne(
        {apiHeaders: input}
    )

    //console.log("endpoind: ",user.endpointSyncOrderUrl)
    console.log("cartItem: ", cartItem)

    return res.status(200).json({
        //Qua ci va l'URL del nostro front-end
    });
};

const tryPost = async (req: Request, res: Response, next: NextFunction) => {

    var input = req.body.sso;
    console.log(input);
    return res.status(200).json({
        message: input
        //Qua ci va l'URL del nostro front-end
    });
};

const testSSO = async (req: Request, res: Response, next: NextFunction) => {


    //Ricevo tramite TantoSvago i parametri 

    console.log("Params: ",req.query)

    const latestuser = await User.findOne().sort({date: -1})
    console.log("Latest User: ", latestuser);

    const oldestuser = await User.findOne().sort({date: 1})
    console.log("Oldest User: ", oldestuser);

    const user = new User({
        apiHeaders: req.query.apiHeaders,
        endpointSyncOrderUrl: req.query.endpointSyncOrderUrl
    })

    await user.save();
    console.log("User Added")

    //Passare i dati al front-end(?)

    return res.status(200).json({
        //message: decrypted
        //Qua ci va l'URL(?) del nostro front-end, "ts_partner web application"
    });
};


export default { postSSO, addCart, confirmOrder, tryEncription, tryGet, tryPost, testSSO };
