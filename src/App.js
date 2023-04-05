import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './App.css';

function App() {
  const [courseJSON, setCourseJSON] = useState('');
  const [course, setCourse] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleJSONChange = (event) => {
    setCourseJSON(event.target.value);
  };

  const generateCourse = () => {
    try {
      const courseData = JSON.parse(courseJSON);
      setCourse(courseData);
      setScore(0);
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  const handleAnswerClick = (questionIndex, answerIndex, correct) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: { answerIndex, correct },
    });
  
    if (correct) {
      setScore(score + 1);
    }
  };

  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        E-Learning Web App
      </Typography>
      <TextField
        multiline
        rows={6}
        label="Course JSON"
        variant="outlined"
        value={courseJSON}
        onChange={handleJSONChange}
        fullWidth
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={generateCourse}>
          Generate Course
        </Button>
      </Box>

      {course && (
        <Box mt={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course.introduction}
            </Typography>
            {course.content.map((item, index) => {
              if (item.section === 'explanation') {
                return (
                  <Typography key={index} variant="body1" gutterBottom>
                    {item.text}
                  </Typography>
                );
              } else if (item.section === 'example') {
                return (
                  <pre key={index} style={{ whiteSpace: 'pre-wrap' }}>
                    {item.text}
                  </pre>
                );
              } else if (item.section === 'question') {
                return (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12}>
                      <Typography variant="body1">{item.question}</Typography>
                    </Grid>
                    {item.answers.map((answer, answerIndex) => (
                      <Grid item xs={12} sm={6} key={answerIndex}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleAnswerClick(index, answerIndex, answer.correct)}
                          sx={{
                            borderColor: selectedAnswers[index]?.answerIndex === answerIndex
                              ? answer.correct ? 'green' : 'red'
                              : 'primary.main',
                            color: selectedAnswers[index]?.answerIndex === answerIndex
                              ? answer.correct ? 'green' : 'red'
                              : 'primary.main',
                            backgroundColor: selectedAnswers[index]?.answerIndex === answerIndex
                              ? answer.correct ? 'rgba(0, 255, 0, 0.08)' : 'rgba(255, 0, 0, 0.08)'
                              : 'transparent',
                          }}
                        >
                          {answer.option}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                );
              }
              return null;
            })}
            <Typography variant="body1" gutterBottom>
              {course.conclusion}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Score: {score}
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default App;