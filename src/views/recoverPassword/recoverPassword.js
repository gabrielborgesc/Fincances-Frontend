import React from 'react'
import { withRouter } from 'react-router-dom'
import RecoveringPassWord from './recoveringPassword'
import RequestToRecoverPassWord from './requestToRecoverPassword'

class RecoverPassWord extends React.Component {

    state = {
        hash: ''
    }

    componentDidMount(){
        const params = this.props.match.params
        this.setState( {hash: params.hash} )
    }

    render() {
        return(
            <div>
            { this.state.hash ?
                (
                  <RecoveringPassWord push = {this.props.history.push} hash={this.state.hash} />
                ) : 
                (
                  <RequestToRecoverPassWord push = {this.props.history.push} />
                )
            }
        </div>
        )
    }

}

export default withRouter(RecoverPassWord)