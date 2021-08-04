import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function createData(title: string, value: number, frequency: string, user: any, category: string){
    const result = await prisma.data.create({
        data: {
            title: title,
            value: value,
            frequency: frequency,
            ownerId: user.id,
            category: category
            }
    })
    return result;
}

export default  async(req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body
    console.log("creating Transaction")
    console.log(data)
    if (req.method === 'POST') {        
        var result = await createData(data.title, parseInt(data.value), data.frequency, data.user, data.category)
        res.json(result)
    }
};