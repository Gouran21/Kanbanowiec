import axios from 'axios';
console.log(process.env.REACT_APP_MODE);
const LOGIN_URL = (process.env.REACT_APP_MODE === 'dev') ? ('http://localhost:8080/login') : window.location.href + 'login';
console.log(LOGIN_URL);
async function TryLogin(email, password) {
    try {
        const response = await axios.post(LOGIN_URL, { email, password }, {crossdomain: true});
        return {response, succeed: true};
    }
    catch (error) {
        return {error, succeed: false};
    }

}

export { TryLogin };