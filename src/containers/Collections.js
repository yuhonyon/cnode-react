import React from 'react';
import {Link} from 'react-router';

import * as Actions from '../actions';

import {connect} from 'react-redux';

import Topic from './../components/Topic.js';
import User from './../components/User.js';
export class Collections extends React.Component{
	constructor(){
		super();
	}
	componentWillMount() {
		const loginname=this.props.params.loginname;
		this.props.getCollection(loginname);
		this.props.getUserInfo(loginname);
	}
	render(){
		console.log(this.props);
		let {collections,userinfo={}}=this.props.state.cnode;
		const loginname=this.props.params.loginname||"";
		return (
			<div>
				<div className="panel">
					<div className="title">
						<Link to="/">主页</Link>
						<span>/{loginname}收藏的话题</span>
					</div>
					<Topic topics={collections} />

				</div>
				<User userinfo={userinfo}/>
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
)(Collections)