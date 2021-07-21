import prisma from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import assert from 'assert';
const saltRounds = 10;
const jwtSecret = process.env.jwtSecret;

async function findUser(email: string){
    var result = await prisma.users.findUnique({
        where: {
            email: email,
        },
    })
    return result;
}

async function createUser(name: string, email: string, password: string){
    var hash = await bcrypt.hash(password, saltRounds)
    var user = await prisma.users.create({
        data: {
            email: email,
            name: name,
            password: hash,
            settings: {
                "Categories": ["Food and drink", "Travel", "Entertainment", "Homeware"]
            },
            data:{
                create: {
                    title: "Example",
                    value: -23.57,
                    frequency: "weekly",
                    category: "examples"
                }
            }
        },
    })
    return user;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // check if we have all data.
        // The website stops this, but just in case
        try {
            assert.notStrictEqual(null, req.body.email, 'Email required');
            assert.notStrictEqual(null, req.body.password, 'Password required');
            assert.notStrictEqual(null, req.body.name, 'Name required');
        } catch (bodyError) {
            res.status(403).json({error: true, message: bodyError.message});
            return;
        }
        
        var name = req.body.name
        var email = req.body.email
        var password = req.body.password

        var user = await findUser(email)
        if (!user) {
            console.log("creating new user")
            // proceed to Create
            var creationResult = await createUser(name, email, password)
            console.log(creationResult)
            if (creationResult) {
                var user = creationResult;
                var token = jwt.sign(
                    {userId: user.name, email: user.email, id: user.id},
                    jwtSecret,
                    {
                        expiresIn: 3000, //50 minutes
                    },
                );
                res.status(200).json({token});
                return;
            }
            else{
                console.log("failed to create user")
                res.status(500).json({error: true, message: 'Something went wrong crating user account'});
            }
        } else {
            // User exists
            res.status(403).json({error: true, message: 'Email already exists'});
            return;
        }
    }
};