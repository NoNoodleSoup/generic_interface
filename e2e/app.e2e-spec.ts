import { GenericInterfacePage } from './app.po';

describe('generic-interface App', function() {
  let page: GenericInterfacePage;

  beforeEach(() => {
    page = new GenericInterfacePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
