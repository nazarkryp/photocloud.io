import { PhotocloudPage } from './app.po';

describe('photocloud App', () => {
  let page: PhotocloudPage;

  beforeEach(() => {
    page = new PhotocloudPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
