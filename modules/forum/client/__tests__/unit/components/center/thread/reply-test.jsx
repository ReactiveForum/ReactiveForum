import TestUtils from 'react-addons-test-utils';
import Reply from 'forum/client/components/center/thread/reply';
import { Avatar } from 'material-ui';
import moment from 'moment';

describe('Reply widget', () => {
  var component;
  const foo = {
    onLikeReply: () => { return 1;},
    updateReply: () => {},
    openSnackbar: () => {}
  };

  describe('when user not sign in', () => {
    beforeEach(() => {
      spyOn(foo, 'openSnackbar');
      component = TestUtils.renderIntoDocument(
        <Reply reply={{_id: 1, userId: 1, username: 'Tom', createdAt: new Date(), text: "Hello"}} {...foo}/>
      );
    });

    it ('have avatar of user', () => {
      const avatar = TestUtils.scryRenderedComponentsWithType(component, Avatar);
      expect(avatar.length).toEqual(1);
    });

    it ('display the right reply text', () => {
      const text = TestUtils.findRenderedDOMComponentWithClass(component, 'reply-text');
      expect(text.innerText).toContain("Hello");
    });
    
    it ('display the right username', () => {
      const usr = TestUtils.findRenderedDOMComponentWithClass(component, 'reply-username');
      expect(usr.innerText).toContain("Tom");
    });
    
    it ('display no likes', () => {
      const like = TestUtils.findRenderedDOMComponentWithClass(component, 'reply-like');
      expect(like.innerText).toEqual('Like: ');
    });

    it ('display 1 like', () => {
      component = TestUtils.renderIntoDocument(
        <Reply reply={{username: 'Tom', createdAt: new Date(), text: "Hello", likes: 1}} {...foo}/>
      );
      const like = TestUtils.findRenderedDOMComponentWithClass(component, 'reply-like');
      expect(like.innerText).toEqual('Like: 1');
    });
    
    it ('callback openSnackbar', () => {
      const like =  TestUtils.findRenderedDOMComponentWithClass(component, 'reply-like');
      TestUtils.Simulate.click(like);
      expect(foo.openSnackbar.calls.count()).toEqual(1);
    });
  });

  describe('when user signed in', () => {
    beforeEach(() => {
      spyOn(foo, 'onLikeReply');
      let user = {_id: '1', username: 'Tom'};
      component = TestUtils.renderIntoDocument(
        <Reply currentUser={user} reply={{_id: 1, userId: 1, username: 'Tom', createdAt: new Date(), text: "Hello"}} {...foo}/>
      );
    });

    it ('callback onLikeReply', () => {
      const like =  TestUtils.findRenderedDOMComponentWithClass(component, 'reply-like');
      TestUtils.Simulate.click(like);
      expect(foo.onLikeReply.calls.count()).toEqual(1);
    });
    
  })
})
