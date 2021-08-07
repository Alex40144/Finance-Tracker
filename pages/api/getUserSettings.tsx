import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function getSettings(id: number){
    var result = await prisma.users.findUnique({
        where: {
            id: id,
        },
    })
    if (result == null){
        return
    }
    return result.settings;
}

export default  async(req: NextApiRequest, res: NextApiResponse) => {
    var id: number = Number(req.query.id)
    if (req.method === 'GET') {
        var settings = await getSettings(id)
        res.json(settings)
    }
};