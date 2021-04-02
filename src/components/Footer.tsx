import React from 'react';
import {SOME_TEXT} from '../ts/config';

class Footer extends React.Component {
    render() {
        return <div className='footer'>
            <div className='alert alert-dismissible alert-info'>
                {SOME_TEXT}
            </div>
        </div>;
    }
}

export default Footer;