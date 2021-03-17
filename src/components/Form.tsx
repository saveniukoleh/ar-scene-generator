import React from 'react';

class Form extends React.Component {
    state = {
        value: '',
    }

    constructor(props: any) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event: any) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event: any) {
        event.preventDefault();
        if (!this.state.value) return;
        console.log(this.state.value);
    }

    render() {
        return <div className="form">
            <div className='form-group'>
                <label className="form-label-pattern" htmlFor="inputLarge">Enter the number of your patterns</label>
                <input className="form-control form-control-lg" type="text" id="inputLarge" onChange={this.handleChange}></input>
            </div>
            <button className="btn btn-primary btn-lg" onClick={this.handleSubmit}>Submit</button>
        </div>
    }
}

export default Form;