![alt text](/media/show_captcha.png)
# Bypass captcha recaptcha v2 on www.payback.de/login using JavaScript

## Description

This demo show how to bypass captcha recaptcha v2 on www.payback.de/login. The example using browser emulation with [puppeteer](https://pptr.dev/) and [2captcha-ts](https://www.npmjs.com/package/2captcha-ts) for interact with [2captcha](https://2captcha.com/?from=22771395) API

After successfully obtaining the token, I also use it in the found callback function `onCaptchaFinished(res.data)` for bypass captcha

#### How it works:

1. The captcha page opens
2. Captcha parameters are extracted
3. The captcha is sent to the service to receive a response
4. The received token is set on the page

This example may be useful for those who want to automate the captcha solution on a page www.payback.de/login

## Setup

Set your 2captcha apikey in `index.js`

## Run

To run the project, clone the repository, install the dependencies, and run the project

`npm install`

`npm run start`

## Result

Screenshot pass captcha:
![alt text](/media/pass_captcha.png)


### Usefull articles

- [iFrame in Puppeteer: Guide For Developers](https://www.webshare.io/academy-article/puppeteer-iframe)
- [Solving recaptcha v2](https://2captcha.com/2captcha-api#solving_recaptchav2_new) 2captcha api docs
