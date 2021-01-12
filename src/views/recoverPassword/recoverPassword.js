import React from 'react'
import { withRouter } from 'react-router-dom'
import RecoveringPassWord from './recoveringPassword'
import RequestToRecoverPassWord from './requestToRecoverPassword'

class RecoverPassWord extends React.Component {

    state = {
        name: null,
        hash: null
    }

    componentDidMount(){
        const params = this.props.match.params
        this.setState( {name: params.name} )
        this.setState( {hash: params.hash} )
    }

    render() {
        return(
            <div>
            { this.state.name && this.state.hash ?
                (
                  <RecoveringPassWord push = {this.props.history.push} name={this.state.name} hash={this.state.hash} />
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