import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';

import computeTime from '../distance.js'
var converter = new Showdown.converter();
class Article extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:localStorage.getItem("username")||""
		}
	}
	render(){
		const topic=this.props.topic;
		const distance=computeTime(topic.create_at);
		const con=topic.content?converter.makeHtml(topic.content.toString()):"";
		const tab1=topic.top?'置顶':'';
		const tab2=topic.good?'精华':'';
		const tab={'share':'分享','ask':'问答','job':'招聘'};
		const collect=this.props.collect;
		const username=this.state.username;
		return (
			<div className="panel">
				<div className="article">
					<div className="topic">
						<div className='headline'>
							<span>{tab1||tab2||""}</span>
							{topic.title}
						</div>
						<p className='publish'>
							•发布于{distance}
							•作者{topic.author?topic.author.loginname:''}
							•{topic.visit_count}次浏览
							•最后一次编辑是
							•来自 {tab[topic.tab]||""}
						</p>
						{!username||collect==="success"?<div className="cancelCollect" onClick={this.props.handleCancelCollect}>取消收藏</div>:<div className="collect" onClick={this.props.handleCollect}>收藏</div>}
					</div>
					<div dangerouslySetInnerHTML={{__html: con}} className="con"></div>
					
				</div>
			</div>
		)
	}
}

export default Article;