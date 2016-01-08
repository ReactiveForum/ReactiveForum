import { Router, Route, IndexRoute } from 'react-router';
import App from './app';
import Main from './main';
import Landing from './landing';
import Root from './containers/root';

export default (
  <Route component={Root} >
    <Route path="/" component={Landing}/>
    <Route path="/" component={App}>
      <Route path="forum" component={Main} />
      <Route path="forum/:thread" component={Main} />
    </Route>
  </Route>
);

/* export default (
   <Route component={AppWrapper} >
   <Route path="/" component={Landing}/>
   <Route path="/" component={App}>
   <Route path="forum" component={Main} >
   <Route path="featured" component={Features}/>
   <Route path="user/:id" component={User}/>
   <Route path="thread/:id" component={Thread} />
   </Route>
   </Route>
   </Route>
   ); */

