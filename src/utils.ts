import { commandOptions, createClient } from 'redis'


export class redisExported {
  
  client = createClient()

  connectRedis = async(): Promise<void> => {    
    this.client.on('error', (err: any) => console.log('Redis Client Error', err));
    await this.client.connect()
  }  

  hsetRedis = async(keyRedis: string, longUrl: string, shortUrl: string, account: string): Promise<any> => {
    await this.client.hSet(keyRedis, {
      "longUrl": longUrl,
      "shortUrl": shortUrl,
      "account": account
    });
  }

  hsetshortRedis = async(shortUrl: string, longUrl: string, account: string, nRequest: number): Promise<any> => {
    await this.client.hSet(shortUrl, {
      "longUrl": longUrl,
      "account": account,
      "count": nRequest
    });
  }

  hgetallRedis = async(keyRedis: string): Promise<any> => {
    return await this.client.hGetAll(keyRedis)
  }

  shortUrlRedis = async(keyRedis: string): Promise<string> => {
    const objectNew = await this.client.hGetAll(keyRedis)
    return objectNew.shortUrl
  }

  nRequestRedis = async(shortUrl: string): Promise<any> => {
    const objectNew = await this.client.hGetAll(shortUrl)
    return Number(objectNew.count)
  } 

}

export const shortUrl = (length: string | number): string => {
  const alfaNumeric ='abcdefghijklmnopqrstuvwxyz0123456789';
  let randomChar: string = '';
  let resultShortUrl: string
  const alfaNumericLength = alfaNumeric.length;
  for ( let i = 0; i < length; i++ ) {
    randomChar += alfaNumeric.charAt(Math.floor(Math.random() * alfaNumericLength));
  }
  resultShortUrl = "http://" + randomChar
  return resultShortUrl
}

