import React, { useEffect, useState, useRef } from "react";
import "./Questions.css";
import { useParams, useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import GlobalButton from '../GlobalButton.jsx';

const Questions = () => {
  const studentId = localStorage.getItem("id");
  const email=localStorage.getItem('email')
  const iqcategory=localStorage.getItem("iqCategory");
  const { milestoneId } = useParams();
  const navigate = useNavigate();
  const [isWebcamActive, setIsWebcamActive] = useState(true);
  const [warnings, setWarnings] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [notification, setNotification] = useState({ message: "", visible: false });
  const [progressWidth, setProgressWidth] = useState(0);
  const [warning, setWarning] = useState("");

  // Refs for question options
  const optionA = useRef(null);
  const optionB = useRef(null);
  const optionC = useRef(null);
  const optionD = useRef(null);
  const optionArray = [optionA, optionB, optionC, optionD];

  // Webcam reference
  const videoRef = useRef(null);
  let faceModel, objectModel;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://cognitive-backend-current.onrender.com/questions/${iqcategory}/${milestoneId}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const loadModels = async () => {
      console.log("⏳ Loading models...");
      faceModel = await blazeface.load();
      objectModel = await cocoSsd.load();
      console.log("✅ Models loaded successfully!");
      setupWebcam();
    };

    const setupWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        detectFacesAndObjects();
      } catch (error) {
        console.error("Webcam access error:", error);
        setWarning("⚠️ Webcam access failed. Check camera permissions.");
      }
    };

    const detectFacesAndObjects = async () => {
      setInterval(async () => {
        if (!videoRef.current) return;

        const video = videoRef.current;
        const facePredictions = await faceModel.estimateFaces(video, false);
        const objectPredictions = await objectModel.detect(video);

        console.log("Faces detected:", facePredictions.length);
        console.log("Objects detected:", objectPredictions);

        if (facePredictions.length === 0) {
          const newWarning = "⚠️ No face detected. Please stay in front of the camera.";
          setWarning(newWarning);
          setWarnings((prevWarnings) => [...prevWarnings, newWarning]);
        } else if (facePredictions.length > 1) {
          const newWarning = "⚠️ Multiple faces detected. Ensure you're alone.";
          setWarning(newWarning);
          setWarnings((prevWarnings) => [...prevWarnings, newWarning]);
        } else {
          setWarning("");
        }

        const phoneDetected = objectPredictions.some((obj) => obj.class === "cell phone");
        if (phoneDetected) {
          const newWarning = "⚠️ Phone usage detected. Please put your phone away.";
          setWarning(newWarning);
          setWarnings((prevWarnings) => [...prevWarnings, newWarning]);
        }
      }, 1000);
    };

    fetchQuestions();
    loadModels();
  }, []);

  const showNotification = (message) => {
    setNotification({ message, visible: true });
    setProgressWidth(100);
    const interval = setInterval(() => {
      setProgressWidth((prev) => prev - 1);
    }, 50);

    setTimeout(() => {
      setNotification({ message: "", visible: false });
      clearInterval(interval);
    }, 5000);
  };

  const checkAns = (e, ans, questionId) => {
    if (!lock) {
      const currentQuestion = questions.find((q) => q.id === questionId);
  
      // Check if the selected answer is correct
      const isCorrect = currentQuestion.correctAnswer === ans;
  
      // Update the score
      if (isCorrect) {
        e.target.classList.add("correct");
        setScore((prevScore) => {
          const newScore = prevScore + (isCorrect ? 1 : 0);
          console.log("Updated score:", newScore);
          return newScore;
        });
      } else {
        e.target.classList.add("wrong");
        const correctOption = optionArray.find(
          (option) => option.current.innerText === currentQuestion.correctAnswer
        );
        if (correctOption) {
          correctOption.current.classList.add("correct");
        }
      }
  
      // Calculate and update progress based on score
      const progress = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100; // Progress in percentage
      setProgressWidth(progress); // Update the progress visually
  
      // Lock state to prevent multiple selections
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (currentQuestionIndex === questions.length - 1) {
        setResult(true);
        return;
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setLock(false);
      optionArray.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await fetch("https://cognitive-backend-current.onrender.com/submit-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          milestoneId,
          progress: progressWidth, // Send the final score as progress
        }),
      });
  
      const isPassed = score >= questions.length / 2;
      const nextMilestone = parseInt(milestoneId) + 1;
      if (isPassed) {
        showNotification(`🎉 Congratulations! You've passed! Move to Milestone ${nextMilestone}`);
      } else {
        showNotification(`❌ You failed the Quiz, Try again!`);
      }
  
      // Stop webcam after quiz
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
  
      setIsWebcamActive(false);

      const getUserRole = () => {
        return localStorage.getItem('role'); // Assuming 'role' is stored in localStorage
      };
  
      setTimeout(() => {
        const role = getUserRole(); // You need a function that gets the user's role, e.g., from context, localStorage, or API.
        
        if (role === "teacher") {
          navigate("/admin");  // Navigate to /admin if the role is teacher
        } else {
          navigate("/home");   // Navigate to /home if the role is not teacher
        }
      }, 3000);
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  return (
    <div className="center-2">
      {/* Warning Banner */}
      {warning && (
  <div className="warning-banner">
    {warning}
  </div>
)}


      <div className="container-2">
        <h1>Quiz</h1>
        <hr />
        {notification.visible && (
          <div className="notification">
            <p>{notification.message}</p>
            <div className="timeline">
              <div className="timeline-progress" style={{ width: `${progressWidth}%` }}></div>
            </div>
          </div>
        )}

        {result ? (
          // <button onClick={handleSubmit}>Check Answer</button>
          <GlobalButton onClick={handleSubmit} tooltipText="Check the answer of the questions">
          Check Answer
        </GlobalButton>
        ) : (
          <>
            {questions.length > 0 && (
              <div>
                <h2>{questions[currentQuestionIndex].id}. {questions[currentQuestionIndex].questionText}</h2>
                <ul>
                  <li ref={optionA} onClick={(e) => checkAns(e, "A", questions[currentQuestionIndex].id)}>{questions[currentQuestionIndex].optionA}</li>
                  <li ref={optionB} onClick={(e) => checkAns(e, "B", questions[currentQuestionIndex].id)}>{questions[currentQuestionIndex].optionB}</li>
                  <li ref={optionC} onClick={(e) => checkAns(e, "C", questions[currentQuestionIndex].id)}>{questions[currentQuestionIndex].optionC}</li>
                  <li ref={optionD} onClick={(e) => checkAns(e, "D", questions[currentQuestionIndex].id)}>{questions[currentQuestionIndex].optionD}</li>
                </ul>
              </div>
            )}
            <button onClick={next}>Next</button>
          </>
        )}
      </div>

      {isWebcamActive && (
  <div className="webcam-container">
    <video ref={videoRef} autoPlay muted />
  </div>
)}

    </div>
  );
};

export default Questions;
