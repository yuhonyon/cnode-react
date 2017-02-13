import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import User from './../components/User.js';
import Subject from './../components/Subject.js';

export class UserInfo extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount() {
		const loginname=this.props.params.loginname;
		this.props.actions.getUserInfo(loginname);
		this.props.actions.getCollection(loginname);
	}
	render(){
		const {userinfo={},collections=[]}=this.props.state.cnode;
		
		return (
			<div>
				<div>
					<Subject userinfo={userinfo}
						collections={collections}
					/>
				</div>
				<User userinfo={userinfo}/>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	state: state
})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(Actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserInfo)