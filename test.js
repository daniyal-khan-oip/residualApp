const axios = require("axios");
const FormData = require('form-data');

async function name() {
    let formData = new FormData();
    formData.append('first_name', 'Super');
    formData.append('last_name', 'Admin');
    formData.append('phone', "+9853843747373");
    formData.append('status', '1');
    const res = await axios.post("https://4428-103-244-176-173.ap.ngrok.io/api/updated/1", formData, {
        headers: {
            Authorization: `Bearer 59|Kb4NoLDWszjt1TChsLc7sHFuImRACbcxK8iioP8k`,
            Accept: 'application/json',
        },
    })
    console.log(res.data)

}

name()
