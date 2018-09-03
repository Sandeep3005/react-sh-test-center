import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import './Instructions.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

const styles = {
  root: {
    padding: "1em"
  }
}

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  handleTestStart = () => {
    this.props.history.push('/quiz');
  }

  render() { 
    const { classes } = this.props;
    return ( 
      <div>
        <div className="container">
          <div className="row main-wrapper">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <Paper elevation={2} classes={{ root: classes.root }}>
                <span dangerouslySetInnerHTML={{ __html: this.props.description }} />
                <div className="test-start-btn">
                  <Button variant="contained" color="primary" onClick={this.handleTestStart}>
                    Lets Go!
                  </Button>
                </div>
              </Paper>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div> 
    );
  }
}
 
Instructions.propTypes = {
  description: PropTypes.string
}
Instructions = withStyles(styles)(Instructions)
export default withRouter(Instructions);