import React from 'react'
import {getJwtToken} from '../helpers/jwt';
import {withRouter} from 'react-router-dom'

class Auth extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const token = getJwtToken();
        if (!token) {
            window.location.href = '/user/login';
        }

        fetch(window.$apiURL + '/user', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((res) => {
            if (res.status === 422) {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/user/login';
            }
            return res.json()
        }).then((data) => {
            this.setState({user: data})

        }).catch(err => {
            localStorage.removeItem('token');
            window.location.href = '/user/login';
        });
    }

    render() {
        if (this.state.user === undefined) {
            return (
                <div>
                    <span>Зареждане...</span>
                </div>
            )
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }

}

export default withRouter(Auth)