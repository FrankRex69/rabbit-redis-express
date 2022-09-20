import { createClient } from 'redis';
export class redisExported {
    constructor() {
        this.client = createClient();
        this.connectRedis = async () => {
            this.client.on('error', (err) => console.log('Redis Client Error', err));
            await this.client.connect();
        };
        this.hsetRedis = async (keyRedis, longUrl, shortUrl, account) => {
            await this.client.hSet(keyRedis, {
                "longUrl": longUrl,
                "shortUrl": shortUrl,
                "account": account
            });
        };
        this.hsetshortRedis = async (shortUrl, longUrl, account, nRequest) => {
            await this.client.hSet(shortUrl, {
                "longUrl": longUrl,
                "account": account,
                "count": nRequest
            });
        };
        this.hgetallRedis = async (keyRedis) => {
            return await this.client.hGetAll(keyRedis);
        };
        this.shortUrlRedis = async (keyRedis) => {
            const objectNew = await this.client.hGetAll(keyRedis);
            return objectNew.shortUrl;
        };
        this.nRequestRedis = async (shortUrl) => {
            const objectNew = await this.client.hGetAll(shortUrl);
            return Number(objectNew.count);
        };
    }
}
export const shortUrl = (length) => {
    const alfaNumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomChar = '';
    let resultShortUrl;
    const alfaNumericLength = alfaNumeric.length;
    for (let i = 0; i < length; i++) {
        randomChar += alfaNumeric.charAt(Math.floor(Math.random() * alfaNumericLength));
    }
    resultShortUrl = "http://" + randomChar;
    return resultShortUrl;
};
