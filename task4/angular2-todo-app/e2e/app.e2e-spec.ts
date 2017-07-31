import { Angular2TodoAppPage } from './app.po';

describe('angular2-todo-app App', () => {
  let page: Angular2TodoAppPage;

  beforeEach(() => {
    page = new Angular2TodoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
