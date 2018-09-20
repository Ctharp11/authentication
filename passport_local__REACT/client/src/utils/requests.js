import axios from 'axios';

export const getUser = () => {
    // axios.get('/api/auth')
    //   .then(res => {
    //     // if we get here, the user's session is still good. we'll update the user
    //     // to make sure we're using the most recent values just in case
    //     // update(res.data);
    //     return res
    //   })
    //   .catch(err => {
    //     // if we get a 401 response, that means the user is no longer logged in
    //     if (err.response.status === 401) {
    //       // update(null);
    //     }
    //     return err
    //   });
}

// export.register

export const login = () => {
    console.log('working')
    axios.post('/api/auth')
}

export const logout = () => {
    // axios.delete('/api/auth')
    //     .then(() => {
    //     // unsets the currently logged in user. all components wrapped in withUser
    //     // will be updated with a null user and rerender accordingly
    //     update(null);
    //     })
    //     .catch((err) => {
    //     console.log(err);
    //     });
}