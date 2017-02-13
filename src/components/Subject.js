import React from 'react';
import {Link} from 'react-router';
import computeTime from '../distance.js';

class Subject extends React.Component{
	constructor(){
		super();
	}
	render(){
		const userinfo=this.props.userinfo;
		const {recent_replies=[],recent_topics=[]}=userinfo;
		const distance=computeTime(userinfo.create_at);
		const collectionsCount=this.props.collections.length;
		// console.log(recent_replies)
		// const replies=recent_replies.length>5?recent_replies.slice(0,5):recent_replies;
		// const topics=recent_topics.length>5?recent_topics.slice(0,5):recent_topics;
		return (
			<div>
				<div className="panel">
					<div className="back title">
						<Link to="/">主页</Link>
						<span>/</span>
					</div>
					<div className="mainer">
						<div className="info">
							<div className="aname">
								<Link className="avatar" to={`/user/${userinfo.loginname}`}>
									<img src={userinfo.avatar_url} />
								</Link>
								<Link className="name">{userinfo.loginname}</Link>
							</div>
							<div className="score">{userinfo.score}</div>
							<Link to={`/collect/${userinfo.loginname}`} className="collect">{collectionsCount}个话题收藏</Link>
							<div className="signTime">注册时间{distance}</div>
						</div>	
					</div>
				</div>
				<div className="panel">
					<div className="title">最近创建的话题</div>
					<div className="topicList">
						{
							recent_topics.map((item,index)=>{
								const tab1=(item.tab==='share')?"分享":"";
								const tab2=(item.tab==='ask')?'问答':'';
								const tab3=(item.tab==='job')?'招聘':'';
								const tab4=(item.top===true)?'置顶':'';
								const tab5=(item.good===true)?'精华':'';
								const distance=computeTime(item.last_reply_at)
								
								return (
									<li className="list" key={index}>
										<Link className="avatar" to={`/user/${item.author.loginname}`}>
											<img alt="Avatar" src={item.author.avatar_url} />
										</Link>
										<div className="count">
											<span className="reply">{item.reply_count||0}</span>
											/
											<span className="visit">{item.visit_count||0}</span>
										</div>
										<span className={(tab4||tab5)?"tabActive":"tab"}>{tab4||tab5||tab1||tab2||tab3}</span>
										<span className="distance">{distance}</span>
										<Link className="topic" to={`/topic/${item.id}`}>{item.title}</Link>				
									</li>
								)
							})
						}
						{!recent_topics.length?<div className="noTopic">无话题</div>:<div className="more"><Link to={`/user/${userinfo.loginname}/topics`}>查看更多>></Link></div>}
					</div>
					
				</div>
				<div className="panel">
					<div className="title">最近参与的话题</div>
					<div className="topicList">
						{
							recent_replies.map((item,index)=>{
								const tab1=(item.tab==='share')?"分享":"";
								const tab2=(item.tab==='ask')?'问答':'';
								const tab3=(item.tab==='job')?'招聘':'';
								const tab4=(item.top===true)?'置顶':'';
								const tab5=(item.good===true)?'精华':'';
								const distance=computeTime(item.last_reply_at)
								
								return (
									<li className="list" key={index}>
										<Link className="avatar" to={`/user/${item.author.loginname}`}>
											<img alt="Avatar" src={item.author.avatar_url} />
										</Link>
										<div className="count">
											<span className="reply">{item.reply_count||0}</span>
											/
											<span className="visit">{item.visit_count||0}</span>
										</div>
										<span className={(tab4||tab5)?"tabActive":"tab"}>{tab4||tab5||tab1||tab2||tab3}</span>
										<span className="distance">{distance}</span>
										<Link className="topic" to={`/topic/${item.id}`}>{item.title}</Link>				
									</li>
								)
							})
						}
						{!recent_replies.length?<div className="noTopic">无话题</div>:<div className="more"><Link to={`/user/${userinfo.loginname}/replies`}>查看更多>></Link></div>}
						
					</div>
					
				</div>
			</div>
		)
	}
}

export default Subject;