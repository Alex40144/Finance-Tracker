import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function findData(id: number){
    var result = await prisma.data.findMany({
        where: {
            ownerId: id,
        },
        select: {
            title: true,
            value: true,
            frequency: true,
            category: true
          },
    })
    return result;
}

export default  async(req: NextApiRequest, res: NextApiResponse) => {
    var id: number = Number(req.query.id)
    if (req.method === 'GET') {
        var transactions = await findData(id)
        res.json(transactions)
    }
}