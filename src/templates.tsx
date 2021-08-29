import React from 'react';

/* Important! We use function.name to store the selected template index!
Do not rename these methods after shipping a release with them */

const Templates = [
  function SignatureA(props) {
    return (
      <div>
        -- <br />
        Best,<br />
        {props.name}
      </div>
    );
  },

  function SignatureB(props) {
    return (
      <div>
        -- <br />
        Sincerely,<br />
        {props.name}
      </div>
    );
  },

  function SignatureC(props) {
    return (
      <div>
        -- <br />
        Regards,<br />
        {props.name}
      </div>
    );
  },

  function SignatureD(props) {
    return (
      <div>
        -- <br />
        Best,<br />
        {props.name}<br />
        {props.title}
      </div>
    );
  },

  function SignatureE(props) {
    return (
      <div>
        -- <br />
        Sincerely,<br />
        {props.name}<br />
        {props.title}
      </div>
    );
  },
];

export default Templates;
