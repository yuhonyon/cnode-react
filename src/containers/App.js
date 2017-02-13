import React from 'react';


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Link} from 'react-router';

import * as Actions from '../actions';
import Topic from './../components/Topic.js';
import User from './../components/User.js';
import Nav from './../components/Nav.js';
import NoLogin from './../components/NoLogin.js';
export class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:localStorage.getItem("username")||"",
			nowPage:1
		}
	}

	componentWillMount() {
		let username=this.state.username;
		this.props.actions.getTopics({tab:'all'});
		this.props.actions.getUserInfo(username);

		
	}
	componentDidMount() {

	}
	componentWillReceiveProps(nextProps) {
		
		const tab=this.props.params.categorySlug||'all';
		const nextTab=nextProps.params.categorySlug||'all';
		const page=this.props.params.pageNum||1;
		const nextPage=nextProps.params.pageNum||1;
		if(nextTab!=tab||page!=nextPage){
			this.props.actions.getTopics({tab:nextTab,page:nextPage});
		}
		if(nextProps.state.cnode.loading==='fail'){
			alert("加载失败")
		}

	}
	componentWillUpdate(nextProps, nextState) {
		
	}
	componentDidUpdate(prevProps, prevState) {
		
	}
	getTab(){
		
	}
	
	ChangePage(pageNum){
		const {actions,state,params}=this.props;
		actions.getTopics({page:pageNum,tab:params.categorySlug||'all'});
	}
	render(){
		const {state,actions}=this.props;
		const {topicList,userinfo={}}=state.cnode;
		const username=this.state.username;
		const page=[1,2,3,4,5,6];
		const that=this;
		const tab=this.props.params.categorySlug||'all';
		const pageNum=this.props.params.pageNum||1;
		return (
			<div>
				<div className="panel">
					<Nav tab={this.props.params.categorySlug||'all'}/>
					<Topic topics={topicList} 				
					tab={this.props.params.categorySlug||'all'}/>
					<div className="pagination">
						<div>
							<Link className="first">«</Link>
							
							{
								page.map((item,index)=>{
									return (
										<Link key={index} to={`/category/${tab}/${item}`} className={item==pageNum?'active':''}>{item}</Link>
									)
								})
							}
							<Link className="last">»</Link>
						</div>
					</div>
				</div>	
				{username?<User userinfo={userinfo}/>:<NoLogin />}
				
			</div>
		)
	}
}

const mapStateToProps=(state)=>({
	state:state
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)