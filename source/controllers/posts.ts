import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import {ssoDTO} from '../interfaces/sso'
const crypto = require('crypto')

const encryption_key = "byz9VFNtbRQM0yBODcCb1lrUtVVH3D3x"; // Must be 32 characters
const initialization_vector = "X05IGQ5qdBnIqAWD";

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

const getSSO = async (req: Request, res: Response, next: NextFunction) => {
    
    var input = 'ciaoneeeeee';
    var crypted = encrypt(input);
    console.log(crypted);
    var decrypted = decrypt(crypted);
    console.log(decrypted);

    //let post: Post = result.data;
    return res.status(200).json({
        message: "Ciao"
    });
};


/*
// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};
*/

export default { getSSO };
