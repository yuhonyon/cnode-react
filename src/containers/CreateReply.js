import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import Topic from '../components/Topic.js';
export class CreateReply extends React.Component{
	componentWillMount() {
		const loginname=this.props.params.loginname;
		this.props.getUserInfo(loginname);
	}
	render(){
		const loginname=this.props.params.loginname;
		const {userinfo={}}=this.props.state.cnode;
		const {recent_replies=[]}=userinfo;
		console.log(recent_replies);
		return (
			<div>
				<div className="panel">
					<div className="title">
						<Link to="/">主页</Link>
						<span>/</span>
						<Link to={`/user/${loginname}`}>{loginname}的主页</Link>
					</div>
				</div>
				<div className="panel">
					<div className="title">{loginname}参与的话题</div>
					<Topic topics={recent_replies} />
					<div className="pagination">
						<div>
							<Link clasName="last">«</Link>
							<Link>1</Link>
							<Link>2</Link>
							<Link>3</Link>
							<Link className="next">»</Link>
						</div>
						
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps=(state)=>({
	state:state
})

export default connect(
	mapStateToProps,
	Actions
)(CreateReply)
