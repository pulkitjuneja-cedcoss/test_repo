import axios from 'axios'

export const DetailsSaved = (url_obj) => {
    let basicPath = url_obj.app_url + '/admin/api/';
   return  axios.get( basicPath + 'validation/walmart.php?check=true',{
        headers: {
            Authorization: 'ced:123456'
        }
    })

}


export const UpdateDetails = (data) => {
    return(
        axios.post( data.url_obj.app_path + 'admin/api/validation/walmart.php', {
            'client_id': data.client_id,
            'secret_key': data.client_secret,
            'enviornment':'sandbox'
            // 'client_id': '723410c6-b9ff-4511-bb05-333d97a9854e',
            // 'secret_key': 'ZGnaXyxXLvIe2sQukp2lycLqiQ3XLyNmpZrE4ON6ZkVIUsMvldXro5rLADE88hO82gfNJU6JEpOs0GH53szEwQ',
            // 'enviornment':'sandbox'
        }, {
            headers: {
                Authorization: 'ced:123456'
            }
        })
    )

} 