import React, { Component } from 'react';

class ConfigDocs extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="docContentSection" id="CONFIG">
        <h2>Configuration</h2>
        <div className="p4">Preview of the current section</div>
        <h4>Subheading</h4>
        <div className="p4">Description of what's going on</div>
        <div className="p4" style={{marginTop : '2vh', marginBottom : '2vh'}}>Here's an example</div>
      </div>
    );
  }
}

export default ConfigDocs;