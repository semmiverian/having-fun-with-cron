const express = require('express')
const app = express()
const cron = require('node-cron')

const kue = require('kue')
const queue = kue.createQueue()


// const job = queue.create('send-welcome-email', {
//   title: 'Welcome to Mobile Legend',
//   message: 'RRQ the best'
// }).save(err => {
//   if (!err) {
//     console.log(job.id)
//   }
// })

// queue.process('send-welcome-email', (job, done) => {
//   // sending welcome email
//   console.log('processing send-welcome-email job')
//   console.log(job.data)

//   setTimeout(() => {
//     console.log('successfully sending welcome email')
//     done()
//   }, 1000);
  
// })

const everyMinute = '* * * * *'

const christmas = '0 0 25 12 *'

cron.schedule(everyMinute, () => {
  console.log('Bayar utang bayar utang')
})

cron.schedule(christmas, () => {
  console.log('Merry Christmas')
})

const User = {
  create() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve()
      }, 1000);
    })
  }
}

app.get('/register', (req, res) => {
  const user = {
    name: 'kosasih',
    email: 'kosasih@kosasih.kosasih',
    birthday: '25-02-2019'
  }
  // Pura pura nya
  // Save data nya ke database
  User.create()
      .then(() => {
        res.status(201).json({
          message: 'Welcome to our application'
        })
        queue.create('send-welcome-email', {
          title: 'Welcome to our application',
          user: user
        }).save()

        const isBirthday = true

        if (isBirthday) {
          queue.create('send-happy-birthday', {
            title: 'happy Birthday',
            user: user
          }).save()
        }
      })
})

queue.process('send-welcome-email', (job, done) => {
   // sending welcome email
  console.log('processing send-welcome-email job')
  console.log(job.data)

  setTimeout(() => {
    console.log('successfully sending welcome email')
    done()
  }, 1000);
})

queue.process('send-happy-birthday', (job, done) => {
  // sending welcome email
 console.log('processing send-happy-birthday job')
 console.log(job.data)

 setTimeout(() => {
   console.log('successfully sending happy birthday email')
   done()
 }, 1000);
})

kue.app.listen(3001)

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});