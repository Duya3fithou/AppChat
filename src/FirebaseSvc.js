/* eslint-disable no-undef */
/* eslint-disable no-alert */
import firebase from 'firebase';
import moment from 'moment';
import uuid from 'uuid';
class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyC20GfRRHUujxgkQbHiYQWNgd_Zi5XH55k',
        authDomain: 'appchat-11.firebaseapp.com',
        databaseURL: 'https://appchat-11.firebaseio.com',
        projectId: 'appchat-11',
        storageBucket: 'appchat-11.appspot.com',
        messagingSenderId: '943863919238',
        appId: '1:943863919238:web:c431b32190dc47ad30d707',
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        this.login(user);
      } catch ({message}) {
        console.log('Failed:' + message);
      }
    } else {
      console.log('Reusing auth...');
    }
  };

  createAccount = async user => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function() {
          console.log(
            'created user successfully. User email:' +
              user.email +
              ' name:' +
              user.name,
          );
          var userf = firebase.auth().currentUser;
          userf.updateProfile({displayName: user.name}).then(
            function() {
              console.log(
                'Updated displayName successfully. name:' + user.name,
              );
              alert(
                'User ' +
                  user.name +
                  ' was created successfully. Please login.',
              );
            },
            function(error) {
              console.warn('Error update displayName.');
            },
          );
        },
        function(error) {
          console.error(
            'got error:' + typeof error + ' string:' + error.message,
          );
          alert('Create account failed. Error: ' + error.message);
        },
      );
  };

  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid.v4());
      const task = ref.put(blob);
      console.log('ahgfkahsgfhg');
      return new Promise((resolve, reject) => {
        console.log('111111111');
        task.on('state_changed', () => {}, reject, () =>
          resolve(task.snapshot.ref.getDownloadURL()),
        );
       // console.log(resolve(task.snapshot.downloadURL));
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  };

  updateAvatar = url => {
    //await this.setState({ avatar: url });
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({avatar: url}).then(
        function() {
          console.log('Updated avatar successfully. url:' + url);
          alert('Avatar image is saved successfully.');
        },
        function(error) {
          console.warn('Error update avatar.');
          alert('Error update avatar. Error:' + error.message);
        },
      );
    } else {
      console.log("can't update avatar, user is not login.");
      alert('Unable to update avatar. You must login first.');
    }
  };

  onLogout = user => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        alert('Sign-out successful.');
      })
      .catch(function(error) {
        console.log('An error happened when signing out');
      });
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('Messages');
  }

  parse = snapshot => {
    const {createdAt, text, user} = snapshot.val();
    const {key: id} = snapshot;
    const {key: _id} = snapshot;

    const message = {
      id,
      _id,
      createdAt,
      text,
      user,
    };
    return message;
  };

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        createdAt: new Date().toString(),
      };
      this.ref.push(message);
    }
  };

  refOff() {
    this.ref.off();
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
