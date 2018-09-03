import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'
class ResultContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: {
        labels: ['LEVEL-1', 'LEVEL-2', 'LEVEL-3'],
        datasets: [
          {
            label: 'Score',
            data: [10, 20, 30],
            backgroundColor: [
              'rgb(255,127,80)',
              'rgb(32,178,170)',
              'rgb(178,34,34)'
            ]
          }
        ]
      }
     }
  }
  render() { 
    console.log(this.props.location.state);
    let { data } = this.state;
    return ( <div>
      <Bar
        data={data}
        width={300}
        height={100}
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