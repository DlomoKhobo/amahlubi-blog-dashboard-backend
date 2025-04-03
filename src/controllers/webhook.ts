import * as User from '../models/users'
import { Webhook } from 'svix'
import { Request, Response, NextFunction } from 'express';

export const clerkWebHook = async (req: Request, res: Response,  next: NextFunction): Promise<any> => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if(!WEBHOOK_SECRET) {
        throw new Error('Webhook secret needed!');
    }

    const payload = req.body;
    //const payload = await req.json()
    //const payloadbody = JSON.stringify(payload)

    const headers = (req.headers['x-access-token'] || req.headers['authorization']) as string;
    //const headers = await req.json()
    //const headersbody = JSON.stringify(headers)

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        //evt = wh.verify(payload, headers);
    } catch (err) {
        /* res.status(400).json({
            message: 'Webhook verification failed!',
        }); */
        console.error('Error verifying webhook:', err)
        return new Response('Error occurred', {
            status: 400
        })
    }

    //console.log(evt.data);

    /* if (evt.type === "user.created") {
       const newUser = new User({
        clerkUserId: evt.data.id,
        username: evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_img_url
       });

       await newUser.save();
    };
 */
    /* return res.status(200).json({
        message: 'Webhook received',
    }); */
    
        return new Response('Webhook received', {
            status: 200
        })
};