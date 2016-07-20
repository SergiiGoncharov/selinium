'use strict'
//http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    fs = require('fs');

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var post_link_selector = '.wpb_wrapper .item-details .entry-title a';

var capabilities = {
    'browserName': 'phantomjs',
    'phantomjs.page.settings.userAgent':  "Mozilla/5.0 (Windows NT 10.0; rv:47.0) Gecko/20100101 Firefox/47.0"
};
driver.Capabilities = capabilities;

driver.manage().window().setSize(1200, 2000); //not work as expected
driver.get('http://www.pausefun.com/');
driver.wait(until.elementsLocated(By.css(post_link_selector)));
driver.findElement(By.css(post_link_selector)).click().then(e => {
	driver.sleep(5000);
});

driver.wait(() => {
		return driver.executeScript('return document.readyState').then(state => {
			console.log('check ', state);
			return state === 'complete';
		});
	}).then( () => {
		driver.sleep(10*1000)
	}).then( () => {
		console.log('times up');
	});


driver.executeScript('return document.title').then(function(d){console.log(d);});
driver.executeScript('return document.readyState').then(function(d){console.log(d);});



//driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
//driver.wait();


driver.takeScreenshot().then(function(data){
   var base64Data = data.replace(/^data:image\/png;base64,/,"")
   fs.writeFile("out2.png", base64Data, 'base64', function(err) {
        if(err) console.log(err);
   });
});


/*
driver.findElement(By.css('#div-gpt-ad-1466004631028-0')).takeScreenshot(true).then(data => {
	var base64Data = data.replace(/^data:image\/png;base64,/,"")
   fs.writeFile("elem.png", base64Data, 'base64', function(err) {
        if(err) console.log(err);
   });
})
*/
driver.quit();