# Next Proxy Minimum Reproducible Example

# Folder Setup

## server
A simple external Express server which the client makes authentication requests to. This server returns a new access token and the user object as a response when the user logs in.

## client
The Next.js application. On login `/pages/api/resources/v1/access-tokens`, a request is made to the external Express server; the access token received from the Express server is saved in a `httpOnly` cookie for future requests.

`/pages/api/resources/v1/[...path]` acts as a translation layer to convert the `httpOnly` cookie to an authorization header token so that the external Express server can verify the request via an authorization header rather than a cookie. 

Inspiration is from [this blog post](https://maxschmitt.me/posts/next-js-http-only-cookie-auth-tokens/).


# Problem
Locally, logging in is successful, but when I deploy the app to Vercel, an ambigous serverless runtime error is thrown:

```
[POST] /api/resources/v1/access-tokens?provider=credentials
20:24:57:81
epAlive: true,
useChunkedEncodingByDefault: true,
sendDate: false,
_removedConnection: false,
_removedContLen: false,
_removedTE: false,
strictContentLength: false,
_contentLength: '158',
_hasBody: true,
_trailer: '',
finished: true,
_headerSent: true,
_closed: false,
socket: [TLSSocket],
_header: 'POST /v1/access-tokens?provider=credentials HTTP/1.1\r\n' +
'Accept: application/json\r\n' +
'Content-Type: application/json\r\n' +
'host: learnify-web-iota.vercel.app\r\n' +
'x-real-ip: 24.141.219.122\r\n' +
'sec-ch-ua-mobile: ?0\r\n' +
'sec-fetch-site: same-origin\r\n' +
'sec-fetch-dest: empty\r\n' +
'referrer-policy: same-origin\r\n' +
'x-vercel-forwarded-for: 24.141.219.122\r\n' +
'sec-ch-ua: "Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"\r\n' +
'origin: https://learnify-web-iota.vercel.apprn' +
'sec-ch-ua-platform: "macOS"\r\n' +
'x-forwarded-host: learnify-web-iota.vercel.app\r\n' +
'x-vercel-ip-timezone: America/Toronto\r\n' +
'accept-language: en-US,en;q=0.9\r\n' +
'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36\r\n' +
'x-vercel-proxy-signature-ts: 1669858197\r\n' +
'permissions-policy: camera=(), microphone=(), geolocation=(), interest-cohort=()\r\n' +
'cookie: \r\n' +
'x-vercel-ip-latitude: 43.6514\r\n' +
'forwarded: for=24.141.219.122;host=learnify-web-iota.vercel.app;proto=https;sig=0QmVhcmVyIDdjNjE4MjYyMzQ3MWViMmZhNjQ2YWUyMTdhYjBiNWUzNjQyZDdmNDA0YjcwODBkOTRkMzY2NWVlMzJiOTc1ZmQ=;exp=1669858197\r\n' +
'x-vercel-deployment-url: app-fdlmic72j-learnify-ca.vercel.app\r\n' +
'x-forwarded-for: 24.141.219.122\r\n' +
'x-vercel-id: cle1::2ttvc-1669857897655-5ce1779c5c26\r\n' +
'sec-fetch-mode: cors\r\n' +
'x-matched-path: /api/resources/v1/access-tokens\r\n' +
'x-xss-protection: 1; mode=block\r\n' +
'x-forwarded-proto: https\r\n' +
'x-vercel-ip-longitude: -79.9143\r\n' +
'x-vercel-ip-country: CA\r\n' +
'x-frame-options: SAMEORIGIN\r\n' +
'x-vercel-ip-country-region: ON\r\n' +
'x-content-type-options: nosniff\r\n' +
'accept-encoding: gzip, deflate, br\r\n' +
'referer: [APP_URL]/loginrn' +
'content-length: 158\r\n' +
'x-vercel-ip-city: [CITY_OF_ORIGIN]\r\n' +
'x-vercel-proxied-for: 24.141.219.122\r\n' +
'x-vercel-proxy-signature: Bearer 7c6182623471eb2fa646ae217ab0b5e3642d7f404b7080d94d3665ee32b975fd\r\n' +
'connection: close\r\n' +
'\r\n',
_keepAliveTimeout: 0,
_onPendingData: [Function: nop],
agent: [Agent],
socketPath: undefined,
method: 'POST',
maxHeaderSize: undefined,
insecureHTTPParser: undefined,
path: '/v1/access-tokens?provider=credentials',
_ended: false,
res: null,
aborted: false,
timeoutCb: null,
upgradeOrConnect: false,
parser: null,
maxHeadersCount: null,
reusedSocket: false,
host: [EXTERNAL_API],
protocol: 'https:',
_redirectable: [Circular *1],
[Symbol(kCapture)]: false,
[Symbol(kBytesWritten)]: 0,
[Symbol(kEndCalled)]: true,
[Symbol(kNeedDrain)]: false,
[Symbol(corked)]: 0,
[Symbol(kOutHeaders)]: [Object: null prototype],
[Symbol(kUniqueHeaders)]: null
},
_currentUrl: 'https://[EXTERNAL_API]/v1/access-tokens?provider=credentials',
_timeout: null,
[Symbol(kCapture)]: false
}
}
RequestId: 4e992f0e-3701-4f95-ba17-b75ab035ef71 Error: Runtime exited with error: exit status 1
Runtime.ExitError
```

# Expectations
1. When simulating a login on `/login`, the user should be redirected to `/dashboard` after pressing the Login button.
2. A user should be redirected from `/dashboard` to `/login` when the user attempts to logout. The access token should be destroyed, preventing further access to `/dashboard` unless the user manually logs in again.