import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
class Editorc extends React.Component{
	constructor(){
		super();
		this.state={
			reply:'',
			acc:localStorage.getItem('loginname')||''
		}
	}
	componentWillReceiveProps(nextProps){
		
	}
	componentDidMount() {
		var id=this.props.id;
		var editor = new Editor({
			element:document.getElementById(id)
		});
		editor.render();
    	// var html=editor.codemirror.getValue();
    	this.handleClick=()=>{
    		var html=editor.codemirror.getValue();
    		var id=this.props.replyId;
    		var acc=this.state.acc;
    		this.props.handleSubmitReply(id,acc,html);    	
    	}    	
    	
	}
	
	render(){

		return (
			<div className="reply">
				<textarea id={this.props.id}></textarea>
				<div className="submitEditor">
					<input type="button" value="提交" onClick={this.handleClick}/>
				</div>
			</div>
			
		)
	}
}
export default Editorc;
