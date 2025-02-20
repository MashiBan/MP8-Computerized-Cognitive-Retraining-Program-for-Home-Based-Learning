import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import nodemailer from 'nodemailer'
import { parse } from 'dotenv';

const app=express();
const port=3001
app.use(express.json())
const prisma=new PrismaClient()
app.use(cors())

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // 📩 Sender Gmail
    pass: process.env.EMAIL_PASS, // 🔑 App Password
  },
});


app.get('/',(req,res)=>{
    res.send('Hello from backend');
})
// fetching milestones
app.get('/:iqCategoryId/milestone',async(req,res)=>{
    const {iqCategoryId}=req.params;
    const iq=parseInt(iqCategoryId)
    try {
        const milestones=await prisma.milestone.findMany({
            where:{iqCategoryId:iq}
        })
        res.json(milestones);
    } catch (error) {
        res.status(500).json({error:error})
    }
})


// fetching questions
app.get('/questions/:iqCategoryId/:milestoneId',async(req,res)=>{
    const {iqCategoryId,milestoneId}=req.params
    try {
        const questions=await prisma.question.findMany({
            where:{
                iqCategoryId: parseInt(iqCategoryId),
                milestoneId: parseInt(milestoneId),
            },
        })
        res.json(questions);
    } catch (error) {
        res.status(500).json({error:'failed to fetch questions'});
    }
})
// fetching user
app.post('/login',async(req,res)=>{
    const {name,email}=req.body;
    try {
        const user=await prisma.student.findUnique({
            where:{email:email}
        })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          const iqCategory = user.iqCategoryId;
          const id=user.id;
          const name=user.name
          return res.status(200).json({ iqCategory,id,name,email });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Something went wrong, please try again later' });
        }
})

// post socres
app.post('/submit-exam', async (req, res) => {
    const { iqcategory,studentId, milestoneId, score,warnings,email } = req.body;
  
    try {
      // Check if a progress record already exists for the student and milestone
      const existingProgress = await prisma.studentProgress.findFirst({
        where: { studentId: parseInt(studentId), milestoneId: parseInt(milestoneId) },
      });
  
      if (existingProgress) {
        // If progress exists, update the score
        await prisma.studentProgress.update({
          where: { id: existingProgress.id },
          data: { progress: score },
        });
      } else {
        // If no progress exists, create a new record
        await prisma.studentProgress.create({
          data: {
            studentId: parseInt(studentId),
            milestoneId: parseInt(milestoneId),
            progress: parseInt(score),
          },
        });
      }
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender Email
        to: email, // Student's Email (recipient)
        subject: `Milestone ${milestoneId} Quiz Results of ${iqcategory} Exam`,
        html: `
          <h2>Quiz Results for Milestone ${milestoneId}</h2>
          <p><strong>Score:</strong> ${score}</p>
          <h3>Warnings Received:</h3>
          <ul>
            ${warnings.map((warning) => `<li>${warning}</li>`).join("")}
          </ul>
          <p>All the best for your next exam!</p>
        `,
      };
  
      // 🚀 Send the email
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
  
      res.status(200).json({ message: 'Exam submitted successfully', score });
    } catch (error) {
      console.error('Error submitting exam:', error);
      res.status(500).json({ error: 'Error submitting exam results' });
    }
  });

// fetching scores
app.get('/student-progress/:studentId', async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
  
      // Fetch all student progress records along with related milestone IQ category
      const progressData = await prisma.studentProgress.findMany({
        where: { studentId },
        include: {
          milestone: {
            select: {
              iqCategory: true,  // Fetch IQ category from related milestone
            }
          },
        }, // Order by submission date
      });
  
      // Calculate the average score directly from all milestones
      const totalProgress = progressData.reduce((sum, { progress }) => sum + progress, 0);
      const averageProgress = totalProgress / progressData.length;
  
      res.status(200).json({
    
        averageProgress: parseFloat(averageProgress.toFixed(2)),  // Round to 2 decimal places
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

  
app.listen(port,(()=>{
    console.log('app is liestening on the port 3001');
}))