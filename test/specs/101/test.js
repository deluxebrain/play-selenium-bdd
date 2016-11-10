'use strict';

var HomePageObject = require("../../page-objects/HomePageObject");

describe('webdriver.io.page', function() {

  var home;

  before(function() {
    home = new HomePageObject();
  });

  it('should have the right title', function() {
    return browser
      .url(home.url)
      .getTitle()
      .should.eventually.equal(home.title);
  });
});
