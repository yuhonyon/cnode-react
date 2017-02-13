
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import {Router,Route,browserHistory,IndexRoute,hashHistory} from 'react-router';

import * as Actions from './actions';

import reducer from './reducers';

import App from './containers/App.js';
import Head from './components/Head.js';
import Collections from './containers/Collections.js';
import Detail from './containers/Detail.js';
import Message from './containers/Message.js';
import CreateTopic from './containers/CreateTopic.js';
import UserInfo from './containers/UserInfo.js';
import CreateReply from './containers/CreateReply.js';
import Edit from './containers/Edit.js';

import './sass/index.scss';
import './css/RichEditor.css';

const store=createStore(
	reducer,
	applyMiddleware(thunk)
)

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>			
			<Route path="/" component={Head}>
				<IndexRoute component={App} />
				<Route path="category/:categorySlug(/:pageNum)" component={App}/>
				<Route path="topic/:id" component={Detail}/>
				<Route path="topic/:id/edit" component={Edit}/>
				<Route path="/user/:loginname" component={UserInfo} />
				<Route path="/collect/:loginname" component={Collections} />
				<Route path="/createtopic(/:topicId)" component={CreateTopic} />
				<Route path="/message" component={Message} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById("root")
)



