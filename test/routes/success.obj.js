const success_obj = {
  code: 200,
  status: 'success',
  token: expect.stringMatching(/^(?:[\w-]*\.){2}[\w-]*$/),
  refresh_token: expect.stringMatching(/^(?:[\w-]*\.){2}[\w-]*$/)
}
module.exports = success_obj;