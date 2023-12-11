const assert = require('assert');
const data = require("./data.json");
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');

beforeEach(async function () {
    console.log("------------BeforeEach Hook---------------")
    await new Promise((resolve) => setTimeout(resolve, parseInt(5000)));
});
describe('running the assignment', () => {
    it.only("checking the table details are same or not with the json data", async () => {

        let driver = await new Builder().forBrowser('safari').build();
        await driver.manage().window().maximize();
        await driver.get('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        let table_click = await driver.findElement(By.xpath("//summary[contains(text(),'Table Data')]"));
        await table_click.click();
        let json_data = await driver.findElement(By.xpath("//textarea[@id='jsondata']"));
        await json_data.clear();
        await json_data.sendKeys(JSON.stringify(data));
        let refresh_table = await driver.findElement(By.xpath("//button[@id='refreshtable']"));
        await refresh_table.click();
        let count = 2;
        for (let i = 0; i < data.length; i++) {
            let data_q = data[i];
            let table_text_name = await driver.findElement(By.xpath("//tr[" + count + "]/td[1]"));
            let table_text_age = await driver.findElement(By.xpath("//tr[" + count + "]/td[2]"));
            let table_text_gender = await driver.findElement(By.xpath("//tr[" + count + "]/td[3]"));
            console.log("data from the table = " + table_text_name.getText());
            console.log("data from the json file = " + data_q.name);
            assert.equal((await table_text_name.getText()).toString(), data_q.name);
            assert.equal((await table_text_age.getText()).toString(), data_q.age.toString());
            assert.equal((await table_text_gender.getText()).toString(), data_q.gender);
            count++;
        }




    });

});


