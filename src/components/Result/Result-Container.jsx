import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'
class ResultContainer extends Component {

  chartBarConfig = {
    labels: ['LEVEL-1', 'LEVEL-2', 'LEVEL-3'],
    datasets: [
      {
        label: 'Score',
        data: [10, 20],
        backgroundColor: [
              'rgb(255,127,80)',
              'rgb(32,178,170)',
              'rgb(178,34,34)'
            ]
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = { dataValueForbars: [10, 20] };
  }

  componentWillMount() {
    const { currectAnswerForQuestion } = this.props.location.state;
    console.log(currectAnswerForQuestion);
    let dataValueForbars = [];
    currectAnswerForQuestion.forEach((answer) => {
      console.log(answer);
      let currentValue = 0;
      switch (answer.difficultyLevel) {
        case 1:
          currentValue = dataValueForbars[0];
          currentValue = currentValue ? currentValue + 1 : 1;
          dataValueForbars.splice(0, 1, currentValue);
          break;
        case 2:
          currentValue = dataValueForbars[1];
          currentValue = currentValue ? currentValue + 1 : 1;
          dataValueForbars.splice(1, 1, currentValue);
          break;
        case 3:
          currentValue = dataValueForbars[2];
          currentValue = currentValue ? currentValue + 1 : 1;
          dataValueForbars.splice(2, 1, currentValue);
      }

      this.setState({
        dataValueForbars
      });
      console.log('data = ', dataValueForbars);
    });
  }

  render() { 
    let { dataValueForbars } = this.state;
    this.chartBarConfig.datasets[0].data = dataValueForbars;
    return ( <div className="abc">
      <Bar
        data={this.chartBarConfig}
        width={400}
        height={500}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }}
      />
    </div> );
  }
}
 
export default ResultContainer;