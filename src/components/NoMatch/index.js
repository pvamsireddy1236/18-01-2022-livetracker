import React from 'react';
import { connect } from 'react-redux';

const NoMatch = ()=>{
    return <div>Hello No page Match</div>
};


let mapStateToProps = state => {
    return {
    }
  }
  
export default connect(mapStateToProps)(NoMatch)