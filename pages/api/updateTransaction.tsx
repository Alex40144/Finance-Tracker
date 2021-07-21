import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function findData(id: string){
    const result = await prisma.data.findMany({
        where: {
            ownerId: id,
        },
    })
    return result;
}

export default  async(req: NextApiRequest, res: NextApiResponse) => {
    var id = req.query.id
    if (req.method === 'GET') {
        
        var data = await findData(id.toString())
        res.json(data)
    }
};