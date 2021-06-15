import { useAuth } from "../auth/useAuth";

export const useUpdatePic = () => {
  const { auth } = useAuth();
  const upload_pic = async (evt) => {
    evt.preventDefault();
    const uploadedFile = evt.target.files[0];
    try {
      const base64 = await toBase64(uploadedFile);

      const req_obj = { image: base64.split(",").pop() };
      const res = await auth({ type: "UPLOAD_PIC", req_obj: req_obj });

      const user_pic = res.data.pic;

      return user_pic;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // convert img to base64

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return { upload_pic };
};
