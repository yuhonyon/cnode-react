import React from 'react';
import {Link} from 'react-router';
import computeTime from '../distance.js'

class Topic extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		let {topics=[]}=this.props;
		
		let block=topics.map((item,index)=>{
			
			const tab1=(item.tab==='share')?"分享":"";
			const tab2=(item.tab==='ask')?'问答':'';
			const tab3=(item.tab==='job')?'招聘':'';
			const tab4=(item.top===true)?'置顶':'';
			const tab5=(item.good===true)?'精华':'';
			const distance=computeTime(item.last_reply_at)
			
			return (
				<div className="list" key={index}>
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
				</div>
			)
		})

		return (
			<div className="topicList">{block}</div>
		)
		
	}
}

export default Topic;