import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function findData(id: string){
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
    console.log(result)
    return result;
}

export default  async(req: NextApiRequest, res: NextApiResponse) => {
    var id = req.query.id.toString()
    if (id == 'undefined'){
        res.status(500).json({error: true, message: 'no id sent with request'});
        return;
    }
    if (req.method === 'GET') {
        var data = await findData(id)
        res.json(data)
    }
};