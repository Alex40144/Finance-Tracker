import prisma from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import assert from 'assert';
const saltRounds = 10;
const jwtSecret = process.env.jwtSecret;

async function findUser(email: string){
    const result = await prisma.users.findUnique({
        where: {
            email: email,
        },
    })
    return result;
}

async function authUser(email: string, password: string) {
    var user = await findUser(email);
    if (user == null) {return false}
    var result = bcrypt.compare(password, user.password);
    return result;
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // check if we have all data.
        // The website stops this, but just in case
        try {
            assert.notStrictEqual(null, req.body.email, 'Email required');
            assert.notStrictEqual(null, req.body.password, 'Password required');
        } catch (bodyError) {
            res.status(403).json({error: true, message: bodyError.message});
        }

        const email = req.body.email;
        const password = req.body.password;

        var user = await findUser(email)
        if(user){
            var result = await authUser(email, password)
            if (result) {
                const token = jwt.sign(
                    {name: user.name, email: user.email, id:user.id},
                    jwtSecret,
                    {
                        expiresIn: 3000, //50 minutes
                    },
                );
                res.status(200).json({token});
                return;
            } else {
            res.status(401).json({error: true, message: 'Wrong email or password'});
            return;
            }
        }
        else {
            res.status(403).json({error: true, message: 'Wrong email or password'});
            return;
        }
    }
};


  