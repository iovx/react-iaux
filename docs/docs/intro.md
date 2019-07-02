## 微风平台OAuth 2.0 接入说明

 &emsp;&emsp;授权帐户为平台所有，对于应用A来说，在应用A中，用户点击第三方登录（微风平台授权登录），微风平台即可拿到应用A在平台申请时填入的相关信息，随后用户在授权页登录其帐户，此时在微风平台后台，可以识别该微风平台用户是否对该应用A有授权过（授权信息表），从而对于微风平台用户来说，可以查看自己帐户的授权应用，同时可以操作授权。

<div align="center">
<img src="/entry.jpg" width='90%' alt="微风平台"/>
</div>


#### 1.请求授权页

http://grant.platform.io:9028/auth?client_id=1000237&response_type=code&scope=get_user_info&state=10020&redirect_uri=http://music.platform.io

>参数：
>response_type
>redirect_uri
>client_id
>scope
>state

#### 2.授权服务器检测
* client_id对应的应用是否存在合法
* 验证该微风平台是否已有帐户登录 & 若存在则直接显示登录帐户图像 & 否则显示授权窗口
* 用户输入帐户密码登录授权
* 存储问题：client_id client_secret scope code state
* 该平台用户于client_id对应的应用是否有过授权

#### 3.用户授权
登录成功：http://yy.fxwind.io/callback/wx-login?code=ixw2017fvr17777lv
> 参数 ：code 即为 Authorization Code

#### 4.第三方应用获取access_token （POST）
http://grant.platform.io:9028/token?code=ixw2017fvr17777lv&client_id=1000237&client_secret=4c3fe7b2b72165930ebef0a6bc84fa53

- 这个URL称为User Authorization URL - 用户授权的令牌请求服务地址
- 参数：code 用户授权后得到的code, client_id 第三方应用在微风平台申请的应用id, client_secret 为应用密钥
- 返回access_token

```json
{ 
    "access_token":"934c1df02416baf685debf0afdab06f0d9d65f593acaf6a02a4b9d",	 
    "refresh_token":"e222dd8f97de5b6a",
    "expire_in":7200,
    "scope":"",
    "error":0,
}
```

####  5.从资源服务器获取资源（微风平台服务器或其可访问资源）
http://open.fxwind.io:9028/user/get_info?openid=10027&access_token=934c1df02416baf685debf0afdab06f0d9d65f593acaf6a02a4b9d
> 第三方站点服务器通过请求资源，再返回给客户端



### 关于开放平台存储

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |


#### Copyright©2017 风之屋 All Rights Reserved




