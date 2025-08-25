require('dotenv').config();

jest.mock('pino', () => {
  return () => {
    return {
      info: jest.fn((msg) => console.log(msg)),
      error: jest.fn((msg) => console.log(msg)),
    }
  }
})
const loggerService = require('../../src/services/logger.service');

let consoleLog;

describe('Logger service', () => {
  beforeAll(() => {
    consoleLog = jest.spyOn(console, 'log');
  })

  it('should call log info', () => {
    loggerService.log('info');
    expect(consoleLog).toHaveBeenCalledWith('info');
  })
  it('should call log error', () => {
    loggerService.error('error');
    expect(consoleLog).toHaveBeenCalledWith('error');
  })
  it('should call log info', () => {
    loggerService.log();
    expect(consoleLog).toHaveBeenCalledWith('');
  })
  it('should call log error', () => {
    loggerService.error();
    expect(consoleLog).toHaveBeenCalledWith('');
  })
})