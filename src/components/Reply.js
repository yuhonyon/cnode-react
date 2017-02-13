import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';

import computeTime from '../distance.js'
import * as Actions from '../actions';
import Editorc from './Editor.js';
console.log(Editorc);
var converter = new Showdown.converter();
export class Reply extends React.Component{
	constructor(props){
		super(props);
		this.state={
			id:''
		}
	}
	handleUp(id){
		const acc=localStorage.getItem("loginname")||"";
		// if(!acc){
		// 	alert("请先登录！");
		// }else{
		// 	this.setState({id:id});
		// 	this.props.addStar(acc,id);
		// }
		this.props.addStar(acc,id);
	}
	componentWillReceiveProps(nextProps) {
		const acc=localStorage.getItem("loginname")||"";
		const id=this.props.paramsId;
		if(acc){
			if(this.props.state.cnode.star!=nextProps.state.cnode.star&&(nextProps.state.cnode.star==='down'||nextProps.state.cnode.star==='up')){
				this.props.topicDetail(id);
			}
		}
	}
	render(){
		const {star,topic={}}=this.props.state.cnode;
		const {replies=[]}=topic;
		const that=this;
		const id=this.state.id;
		const acc=localStorage.getItem("loginname")||"";
		
		const block=replies.map((item,index)=>{
			const distance=computeTime(item.create_at);
			const replyCon=item.content?converter.makeHtml(item.content.toString()):"";
			// const upCount=item.ups.length;
			//赞是up,取消赞down
			const classnames=(id===item.id&&star==="down"?'active':'')+" icon-c-up";
			//先判断我是否有赞过，如何判断我是否赞过勒
			const upCount=item.ups.length;
			// const upCount=item.ups.length+((id===item.id&&star==="down"?-1:"")||(id===item.id&&star==="up"?1:""));
			return (
				<li key={index} className="list">
					<Link className="avatar">
						<img src={item.author.avatar_url}/>
					</Link>
					<div>
						<Link className="name">{item.author.loginname}</Link>
						<Link className="floor">{index+1}•{distance}</Link>
						<p className="replyCon" dangerouslySetInnerHTML={{__html:replyCon}}></p>
					</div>
					<div className="operate">
						<span className={item.ups.length==0?'up0':'up'}>
							<i className={classnames} title="赞" onClick={that.handleUp.bind(this,item.id)}></i>
							{upCount==0?"":upCount}
						</span>
						<span className="transmit"><i className="icon-c-transmit" title="回复"></i></span>
					</div>
					<div className="reply">
						<Editorc />
					</div>
				</li>
			)
		})	
		return (
			<div className="panel">
				<div className="title">{replies.length}回复</div>
				<ul className="replyList">{block}</ul>
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
)(Reply)