import React from 'react';

class Form extends React.Component {

    render() {
        return <div className="form">
            <div className='form-group'>
                <label className="form-label-pattern" htmlFor="inputLarge">Enter the number of your patterns</label>
                <input className="form-control form-control-lg" type="text" id="inputLarge"></input>
            </div>
        </div>
    }
}

export default Form;