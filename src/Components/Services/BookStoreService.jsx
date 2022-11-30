import axios from 'axios';

export const loginUser =(data) => {
        return axios.post("http://localhost:8080/User/login", data)
            .then((response) => {
                console.log(response);
            })
        .catch((error)=>{
            console.log(error);
        })
        }