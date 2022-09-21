import { startLong } from "../src/redis"
import * as utils from "../src/utils"

import 'mocha'

import * as chai from 'chai'
import * as sinon from 'sinon'

import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'

chai.use(chaiAsPromised)
chai.use(sinonChai)

const expect = chai.expect

describe("TESTS REDIS.TS", () => {
  
  describe("test 'startLong' function", () => {
    
    describe("When checkRedis is not object", () => {
        before(() => {
          sinon.stub().throws()
        })
      
        after(() => {
          sinon.restore()
        })

        it('should be a throw', () => {
            const longUrl = "https://www.asdf.com";
            const account = "asd@fg.com";
            return expect(startLong(longUrl, account)).to.eventually.be.rejected;
        })
    })

    describe("When checkRedis is a object", () => {
      before(() => {
        sinon.stub().throws()
      })
    
      after(() => {
        sinon.restore()
      })

      it('should resolve', () => {
          const longUrl = "https://www.asdf.com";
          const account = "asd@fg.com";
          return expect(startLong(longUrl, account)).to.eventually.be.fulfilled  
      })
    })

    //.....

  })
    
})

