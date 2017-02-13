import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import * as Actions from '../actions';
class User extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:localStorage.getItem("username")||""
		}
		
	}

	render(){
		const {userinfo={}}=this.props;
		const loginname=userinfo.loginname;
		const username=this.state.username;
		return (
			<div className="user">
				<div className="panel">
					<div className="title">个人信息</div>
					<div className="mainer">
						<div className="info">
							<div className="aname">
								<Link className="avatar" to={`/user/${loginname}`}>
									<img src={userinfo.avatar_url} />
								</Link>
								<Link className="name" to={`/user/${loginname}`}>{loginname}</Link>
							</div>
							<div className="score">积分：{userinfo.score}</div>
							<div className="signature">""</div>
						</div>					
					</div>				
				</div>
				{
					!username||<div className="panel">
									<div className="mainer">
										<Link className="publishTopic" to="/createTopic">发布话题</Link>
									</div>					
								</div>
				}
				
			</div>

		)
	}
}

export default User;