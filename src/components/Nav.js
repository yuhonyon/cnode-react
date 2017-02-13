import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';

class Nav extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const type=[{tab:'all',name:'全部'},
		{tab:'good',name:'精华'},
		{'tab':'share',name:'分享'},
		{'tab':'ask',name:'问答'},
		{'tab':'job',name:'招聘'}];
		const tab=this.props.tab||'all';
		// console.log(tab);
		return (
			<div className="nav">
				{
					type.map((item,index)=>{
						return (
							<Link key={index} 
							to={`/category/${item.tab}`} 
							className={tab===item.tab?"active":""}>{item.name}</Link>
						)
					})
				}				
			</div>
		)
	}
}

export default Nav;