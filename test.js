'use strict'
//http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    fs = require('fs');

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.manage().window().setSize(1600, 5000); //not work as expected
driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('http://www.pausefun.com/top-40-fails-blondes-spectaculaires-web/');
driver.findElement(By.name('btnG')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 11000);
driver.wait(until.elementsLocated(By.className('r')), 11000);
driver.findElement(By.css('.r > a')).click();
driver.executeScript('return document.title').then(function(d){console.log(d);});
driver.executeScript('return document.readyState').then(function(d){console.log(d);});



driver.manage().timeouts().implicitlyWait(10*1000, function(){console.log('times end')});




//driver.wait(function(){return false;}, 10000);
//driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
//driver.wait();

driver.takeScreenshot().then(function(data){
   var base64Data = data.replace(/^data:image\/png;base64,/,"")
   fs.writeFile("out.png", base64Data, 'base64', function(err) {
        if(err) console.log(err);
   });
});

driver.quit();