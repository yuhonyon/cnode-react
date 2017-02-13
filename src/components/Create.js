import React from 'react';
import {Link} from 'react-router';
import Editorc from './Editor.js';

export default class Create extends React.Component{
	constructor(){
		super();
		this.state={
			select:''
		}
	}
	componentDidMount() {
		var editor = new Editor({
			element:document.getElementById('create')
		});
		editor.render();
    	// var html=editor.codemirror.getValue();
    	this.handleClick=()=>{
    		let html=editor.codemirror.getValue();
    		let tab=this.state.select;
    		let title=this.refs.title.value;
    		this.props.handleSubmitTopic(title,tab,html);
    			
    	}    	
    	
	}
	handleChange(){
		this.setState({
			select:this.refs.sel.value
		})
	}
	render(){
		const select=this.state.select;
		const topic=this.props.topic;
		const arr=[
			{value:'',name:'请选择'},
			{value:'share',name:'分享'},
			{value:'ask',name:'问答'},
			{value:'job',name:'招聘'}
		];
		console.log(topic);
		return (
			<div className="mainer">
				<div className="tab">
					<span>选择版块：</span>
					<select ref="sel" defaultValue={topic.tab} onChange={this.handleChange.bind(this)}>
						{
							arr.map((item,index)=>{
								return (
									<option key={index}  value={item.value}>{item.name}</option>
								)
							})
						}
						
					</select>
					{this.state.select==='ask'?<var>提问时，请遵循<a href="">《提问的智慧》</a>中提及的要点，以便您接收到更高质量的回复。</var>:''}
					{this.state.select==='job'?<var>为避免被管理员删帖，发帖时请好好阅读<a href="">《招聘帖规范》</a></var>:''}
					
				</div>
				<div className="topicTitle">
					<input type="text" placeholder="标题字数10字以上" defaultValue={topic.title} ref='title' />
				</div>
				<div className="topicCon">
					<textarea id='create' defaultValue={topic.content}></textarea>
				</div>
				<div className="submitTopic">
					<input type="button" value="提交" onClick={this.handleClick}/>
				</div>
			</div>
		)
	}
}