import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as Actions from '../actions';
import computeTime from '../distance.js';
import User from '../components/User.js';
import Editorc from '../components/Editor.js';
var converter = new Showdown.converter();

export class Detail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:localStorage.getItem('username')||'',
			acc:localStorage.getItem('loginname')||'',
			reply:''
		}
	}
	componentWillMount() {
		const id=this.props.params.id;
		this.props.topicDetail(id);

		
	}
	componentDidMount() {
		// console.log(this.props);
	}
	//点赞
	handleUp(id){
		const acc=this.state.acc;
		
		this.props.addStar(acc,id);
	}
	//回复
	handleReply(index){
		const ref='reply'+index;
		this.refs[ref].style.display='block';
	}
	getReply(con){
		this.setState({
			reply:con
		})
	}
	//评论
	handleSubmitReply(id,acc,html){

		this.props.addReplies({
			id:id,
			accesstoken:acc,
			content:html
		})
	}
	componentWillReceiveProps(nextProps) {
		
		const acc=localStorage.getItem("loginname")||"";
		const id=this.props.params.id;
		const {state,topicDetail}=this.props;
		const {topic={}}=this.props.state.cnode;
		const {author={}}=topic;
		const {loginname=""}=author;
		const thisId=topic.id||"";
		const nextTopic=nextProps.state.cnode.topic||{};
		const nextAuthor=nextTopic.author||{};
		const username=nextAuthor.loginname||"";
		const nextId=nextTopic.id||"";
		if(loginname!=username||thisId!=nextId){
			this.props.getUserInfo(username);
		}
		if(acc){
			//点赞
			if(state.cnode.star!=nextProps.state.cnode.star&&(nextProps.state.cnode.star==='down'||nextProps.state.cnode.star==='up')){
				topicDetail(id);
			}
			//收藏
			if(state.cnode.collect!=nextProps.state.cnode.collect&&nextProps.state.cnode.collect==='success'){
				topicDetail(id);
			}
			//回复
			if(this.props.state.cnode.rep_succ!=nextProps.state.cnode.rep_succ&&nextProps.state.cnode.rep_succ==='success'){
				topicDetail(id);
			}
			//编辑主题
			if(this.props.state.cnode.update!=nextProps.state.cnode.update&&nextProps.state.cnode.update==='success'){
				// to={`/topic/${topic.id}/edit`}
				window.location=`#/topic/${id}/edit`;
			}
		}else{
			// alert('请先登录！');
			if(this.props.state.cnode.star!=nextProps.state.cnode.star&&nextProps.state.cnode.star==='fail'){
				alert("请先登录");
			}
			
		}
		
	}
	//编辑主题
	handleEdit(){
		const {topic}=this.props.state.cnode;
		const id=topic.id;
		const acc=this.state.acc;
		const tab=topic.tab;
		const title=topic.title;
		const content=topic.content;
		this.props.updateTopic({
			accesstoken:acc,
			tab:tab,
			title:title,
			content:content
		},id)
		// this.props.updateTopic()
	}
	handleClickUp(id){
		const acc=this.state.acc;
		this.props.addStar(acc,id);
		
	}
	//收藏
	handleCollect(){
		const id=this.props.state.cnode.topic.id;
		const acc=this.state.acc;
		this.props.collect(acc,id);

	}
	//取消收藏
	handleCancelCollect(){
		const id=this.props.state.cnode.topic.id;
		const acc=this.state.acc;
		this.props.cancelCollect(acc,id);
	}
	render(){
		const {topic={},collect,userinfo={},star}=this.props.state.cnode;
		const {replies=[],is_collect}=topic;
		const loginname=userinfo.loginname||'';
		const that=this;
		const distance=computeTime(topic.create_at);
		const con=topic.content?converter.makeHtml(topic.content.toString()):"";
		const tab1=topic.top?'置顶':'';
		const tab2=topic.good?'精华':'';
		const tab={'share':'分享','ask':'问答','job':'招聘'};
		const username=this.state.username;
		const acc=this.state.acc;
		const block=replies.map((item,index)=>{
			const distance=computeTime(item.create_at);
			const replyCon=item.content?converter.makeHtml(item.content.toString()):"";
			
			
			const upCount=item.ups.length;
			return (
				<li key={index} className="list">
					<Link className="avatar" to={`/user/${item.author.loginname}`}>
						<img src={item.author.avatar_url}/>
					</Link>
					<div>
						<Link className="name" to={`/user/${item.author.loginname}`}>{item.author.loginname}</Link>
						
						<a className="floor" name={`${item.id}`}>{index+1}•{distance}</a>
						<p className="replyCon" dangerouslySetInnerHTML={{__html:replyCon}}></p>
					</div>
					<div className="operate">
						<span className={item.ups.length==0?'up0':'up'}>
							<i className="icon-c-up" title="赞" onClick={that.handleUp.bind(this,item.id)}></i>
							{upCount==0?"":upCount}
						</span>
						{
							username?<span className="transmit" onClick={that.handleReply.bind(this,index)}><i className="icon-c-transmit" title="回复"></i></span>
									:''
						}
						
					</div>
					<div style={{display:'none'}} ref={`reply${index}`}>
						<Editorc id={`replyOne${index}`} replyId={item.id} handleSubmitReply={that.handleSubmitReply.bind(this)}/>
					</div>
					
				</li>
			)
		})	 
		return (
			<div>
				<div className="panel">
					<div className="article">
						<div className="topic">
							<div className='headline'>
								<span>{tab1||tab2||""}</span>
								{topic.title}
							</div>
							<p className='publish'>
								•发布于{distance}
								•作者<Link to={topic.author?`/user/${topic.author.loginname}`:''}>{topic.author?topic.author.loginname:''}</Link>
								•{topic.visit_count}次浏览
								•最后一次编辑是
								•来自 {tab[topic.tab]||""}
							</p>
							{
								loginname===username?<p className="operate">
														<Link onClick={this.handleEdit.bind(this)} >
															<i className="icon-c-write"></i>
														</Link>
														<Link>
															<i className="icon-c-delete"></i>
														</Link>
													</p>
													:''
							}
							
							{
								username?(is_collect?
									<div className="cancelCollect" onClick={this.handleCancelCollect.bind(this)}>取消收藏</div>
									:<div className="collect" onClick={this.handleCollect.bind(this)}>收藏</div>)
									:""

							}
						</div>
						<div dangerouslySetInnerHTML={{__html: con}} className="con"></div>
						
					</div>
				</div>
				{
					replies.length===0?'':<div className="panel">
											<div className="title">{replies.length}回复</div>
											<ul className="replyList">{block}</ul>
										</div>
				}
				{
					username?<div className="panel">
								<div className="title">添加回复</div>
								<div className="mainer">
									<Editorc id="reply" replyId={topic.id} handleSubmitReply={this.handleSubmitReply.bind(this)}/>
								</div>
							</div>
							:""
				}
				
				<User userinfo={userinfo}/>
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
)(Detail)