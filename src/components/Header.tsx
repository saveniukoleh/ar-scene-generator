import React from 'react';

class Header extends React.Component {
    render() {
        return <div className='header'>
            <div className='alert alert-dismissible alert-info'>
                <strong>You can</strong> download all of the required libraries <a className="alert-link" href='./assets/libraries.zip' download='./assets/libraries.zip'>here</a>.
                <br></br>
                <strong>To read</strong> the documentation follow <a className="alert-link" href="https://github.com/saveniukoleg/ar-scene-generator/wiki">this link</a>.
                </div>
        </div>;
    }
}

export default Header;