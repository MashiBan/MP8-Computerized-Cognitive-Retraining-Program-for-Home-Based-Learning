import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const math = await prisma.iQCategory.create({
    data: {
      name: 'Mathematics',
    },
  });

  const science = await prisma.iQCategory.create({
    data: {
      name: 'Science',
    },
  });

  const alice = await prisma.student.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      iqCategoryId: math.id,
    },
  });

  const bob = await prisma.student.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      iqCategoryId: science.id,
    },
  });

  const drSmith = await prisma.teacher.create({
    data: {
      name: 'Dr. Smith',
      email: 'dr.smith@example.com',
      iqCategoryId: math.id,
    },
  });

  const profJohnson = await prisma.teacher.create({
    data: {
      name: 'Prof. Johnson',
      email: 'prof.johnson@example.com',
      iqCategoryId: science.id,
    },
  });

  const algebra = await prisma.milestone.create({
    data: {
      name: 'Basic Algebra',
      iqCategoryId: math.id,
    },
  });

  const physics = await prisma.milestone.create({
    data: {
      name: 'Physics Basics',
      iqCategoryId: science.id,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        questionText: 'What is 2 + 2?',
        optionA: '3',
        optionB: '4',
        optionC: '5',
        optionD: '6',
        correctAnswer: 'B',
        milestoneId: algebra.id,
        iqCategoryId: math.id,
      },
      {
        questionText: 'What is the force of gravity?',
        optionA: '9.8 m/s²',
        optionB: '10 m/s²',
        optionC: '11 m/s²',
        optionD: '12 m/s²',
        correctAnswer: 'A',
        milestoneId: physics.id,
        iqCategoryId: science.id,
      },
    ],
  });

  await prisma.studentProgress.createMany({
    data: [
      {
        studentId: alice.id,
        milestoneId: algebra.id,
        progress: 50,
      },
      {
        studentId: bob.id,
        milestoneId: physics.id,
        progress: 75,
      },
    ],
  });

  console.log('✅ Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
