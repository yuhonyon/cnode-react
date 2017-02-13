const initialState={
	topicList:[],
	page:1,
	limit:0,
	topic:{},
	tab:'',
	login:'',
	collect:'',
	collections:[],
	userinfo:{},
	loading:'',
	mark_result:'',
	rep_succ:'',
	star:'',
	create:'',
	update:''
}


export default function cnode(state=initialState,action){
	switch (action.type){
		case 'GET_TOPICS_REQUEST':
			return ({
				...state,
				loading:action.loading
			})
		case 'GET_TOPICS_SUCC':
			return ({
				...state,
				topicList:action.list,
				page:action.pageNumb,
				limit:action.limit,
				tab:action.tab,
				loading:action.loading

			})
		case 'GET_TOPICS_FAIL':
			return ({
				...state,
				loading:action.loading
			})
		case 'GET_TOPIC_DETAIL':
			return ({
				...state,
				topic:action.topic

			})
		case 'CREATE_TOPIC_REQUEST':
			return ({
				...state,
				create:action.create
			})
		case 'CREATE_TOPIC_SUCC':
			return ({
				...state,
				create:action.create
			})
		case 'CREATE_TOPIC_FAIL':
			return ({
				...state,
				create:action.create
			})
		case 'UPDATE_TOPIC_REQUEST':
			return ({
				...state,
				update:action.update
			})
		case 'UPDATE_TOPIC_SUCC':
			return ({
				...state,
				update:action.update
			})
		case 'UPDATE_TOPIC_FAIL':
			return ({
				...state,
				update:action.update
			})
		case 'COLLECT_REQUEST':
			return ({
				...state,
				collect:action.collect
			})
		case 'COLLECT_SUCC':
			return ({
				...state,
				collect:action.collect
			})
		case 'COLLECT_FAIL':
			return ({
				...state,
				collect:action.collect
			})
		case 'GET_COLLECTION':
			return ({
				...state,
				collections:action.collection
			})
		case 'GET_USERINFO_REQUEST':
			return ({
				...state,
				get:action.get
			})
		case 'GET_USERINFO_SUCC':
			return ({
				...state,
				userinfo:action.userinfo,
				get:action.get
			})
		case 'GET_USERINFO_FAIL':
			return ({
				...state,
				get:action.get
			})
		case 'LOGIN_USER_REQUEST':
			return ({
				...state,
				login:action.login
			})
		case 'LOGIN_USER_SUCC':
			return ({
				...state,
				login:action.login
			})
		case 'LOGIN_USER_FAIL':
			return ({
				...state,
				login:action.login
			})
		case 'SIGN_OUT':
			return ({
				...state,
				login:action.status
			})
		case 'REPLIE_REQUEST':
			return ({
				...state,
				rep_succ:action.rep_succ

			})
		case 'REPLIE_SUCC':
			return ({
				...state,
				rep_succ:action.rep_succ

			})
		case 'REPLIE_FAIL':
			return ({
				...state,
				rep_succ:action.rep_succ

			})
		case 'ADD_STAR_REQUEST':
			return ({
				...state,
				star:action.star
			})
		case 'ADD_STAR_SUCC':
			return ({
				...state,
				star:action.star
			})
		case 'ADD_STAR_FAIL':
			return ({
				...state,
				star:action.star
			})
		case 'MARK_ALL_REQUEST':
			return ({
				...state,
				mark_result:action.mark_result
			})
		case 'MARK_ALL_SUCC':
			return ({
				...state,
				mark_result:action.mark_result
			})
		case 'MARK_ALL_FAIL':
			return ({
				...state,
				mark_result:action.mark_result
			})
		default:
			return state
	}
}