import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import InstructionContainer from './components/Instructions/Instruction.Container';
import QuizContainer from './components/Quiz/Quiz-Container';
import ResultContainer from './components/Result/Result-Container';

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/instructions/:test" component={InstructionContainer} />
          <Route path="/quiz" component={QuizContainer} />
          <Route path="/result" component={ResultContainer} />
        </Switch>
      </div>
    );
  }
}
 
export default AppRoutes;