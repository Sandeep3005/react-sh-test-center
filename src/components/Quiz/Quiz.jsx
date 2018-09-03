import React, { Component } from 'react';
import {
  Paper, 
  Divider,
  Radio,
  FormControl,
  FormControlLabel,
  Button,
  RadioGroup
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Line } from 'rc-progress';
import './Quiz.css';

const styles = {
  root: {
    padding: "1em"
  },
  buttonRoot: {
    marginRight: "1em"
  }
}

const DIFFICULTY_LEVEL = {
  //Formula for difficulty level
  // 100 divide by total seconds
  "LEVEL_1": Math.floor(100 / 50),
  "LEVEL_2": Math.floor(100 / 100),
  "LEVEL_3": 0.5,
}
//19, 23
class Quiz extends Component {

  listOfClass = ["row", "main-wrapper", "animated", "fadeInDown", "delay-2s"];
  constructor(props) {
    super(props);
    this.state = { 
      shrinkTime: 0,
      value: "",
      disableSubmitButton: false,
      percent: 100,
    }
  }

  setupCountdownTimer = (difficultyLevel) => {
    this.calculateShrinkPercentage(difficultyLevel);
    this.decreaseClock();
  }

  componentWillReceiveProps(nextProps) {
    this.listOfClass.push('animated');
    if (nextProps.question) {
      let { difficultyLevel } = nextProps.question;
      this.setState({ percent: 100 },()=> {
        this.setupCountdownTimer(difficultyLevel);
      });
     
    }
  }

  calculateShrinkPercentage = (difficultyLevel) => {
    this.setState({
      shrinkTime: DIFFICULTY_LEVEL[`LEVEL_${difficultyLevel}`]
    });
  }

  decreaseClock = () => {
    let { percent, shrinkTime } = this.state;
    percent = percent - shrinkTime;
    if (percent <= 0) {
      this.setState({ 
        percent,
        disableSubmitButton: true,
      });
      clearTimeout(this.timerRef);
      return;
    }
    this.setState({ percent });
    this.timerRef = setTimeout(this.decreaseClock, 1000);
  }

  getSingleOption = () => {
    let { question: questionInfo } = this.props;
    if (!questionInfo) return;
    let { options } = questionInfo;
    return Object.keys(options).map((option, index) => {
      return (
        <FormControlLabel
          key={index}
          value={option}
          control={<Radio color="primary" />}
          label={options[option]}
        />
      )
    });
  }

  getOptions = () => {
    let { classes } = this.props;
    return (
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="test"
            name="test2"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
          {this.getSingleOption()}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }

  handleOnSubmit = event => {
    let { value } = this.state;
    if (!value) return;
    clearTimeout(this.timerRef);
    console.log(this.listOfClass);

    this.props.onAnswerSubmit(value);
    this.setState({ value: "" });
  }

  handleOnSkip = event => {
    clearTimeout(this.timerRef);
    console.log(this.listOfClass);
    this.listOfClass = this.listOfClass.filter(function (e) { return e !== 'animated' })


    this.setState({ value: "" });
    this.props.onAnswerSubmit("");
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  renderLoadingContent = () => {
    return (<div>Loading ... </div>)
  }

  renderQuizContent = () => {
    let { classes, question: questionInfo } = this.props;  
    return (
      <div>
        <div>
            {questionInfo && questionInfo.question}
        </div>
        <Divider />
        <div>
          {this.getOptions()}
        </div>
        <Divider />
        <div className="submit-btn">
          <Button 
            disabled={this.state.disableSubmitButton}
            classes={{ root: classes.buttonRoot }} 
            variant="contained" 
            color="primary" 
            onClick={this.handleOnSubmit}>
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleOnSkip}>
            Skip
          </Button>
        </div>
      </div>
    )
  }

  render() { 
    let { classes, question: questionInfo} = this.props;  
    console.log(this.listOfClass.toString().split(',').join(' '));
    return (
      <div>
        <div className="container">
          <div className={this.listOfClass.toString().split(',').join(' ')}>
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <Paper elevation={2} classes={{ root: classes.root }}>
                {questionInfo ? this.renderQuizContent() : this.renderLoadingContent()}
              </Paper>
              {questionInfo ? <Line strokeWidth="1" percent={this.state.percent} /> : null}
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div> 
    );
  }
}
 
export default withStyles(styles)(Quiz);


