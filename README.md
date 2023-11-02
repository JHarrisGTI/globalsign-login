# Logging in to GlobalSign with TypeScript

## Installation

You'll need to install NodeJS. Then run `npm install`. Start the server with `npm run start:dev`.

## Description

I'm trying to follow the [Digital Signing Service Technical Guide](https://media.globalsign.com/l/707663/2020-01-22/g2tvd/707663/54611/GlobalSign_Digital_Signing_Service_Guide.pdf), integrating its methodologies into our app, which is a [NestJS](https://docs.nestjs.com/) app written in TypeScript.

After running the app, visit http://localhost:3000/login. When I do this, I get the error:

```
write EPROTO 401BD84FF87F0000:error:0A000410:SSL routines:ssl3_read_bytes:sslv3 alert handshake failure:../deps/openssl/openssl/ssl/record/rec_layer_s3.c:1605:SSL alert number 40\n
```

The relevant file in this repository is src/globalsign-api.ts. It attempts to adapt the Login() function from [this C# sample code](https://support.globalsign.com/download_file/view/1750). Presently it returns an SSL error and it's not clear why. Possibly something is amiss in assets/certificate.pfx (which was created following the [Digital Signing Service Technical Guide](https://media.globalsign.com/l/707663/2020-01-22/g2tvd/707663/54611/GlobalSign_Digital_Signing_Service_Guide.pdf)), or possibly the certificate isn't being correctly set up for transmission. You should be able to replace that certificate (along with the API key and API secret in src/globalsign-api.ts) with a known-good set of credentials to at least determine whether the problem is with the code or with the credentials.

Please write me at jharris@gtindependence.com with any insights you're able to discern. Thanks for looking into this.