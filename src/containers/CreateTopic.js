import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import Create from '../components/Create.js';
import axios from 'axios';
export class CreateTopic extends React.Component{
	constructor(){
		super();
		this.state={
			select:'',
			con:'',
			acc:localStorage.getItem('loginname')||""

			
		}
		
	}
	componentWillReceiveProps(nextProps){
		if(this.props.state.cnode.create!=nextProps.state.cnode.create&&nextProps.state.cnode.create==='success'){
			console.log(nextProps);
		}
	}
	handleSubmitTopic(title,tab,html){
		//broswerHistory 如何配置
		//react-router 使用broswerHistory ,服务器环境是webpack-dev-server,如何配置才能刷新的时候不返回404
		const acc=this.state.acc;
		console.log(acc);
		console.log(title);
		console.log(tab);
		console.log(html);
		// console.log(this.props.createTopic);
		this.props.createTopic({
			accesstoken:acc,
			title:title,
			tab:tab,
			content:html
		})
		
	}
	
	handleChange(){
		this.setState({
			select:this.refs.sel.value
		})
	}
	
	render(){
		const topic={};
		return (
			<div>
				<div className="panel">
					<div className="title">
						<Link to="/">主页</Link>
						<span>/ 发布话题</span>
					</div>
					<Create topic={topic} handleSubmitTopic={this.handleSubmitTopic.bind(this)}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps=(state,option)=>({
	state:state,
	route:option
})

export default connect(
	mapStateToProps,
	Actions
)(CreateTopic)