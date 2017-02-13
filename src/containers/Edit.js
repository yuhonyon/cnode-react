import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import Create from '../components/Create.js';
export class Edit extends React.Component{
	constructor(){
		super();
		this.state={
			acc:localStorage.getItem('loginname')||''
		}
	}
	componentWillMount(){
		
		const id=this.props.params.id;
		this.props.topicDetail(id);
	}
	componentWillReceiveProps(nextProps){
		if(this.props.state.cnode.update!=nextProps.state.cnode.update&&nextProps.state.cnode.update==='success'){
			alert(1);
		}
	}
	handleSubmitTopic(title,tab,html){
		const acc=this.state.acc;
		this.props.updateTopic({
			accesstoken:acc,
			title:title,
			content:html,
			tab:tab
		})
	}
	render(){

		const {topic={}}=this.props.state.cnode;
		console.log(topic)
		return (
			<div>
				<div className="panel">
					<div className='title'>
						<Link to='/'>主页</Link>
						<span>/编辑话题</span>
					</div>
					<Create topic={topic} handleSubmitTopic={this.handleSubmitTopic.bind(this)}/>
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
)(Edit)