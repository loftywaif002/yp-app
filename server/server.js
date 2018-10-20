const express = require('express');
const path = require('path');


const app = express();


// create a GET route
app.get('/signup', (req, res) => {
  res.send({ express: 'EXPRESS BACKEND IS CONNECTED TO REACT' });
});

/*Authorization/Database access..etc*/
if(process.env.NODE_ENV !== 'production') {

}else{
  
}

app.listen(process.env.PORT || 5000, () => console.log('Listening'));