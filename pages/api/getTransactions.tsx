import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function findRecurringData(id: number){
    var result = await prisma.data.findMany({
        where: {
            OR: [
              {
                frequency: {
                    contains: 'Weekly',
                },
              },
              {
                frequency: {
                    contains: 'Monthly',
                },
              },
              {
                frequency: {
                    contains: 'Yearly',
                },
              },
            ],
            AND: {
                ownerId: id,
            },
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

async function findSingleData(id: number){
    var result = await prisma.data.findMany({
        where: {
            AND: [
                {
                    frequency: {
                        not: 'Weekly',
                    },
                },
                {
                    frequency: {
                        not: 'Monthly',
                    },
                },
                {
                    frequency: {
                        not: 'Yearly',
                    },
                },
                {
                    ownerId: id,
                },
            ],
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
        if (req.query.recurring == "true")  {
            var transactions = await findRecurringData(id)
            res.json(transactions)
        } else {
            var transactions = await findSingleData(id)
            res.json(transactions)
        }
        
    }
}