import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import * as Actions from '../actions';
export class NoLogin extends React.Component{
	constructor(props){
		super(props);
		
	}

	render(){
		return (
			<div className="user">
				<div className="panel">
					<div className="mainer nologin">
						<h3>CNode：Node.js专业中文社区</h3>
						<div className="login">
							<p>您可以 <Link>登录</Link> 或 <Link>注册</Link> , 也可以</p>
							<Link className="bygithub">通过github登录</Link>
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
)(NoLogin)