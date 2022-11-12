import { img_upload_inst } from "../network/instance";

const uploadPhoto = async (img) => {
    try {
        const formData = new FormData();
        formData.append('image', img);
        const photoUpload = await img_upload_inst.post('',formData);
        return photoUpload;
    } catch (err) {
        console.log(err);
        throw new Error(`can not upload error , ${err}`);
    }
}

export default uploadPhoto;