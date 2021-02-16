const NAME = 'Fake Pharmacy for Debugging'
const URL = 'https://www.example.com'

/*
 * returns Promise<Boolean> - appointment availability
*/
const checker = async () => true

export default {
  name: NAME,
  checker,
  url: URL,
}
