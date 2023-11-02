import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as path from 'path';
import { catchError, firstValueFrom } from "rxjs";
import { readFileSync } from "fs";

@Injectable()
export class GlobalSignApi {
	constructor(private readonly httpService: HttpService) { }

	public baseUrl: string = "https://emea.api.dss.globalsign.com:8443/v2";

	async login(
        apiKey: string = "9cba489a1b28177d", 
        apiSecret: string = "3a852cec967cb2cb8968265da21e0fdd90d1aef6"
    ) {
		const payload = { api_key: apiKey, api_secret: apiSecret };
		const certFile = readFileSync(path.resolve('assets/certificate.pfx'));
		const accessCode = await firstValueFrom(this.httpService.post(this.baseUrl + "/login", payload, {
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Content-Length': payload.toString().length,
				'Client-Certificates': certFile.toString('base64'),
			}
		}));
		return accessCode;
	}
}