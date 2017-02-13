import React from 'react';
import {Link} from 'react-router';

export default class Read extends React.Component{
	render(){
		const read=this.props.read;
		const block=read.map((item,index)=>{
			return (
				<li key={index} className="list">
					<Link to={`/user/${item.author.loginname}`}>{item.author?item.author.loginname:''}</Link>
					<span>{item.type&&(item.type==='at'?'在话题':''||item.type==='reply'?'回复了你的话题':'')}</span>
					<Link to={`/topic/${item.topic.id}`}>{item.topic?item.topic.title:''}</Link>
					<span>{item.type==='at'?'中@了你':''}</span>
				</li>
			)

		})
		return (
			<div>
				{
					read.length===0?<div className="noMessage">无消息</div>
									:<ul className="messageList">{block}</ul>
				}
			</div>
			
		)
	}
}