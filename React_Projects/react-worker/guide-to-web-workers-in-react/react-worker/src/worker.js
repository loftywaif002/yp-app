import axios from 'axios'
import workers from './child'



export default () => {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return;

    const users = [];

    const userDetails = {
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      id: 1
    };

    for (let i = 0; i < 10000000; i++) {

      userDetails.id = i++
      userDetails.dateJoined = Date.now()

      //users.push(userDetails);
    }

    axios.get('https://www.google.com')
    .then((res)=>{
      console.log(res)
    }).catch((error)=>{console.log(error)})
    
    postMessage(users);
  })
}
