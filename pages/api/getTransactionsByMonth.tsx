import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import getTransactionsByType from './getTransactionsByType';

async function getTransactions(id: number){
    var result = await prisma.data.findMany({
        where: {
            ownerId: id,
          },
        select: {
            title: true,
            value: true,
            frequency: true,
            category: true,
            date: true
          },
    })
    return result;
}

function parseDate(dateStr: string) {
    var date = dateStr.split('-');
    var day = parseInt(date[0]);
    var month = parseInt(date[1]) - 1; //January = 0
    var year = parseInt(date[2]);
    return new Date(year, month, day); 
}

export default  async(req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body
    var id: number = Number(data.id)
    if (req.method === 'POST') {
        var transactions = await getTransactions(id)
        var target = parseDate(data.target[0])

        var filteredTransactions = [];

        for(var index in transactions) {
            var obj = transactions[index];
            var date = parseDate(obj.date);

            //Filter dates from 2011 and newer
            if(date.getMonth == target.getMonth && date.getFullYear == target.getFullYear)
                filteredTransactions.push(obj);
        }
        res.json(filteredTransactions)
        return
    }

}