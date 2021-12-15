import React, { Component } from 'react';

class DocsConclusion extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="docContentSection" id="CONCLUSION">

        <h2>Conclusion</h2>
        <div className="p4">
          {`We hope you had a positive experience using Inquire to integrate GraphQL into your Kafka project.
          If any questions or issues arise, please feel free to contact a member of the team for further clarification
          or raise the issue on the official Inquire Github page - we'll work on resolving it as soon as possible.`}
        </div>
        <br/>
        <div className="p4" style={{marginLeft: '65%'}}>
          {`Enjoy!    - Team Inquire`}
        </div>

      </div>
    );
  }
}

export default DocsConclusion;