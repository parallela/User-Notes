import React from 'react'
import { getJwtToken } from '../helpers/jwt';
import { withRouter } from 'react-router-dom'

class Auth extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const token = getJwtToken()
        if(!token) {
            this.props.history.push('/user/login')
        }

        fetch(window.$apiURL + '/user').then((res) =>{
            return res.json()
        }).then((data) =>{
            this.setState({user: data})
        }).catch(err => {
                localStorage.removeItem('token')
                this.props.history.push('/user/login')
        });
    }

    render() {
        if(this.state.user === undefined) {
            return (
                <p>Зареждане....</p>
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