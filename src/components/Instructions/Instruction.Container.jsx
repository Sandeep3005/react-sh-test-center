import React, { Component } from 'react';
import { fire } from '../../Config/Config';
import Instructions from './Instructions';

class InstructionContainer extends Component {
  state = { 
    instructions: ""
   }

  getTest = () => {
     let { params } = this.props.match;
     return 1;
  }

  componentWillMount() {
    let testRef = fire.firestore().collection("tests");
    let thisRef = this;

    testRef.get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          let { description } = doc.data();
          thisRef.setState({ description });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return ( 
    <div>
      <Instructions description={this.state.description}/>
    </div> 
    );
  }
}
 
export default InstructionContainer;