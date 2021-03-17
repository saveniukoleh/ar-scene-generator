import React from 'react';

class ProgressBar extends React.Component {

    render() {
        return <div className="progress">
            <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "50%"}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
    }
}

export default ProgressBar;