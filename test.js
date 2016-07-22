'use strict'
//http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    fs = require('fs');
/*
var driver = new webdriver.Builder()
    .forBrowser('edge')
    .build();

*/
var edge = require('selenium-webdriver/edge');
var service = new edge.ServiceBuilder()
 .usingPort(55555)
 .build();
var options = new edge.Options();
// configure browser options ...

var driver = new edge.Driver(options, service);



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
	driver.sleep(3000);
});

let zoom = 0.2;
driver.executeScript(`document.body.style.transform='scale(${zoom}) translate(0, -${(1-zoom)/2/zoom*100}%)'`); //(1-0.9)/2/0.9

driver.wait(() => {
		return driver.executeScript('return document.readyState').then(state => {
			console.log('check ', state);
			return state === 'complete';
		});
	}).then( () => {
		driver.sleep(3*1000);
		//return;
	}).then( () => {
		console.log('times up');
		//return;
	});


let elemmm = driver.findElement(By.css('#div-gpt-ad-1466004631028-2'));

elemmm.takeScreenshot(true).then(function(data){
   var base64Data = data.replace(/^data:image\/png;base64,/,"")
   fs.writeFile("elem.png", base64Data, 'base64', function(err) {
        if(err) console.log(err);
   });
});




driver.takeScreenshot().then(data => {
	var base64Data = data.replace(/^data:image\/png;base64,/,"")
   fs.writeFile("screen.png", base64Data, 'base64', function(err) {
        if(err) console.log(err);
   });
});


driver.executeScript('return document.title').then(function(d){console.log(d);});
driver.executeScript('return document.readyState').then(function(d){console.log(d);});
driver.sleep(1000);
driver.quit();