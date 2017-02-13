import React from 'react';
import {Link} from 'react-router';
import * as Actions from '../actions';
import {connect} from 'react-redux';
import Read from '../components/Read.js';
export class Message extends React.Component{
	constructor(){
		super();
		this.state={
			acc:localStorage.getItem("loginname")||''
		}
	}
	componentWillMount(){
		const acc=this.state.acc;
		this.props.getMessage(acc);
	}
	render(){
		const {has_read=[],has_not_read=[]}=this.props.state.message;
		return (
			<div>
				<div className="panel">
					<div className="title">
						<Link to="/">主页</Link>
						<span>/新消息</span>
					</div>
					
					<Read read={has_not_read}/>
				</div>
				<div className="panel">
					<div className="title">过往消息</div>

					<Read read={has_read}/>
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
)(Message)