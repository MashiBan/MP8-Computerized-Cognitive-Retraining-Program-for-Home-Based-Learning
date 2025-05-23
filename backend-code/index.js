import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, role } = req.body;

  if (!['STUDENT', 'TEACHER'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be STUDENT or TEACHER.' });
  }

  try {
    const existingUser = await prisma.student.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newUser = await prisma.student.create({
      data: {
        name,
        email,
        role,
      }
    });

    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error during signup' });
  }
});


app.get('/milestones', async (req, res) => {
    try {
      const milestones = await prisma.milestone.findMany({
        include: {
          iqCategory: true,
          questions: true,
        },
      });
  
      res.json(milestones);
    } catch (error) {
      console.error("Error fetching all milestones:", error);
      res.status(500).json({ message: "Failed to fetch milestones" });
    }
  });

  // Get All Milestones (for teacher view)
app.get('/teacher/milestones', async (req, res) => {
    try {
      const milestones = await prisma.milestone.findMany({
        include: {
          iqCategory: true,
          questions: true,
        },
      });
  
      res.json(milestones);
    } catch (error) {
      console.error("Error fetching all milestones:", error);
      res.status(500).json({ message: "Failed to fetch milestones" });
    }
  });
  

  app.get('/students', async (req, res) => {
    try {
      const students = await prisma.student.findMany({
        include: {
          iqCategory: true,
          progress: true,
        },
      });
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch students' });
    }
  });
  
// Get Milestones for a User
app.get('/:userId/milestone', async (req, res) => {
  const { userId } = req.params;

  try {
    const milestones = await prisma.milestone.findMany({
      where: {
        studentProgress: {
          some: {
            studentId: parseInt(userId),
          },
        },
      },
      include: {
        iqCategory: true,
        questions: true,
      },
    });

    if (milestones.length === 0) {
      return res.status(404).json({ message: "No milestones found for this user" });
    }

    res.json(milestones);
  } catch (error) {
    console.error("Error fetching milestones:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

// Get Questions
app.get("/questions/:iqcategory/:milestoneId", async (req, res) => {
  const { iqcategory, milestoneId } = req.params;

  try {
    const questions = await prisma.question.findMany({
      where: {
        iqCategoryId: parseInt(iqcategory),
        milestoneId: parseInt(milestoneId),
      },
    });

    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Submit Exam
app.post('/submit-exam', async (req, res) => {
  try {
    const { studentId, milestoneId, progress } = req.body;

    if (!studentId || !milestoneId || progress === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const result = await prisma.studentProgress.create({
      data: {
        studentId: parseInt(studentId),
        milestoneId: parseInt(milestoneId),
        progress: progress,
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ message: "Server error." });
  }
});


// Create a new Milestone
app.post('/milestones', async (req, res) => {
    const { name, iqCategoryId } = req.body;
  
    // Validation for required fields
    if (!name || !iqCategoryId) {
      return res.status(400).json({ message: "Missing required fields: 'name' and 'iqCategoryId'" });
    }
  
    try {
      const newMilestone = await prisma.milestone.create({
        data: {
          name,
          iqCategoryId: parseInt(iqCategoryId),
        },
      });
      res.status(201).json({ message: "Milestone created successfully", milestone: newMilestone });
    } catch (error) {
      console.error('Error creating milestone:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


// Route to Save a Question
app.post('/questions', async (req, res) => {
    try {
      const { questionText, optionA, optionB, optionC, optionD, correctAnswer, milestoneId } = req.body;
  
      // Ensure required fields are present
      if (!questionText || !optionA || !optionB || !optionC || !optionD || !correctAnswer || !milestoneId) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Insert into the database (example using Prisma)
      const question = await prisma.question.create({
        data: {
          questionText,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer,
          milestoneId,
          iqCategoryId: 1,
        },
      });
  
      res.status(200).json({ success: true, question });
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  

// Get Student Progress
app.get("/student-progress/:id", async (req, res) => {
    const { id } = req.params;
  
    const studentId = parseInt(id, 10);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
  
    try {
      const progress = await prisma.studentProgress.findMany({
        where: { studentId },
        orderBy: { id: 'desc' },
        take: 1,
      });
  
      if (!progress.length) {
        return res.status(404).json({ error: "No progress found" });
      }
  
      const lastProgress = progress[0];
      
      // Instead of returning score, return full progress object
      res.json({ progress: lastProgress });
    } catch (error) {
      console.error("🔥 Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });
  

// Login Route (Dummy)
app.post('/login', async (req, res) => {
  try {
    const { email, name, role } = req.body;

    res.json({
      message: 'Login successful',
      id: 1,
      name,
      email,
      iqCategory: '1',
      role
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
