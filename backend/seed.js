const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main(){
await prisma.transaction.createMany({
data: [
{ description: 'Salary', amount: 3000, category: 'Income', type: 'INCOME', date: new Date() },
{ description: 'Groceries', amount: 120.5, category: 'Food', type: 'EXPENSE', date: new Date() },
{ description: 'Gym', amount: 45, category: 'Health', type: 'EXPENSE', date: new Date() }
]
});
console.log('Seeded.');
}


main()
.catch(e => console.error(e))
.finally(() => prisma.$disconnect());