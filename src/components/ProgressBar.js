import React from 'react';

const ProgressBar = ({page}) => {
  return (
    <ul id="progress-bar">
      {[...Array(5)].map((e, i) => {
        return (
          <li key={i}>
            <button type="button" disabled={((i + 1) > page)}></button>
          </li>
        );
      })}
    </ul>
  );
};

export default ProgressBar;
