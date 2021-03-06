/* global browser, by, element, protractor */

var Page = require('astrolabe').Page;
const EC = protractor.ExpectedConditions;

module.exports = Page.create({
    interactionsLink : {
        get: function () {
            return element.all(by.css('[href="/interaction"]')).get(0);
        }
    },
    editByName: {
      value: function (interaction) {
          var editLink = element(by.css('[data-edit="' + interaction + '"]'));

          browser.wait(EC.visibilityOf(editLink));
          editLink.click();
          browser.wait(EC.visibilityOf(element(by.css('.component--editor'))));
      }
    },
    resultsByName: {
        value: function (interaction) {
            var viewLink = element(by.css('[data-view="' + interaction + '"]'));

            browser.wait(EC.visibilityOf(viewLink));
            viewLink.click();
            browser.wait(EC.presenceOf(element(by.css('#clearResultsVote'))));
        }
    },
    edit: {
        value: function (index) {
            var editLink = element.all(by.css('.link--edit')).get(index);
            browser.wait(EC.visibilityOf(editLink));

            editLink.click();
            browser.wait(EC.visibilityOf(element(by.css('.component--editor'))));
        }
    },
    saveSuccess: {
        get: function () {
            var saveSuccess = element(by.css('.alert.alert-success'));

            browser.wait(EC.visibilityOf(saveSuccess));

            return saveSuccess;
        }
    },
    liveIcon: {
        value: function (index) {
            return element.all(by.css('.icon--live')).get(index);
        }
    },
    notLiveIcon: {
        value: function (index) {
            return element.all(by.css('.icon--not-live')).get(index);
        }
    }
});