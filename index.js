var aws = require('aws-sdk');
var ses = new aws.SES({ region: 'us-west-2' });
var request = require('request');
var cheerio = require('cheerio');

const checkInventory = () => {
    //URL of the three Nintendo Switches at Bestbuy
    const grey_url = "https://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/6364253.p?skuId=6364253"
    const redblue_url = "https://www.bestbuy.com/site/nintendo-switch-32gb-console-neon-red-neon-blue-joy-con/6364255.p?skuId=6364255"
    const ac_url = "https://www.bestbuy.com/site/nintendo-switch-animal-crossing-new-horizons-edition-32gb-console-multi/6401728.p?skuId=6401728"
    //OPTIONAL: Include a JSON object of your Cookies
    const cookie = "";
    //Set Up AWS SES
    const sourceEmailAddr = "example@gmail.com";
    const destinationEmailAddrs = ["example1@gmail.com", "example2@uw.edu", "example3@gmail.com"];
    
    //Request for each Nintendo Switch
    const grey_req = {
        url: grey_url,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "axios/0.18.0",
            "Cookie": cookie
        }
    }

    const redblue_req = {
        url: redblue_url,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "axios/0.18.0",
            "Cookie": cookie
        }
    }

    const ac_req = {
        url: ac_url,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "axios/0.18.0",
            "Cookie": cookie
        }
    }

    //Make Request
    request(grey_req, (error, response, body) => {
        if (error) {
            console.log(error);
        }
        console.log("Nintendo Switch Version: Grey")
        console.log("Status code: " + response.statusCode);
        const $ = cheerio.load(body);
        const status = $('.fulfillment-add-to-cart-button div button').text().trim();
        console.log("Inventory status: " + status);
        console.log("time: " + (new Date).toUTCString() + "\n");
        if (status !== "Sold Out") {
            var params = {
                Destination: {
                    ToAddresses: destinationEmailAddrs
                },
                Message: {
                    Body: {
                        Text: { Data: grey_url }
                    },
                    Subject: { Data: "Grey Nintendo Switch is available!" }
                },
                Source: sourceEmailAddr
            };
            ses.sendEmail(params, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("email sent")
                    console.log(data);
                }
            });
        }
    });

    request(redblue_req, (error, response, body) => {
        if (error) {
            console.log(error);
        }
        console.log("Nintendo Switch Version: Red & Blue")
        console.log("Status code: " + response.statusCode);
        const $ = cheerio.load(body);
        const status = $('.fulfillment-add-to-cart-button div button').text().trim();
        console.log("Inventory status: " + status);
        console.log("time: " + (new Date).toUTCString() + "\n");
        if (status !== "Sold Out") {
            var params = {
                Destination: {
                    ToAddresses: destinationEmailAddrs
                },
                Message: {
                    Body: {
                        Text: { Data: redblue_url }
                    },
                    Subject: { Data: "Red & Blue Nintendo Switch is available!" }
                },
                Source: sourceEmailAddr
            };
            ses.sendEmail(params, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("email sent")
                    console.log(data);
                }
            });
        }
    });

    request(ac_req, (error, response, body) => {
        if (error) {
            console.log(error);
        }
        console.log("Nintendo Switch Version: Animal Crossing")
        console.log("Status code: " + response.statusCode);
        const $ = cheerio.load(body);
        const status = $('.fulfillment-add-to-cart-button div button').text().trim();
        console.log("Inventory status: " + status);
        console.log("time: " + (new Date).toUTCString() + "\n");
        if (status !== "Sold Out") {
            var params = {
                Destination: {
                    ToAddresses: destinationEmailAddrs
                },
                Message: {
                    Body: {
                        Text: { Data: ac_url }
                    },
                    Subject: { Data: "Animal Crossing Nintendo Switch is available!" }
                },
                Source: sourceEmailAddr
            };
            ses.sendEmail(params, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("email sent")
                    console.log(data);
                }
            });
        }
    });
}

console.log("Script starting...")
setInterval(checkInventory, 30000);