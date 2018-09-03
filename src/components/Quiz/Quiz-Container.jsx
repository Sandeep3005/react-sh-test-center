import React, { Component } from 'react';
import { fire } from '../../Config/Config';
import Quiz from './Quiz'
import { withRouter } from 'react-router';

class QuizContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        questions: '',
        questionCounter: 0,
        userScore: {
          score: 0,
          currectAnswerForQuestion: [],
          wrongAnswerForQuestion: []
        }
     }
  }

  componentWillMount() {
    let testRef = fire.firestore().collection("tests");
    let thisRef = this;

    testRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          let { questions } = doc.data();
          thisRef.setState({ 
            questions,
            totalQuestions: questions.length
          });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  componentWillUpdate(nextProps, nextState) {
    let { questionCounter, totalQuestions, userScore } = nextState; 
    console.log('userScore', userScore)
    if (totalQuestions === questionCounter) {
      nextProps.history.push({pathname: "/result", state: userScore });
    }
  }
  
  getCorrectAnswerNumerical = (value) => {
    let arrayForm = [...value];
    return +arrayForm[arrayForm.length - 1];
  }

  getCurrentQuestion = () => {
    let { questionCounter, questions } = this.state;
    return questions[questionCounter];
  }

  updateUserScore = (selectedValue) => {
    let { questions, questionCounter, userScore } = this.state;
    let { score } = userScore;
    let question = questions[questionCounter];
    let answerPicked = this.getCorrectAnswerNumerical(selectedValue);
    if (question.correctOption === answerPicked) {
      userScore.score = ++score;
      userScore.currectAnswerForQuestion.push(++questionCounter);
    } else {
      userScore.wrongAnswerForQuestion.push(++questionCounter);
    }
    this.setState({ userScore });
  }

  handleAnswerSubmit = (selectedValue) => {
    this.updateUserScore(selectedValue);
    let { questionCounter } = this.state;
    questionCounter++;
    this.setState({ questionCounter });
  }

  render() { 
    let currentQuestion = this.getCurrentQuestion();
    let { questionCounter, totalQuestions } = this.state;
    return (
      <div>
        <Quiz
          question={currentQuestion}
          onAnswerSubmit={this.handleAnswerSubmit}
          questionCounter={questionCounter}
        />
      </div>);

  }
}
 
export default withRouter(QuizContainer);