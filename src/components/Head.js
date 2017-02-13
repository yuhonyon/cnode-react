import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import * as Actions from '../actions';
export class Head extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:localStorage.getItem("username")||'',
			acc:localStorage.getItem('loginname')||""
		}
	}
	componentWillMount() {
		// console.log(this.props);
		const acc=this.state.acc;
		this.props.getMessage(acc)
	}
	//登录
	handleSubmit(){
		var value=this.refs.acc.value;
		this.props.userLogin({'accesstoken':value});
	}
	//退出
	handleSignOut(){
		this.props.signOut();
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.state.cnode.login=='success'){
			this.setState({
				username:localStorage.getItem('username')
			})
			
		}

		if(nextProps.state.cnode.login==='leave'){
			localStorage.clear();
			this.setState({
				username:""
			})
		}
	}

	render(){
		const username=this.state.username;
		var login=this.props.state.cnode.login;
		return (
			<div className="wrapper">
				<div className="header">
					<div className="headin">
						<Link className="logo" to="/">
							<img src="./src/public/cnode.svg"/>
						</Link>
						<div className="nav">
							<Link to="/">首页</Link>
							{!username||<Link to="/message">未读消息{this.props.state.message.messageNum}</Link>}
							<Link>新手入门</Link>
							<Link>API</Link>
							<Link>关于</Link>
							{username?<Link>设置</Link>:""}
							{username?<Link onClick={this.handleSignOut.bind(this)} to="/">退出</Link>:""}
							{!username?<Link>注册</Link>:""}
							{!username?<Link>登录</Link>:""}
							
						</div>
					</div>
					<input type="text" ref="acc" placeholder="请输入你的accesstoken" />
					<input type="button" value="登录" onClick={this.handleSubmit.bind(this)}/>
					<div className="login">{login}</div>
				</div>
				<div className="main">
					{this.props.children}
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
)(Head)