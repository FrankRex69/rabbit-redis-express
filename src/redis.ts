import { redisExported, shortUrl } from "./utils.js"

let clientRedis = new redisExported()

export const startLong = async(longUrl: string, account: string): Promise<object | undefined> => {
  try {
    
    // Create keyRedis
    let keyRedis: string = longUrl+"_"+account    

    // Connection Redis
    await clientRedis.connectRedis()
        
    const checkRedis = await clientRedis.hgetallRedis(keyRedis)  
    
    // check longUrl in Redis
    if(!checkRedis.longUrl){
           
      let shortUrlNew: string      
           
      // create random shortUrl
      shortUrlNew = shortUrl(6)

      // create objects in Redis for longUrl      
      await clientRedis.hsetRedis(keyRedis, longUrl, shortUrlNew, account)
      
      // create objects in Redis for shortUrl
      const nRequest: number = 1
      await clientRedis.hsetshortRedis(shortUrlNew, longUrl, account, nRequest)

      // return object
      return {
        "shortUrl":  await clientRedis.shortUrlRedis(keyRedis),
        "message": "new short url"
      }   
    }
    else
    {      
      return {
        "shortUrl":  await clientRedis.shortUrlRedis(keyRedis),
        "message": "Long url already exists for this account --> old short url"
      }
      
    }
   
  } catch (error) {
      console.error("Redis error")
  }
}


export const startShort = async(shortUrl: string): Promise<object | undefined> => {
  try {
    // Connection Redis
    await clientRedis.connectRedis()

    // getAll Redis for shortUrl 
    const checkRedis = await clientRedis.hgetallRedis(shortUrl)      

    // check longUrl in Redis
    if(checkRedis.longUrl){
      // Update records
      const longUrl = checkRedis.longUrl
      const account = checkRedis.account
      let nrequestRedisUpdate: number = ++checkRedis.count
      await clientRedis.hsetshortRedis(shortUrl, longUrl, account, nrequestRedisUpdate)   
      return {
        "urlLong": checkRedis.longUrl,
        "countrequestShort": nrequestRedisUpdate,
        "message": "Short url '"+ shortUrl + "' present"
      }
    }
    return {
      "message": "shortUrl not present!!!"
    }
  } catch (error) {    
    console.error(error)
    throw error   
  }

}

// const longUrl: string = "http://www.prova31.com"
// const account: string = "fran4@gmail.com"

// const shortUrlCheck = "http://v7qbw9"

// console.log(await startLong(longUrl, account))

// console.log(await startShort(shortUrlCheck))

