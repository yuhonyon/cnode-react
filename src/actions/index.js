import axios from 'axios';
/*
同步操作只要发出一种Action即可，异步操作的差别是它要发出三种Action。
1.操作发起时的Action
2.操作成功时的Action
3.操作失败时的Action
以向服务器取出数据为例，三种 Action 可以有两种不同的写法。
写法一：名称相同，参数不同
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }

这里采用第二种
 */

//主题

//获取主题列表
let defaultQuery={
	page:1,
	limit:20,
	tab:'all'
}

export const getTopics=(query=defaultQuery)=>dispatch=>{
	const url="https://cnodejs.org/api/v1/topics";
	let topicList=[];
	let postQuery={...defaultQuery,...query};
	dispatch({
		type:'GET_TOPICS_REQUEST',
		loading:'request'
	});
	axios.get(url,{params:postQuery})
	.then(function(response){
		topicList=response.data.data;
		if(topicList){
			dispatch({
				type:'GET_TOPICS_SUCC',
				list:topicList,
				pageNumb:postQuery.page,
				limit:postQuery.limit,
				tab:postQuery.tab,
				loading:'success'
			})
		}
	})
	.catch(function(error){
		dispatch({
			type:'GET_TOPICS_FAIL',
			loading:'fail'
		})
	})

}


//通过id访问主题详情
export const topicDetail=(id)=>dispatch=>{
	const url=`https://cnodejs.org/api/v1/topic/${id}`;
	const accesstoken=localStorage.getItem("loginname")||"";
	let topic={};
	axios.get(url,{
		params:{
			accesstoken:accesstoken
		}
	})
	.then(function(response){
		topic=response.data.data;
		dispatch({
			type:'GET_TOPIC_DETAIL',
			topic:topic
		})
	})
	.catch(function(error){
		console.log(error);
	})
}

//新建主题
let defaultTopic={
	accesstoken:'',
	title:'',
	tab:'',
	content:''
}

export const createTopic=(query=dafaultTopic)=>dispatch=>{
	const url="https://cnodejs.org/api/v1/topics";
	let postQuery={...defaultTopic,...query};
	dispatch({
		type:'CREATE_TOPIC_REQUEST',
		create:'request'
	})
	axios.post(url,postQuery)
	.then((response)=>{
		dispatch({
			type:'CREATE_TOPIC_SUCC',
			create:'success'
		})
	})
	.catch((error)=>{
		dispatch({
			type:'CREATE_TOPIC_FAIL',
			create:'fail'
		})
	})
}

//编辑主题
export const updateTopic=(query=defaultTopic,topic_id)=>dispatch=>{
	const url="https://cnodejs.org/api/v1/topics/update";
	let postQuery={...defaultTopic,...query,topic_id};
	dispatch({
		type:'UPDATE_TOPIC_REQUEST',
		update:'request'
	})
	axios.post(url,postQuery)
	.then((response)=>{
		dispatch({
			type:'UPDATE_TOPIC_SUCC',
			update:'success'
		})
	})
	.catch((error)=>{
		dispatch({
			type:'UPDATE_TOPIC_FAIL',
			update:'fail'
		})
	})
}

//评论
//新建评论
let defaultRep={
	id:'',
	accesstoken:'',
	content:''

}
export const addReplies= (query=defaultRep)=>dispatch=>{
	const url=`https://cnodejs.org/api/v1/topic/${query.id}/replies`;
	const queryNow={
		...defaultRep,
		...query
	}
	dispatch({
		type:'REPLIE_REQUEST',
		rep_succ:'request'
	})
	axios.post(url,queryNow)
	.then((response)=>{
		dispatch({
			type:'REPLIE_SUCC',
			rep_succ:'success'
		})
	})
	.catch((error)=>{
		dispatch({
			type:'REPLIE_FAIL',
			rep_succ:'fail'
		})
	})
}

//为评论点赞
export const addStar=(acc,id)=>dispatch=>{
	const url=`https://cnodejs.org/api/v1/reply/${id}/ups`;
	dispatch({
		type:'ADD_STAR_REQUEST',
		star:'request'
	})
	axios.post(url,{
		accesstoken:acc
	})
	.then((response)=>{
		dispatch({
			type:'ADD_STAR_SUCC',
			star:response.data.action
		})
	})
	.catch((error)=>{
		dispatch({
			type:'ADD_STAR_FAIL',
			star:'fail'
		})
	})

}
//收藏主题
export const collect=(accesstoken,id)=>dispatch=>{
	const url=" https://cnodejs.org/api/v1/topic_collect/collect";
	dispatch({
		type:'COLLECT_REQUEST',
		collect:'request'
	})
	axios.post(url,{
		accesstoken:accesstoken,
		topic_id:id
	})
	.then(function(response){
		if(response.status==200){
			dispatch({
				type:'COLLECT_SUCC',
				collect:'success'
			})
		}
	})
	.catch(function(error){
		dispatch({
			type:'COLLECT_FAIL',
			collect:'fail'
		})
	})
}


//取消收藏
export const cancelCollect=(accesstoken,id)=>dispatch=>{
	const url='https://cnodejs.org/api/v1/topic_collect/de_collect';
	dispatch({
		type:'COLLECT_REQUEST',
		collect:'request'
	})
	axios.post(url,{
		accesstoken:accesstoken,
		topic_id:id
	})
	.then(function(response){
		if(response.status==200){
			dispatch({
				type:'COLLECT_SUCC',
				collect:'success'
			})
		}
	})
	.catch(function(error){
		dispatch({
			type:'COLLECT_FAIL',
			collect:'fail'
		})
	})
}


//获取用户的收藏列表
export const getCollection=(loginname)=>dispatch=>{
	const url=`https://cnodejs.org/api/v1/topic_collect/${loginname}`;
	axios.get(url)
	.then(function(response){
		const collection=response.data;
		dispatch({
			type:'GET_COLLECTION',
			collection:collection.data
		})
	})
	.catch(function(error){

	})
}

//用户
//获取用户信息
export const getUserInfo=(loginname)=>dispatch=>{
	const url=`https://cnodejs.org/api/v1/user/${loginname}`;
	dispatch({
		type:'GET_USERINFO_REQUEST',
		get:'request'
	})
	axios.get(url)
	.then(function(response){
		dispatch({
			type:'GET_USERINFO_SUCC',
			get:'success',
			userinfo:response.data.data
		})
	})
	.catch(function(error){
		dispatch({
			type:'GET_USERINFO_FAIL',
			get:'fail'
		})
	})
}

//登陆
export const userLogin=(data)=>dispatch=>{
	const url="https://cnodejs.org/api/v1/accesstoken";
	dispatch({
		type:'LOGIN_USER_REQUEST',
		login:'request'
	})
	axios.post(url,data)
	.then(function(response){
		if(response.status===200){
			localStorage.setItem('loginname',data.accesstoken);
			localStorage.setItem('username',response.data.loginname);
			dispatch({
				type:'LOGIN_USER_SUCC',
				login:'success'
			})	
		}

	})
	.catch(function(error){
		console.log(error);
		dispatch({
			type:'LOGIN_USER_FAIL',
			login:'fail'
		})
	})
}


//登出
export const signOut=()=>({
	type:'SIGN_OUT',
	status:'leave'
})


//消息通知
//获取未读消息数
export const getMessageNum=(accesstoken)=>dispatch=>{
	const url="https://cnodejs.org/api/v1/message/count";
	axios.get(url,{
		params:{
			accesstoken:accesstoken
		}
	})
	.then((response)=>{
		dispatch({
			type:'GET_MESSAGE_NUM',
			messageNum:response.data.data
		})
	})
	.catch((error)=>{console.log(error)});
}

//获取已读和未读消息
export const getMessage=(accesstoken)=>dispatch=>{
	const url="https://cnodejs.org/api/v1/messages";
	axios.get(url,{
		params:{
			accesstoken:accesstoken
		}
	})
	.then((response)=>{
		const messages=response.data.data;
		dispatch({
			type:'GET_MESSAGE',
			hasRead:messages.has_read_messages,
			hasNotRead:messages.hasnot_read_messages
		})
	})
	.catch((error)=>{console.log(error)});
}

//标记全部已读
export const getMarkAll=(accesstoken)=>dispatch=>{
	const url="https://cnodejs.org/api/v1/messages/mark_all";
	dispatch({
    	type: 'MARK_ALL_REQUEST',
      	mark_result: 'request'
    })
	axios.post(url,{accesstoken:accesstoken})
	.then((response)=>{
		dispatch({
        	type: 'MARK_ALL_SUCC',
          	mark_result: 'success'
        })
	})
	.catch((error)=>{
		dispatch({
			type:'MARK_ALL_FAIL',
			mark_result:'fail'
		})
	})
}


