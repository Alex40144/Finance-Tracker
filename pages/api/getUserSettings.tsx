import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function findData(id: number){
    var result = await prisma.users.findUnique({
        where: {
            id: id,
        },
    })
    console.log(result.settings)
    return result.settings;
}

export default  async(req: NextApiRequest, res: NextApiResponse) => {
    var id: number = Number(req.query.id)
    if (req.method === 'GET') {
        var data = await findData(id)
        res.json(data)
    }
};