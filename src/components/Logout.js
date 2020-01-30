import React from "react";


class Logout extends React.Component {

    componentDidMount() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');

        window.location = '/user/login';
    }


    render() {
        return (
            <div>
                <span>Излизане...</span>
            </div>
        );
    }

}

export default Logout;