import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

//When updating settings, send full settings as it overwrites.
//this way the api doesn't need to know if add/remove

async function updateUserSettings(id: number, settings: any){
    const result = await prisma.users.update({
        where: {
            id: id,
        },
        data: {
            settings: settings
        },
    })
    return result;
}

export default  async(req: NextApiRequest, res: NextApiResponse) => {
    var id: number = req.body.id
    var settings = req.body.settings
    if (req.method === 'POST') {
        var data = await updateUserSettings(id, settings)
        res.json(data)
    }
};