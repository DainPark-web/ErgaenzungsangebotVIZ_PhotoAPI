import fetch from "node-fetch"
import { createApi } from "unsplash-js"


const unsplash = createApi({
    accessKey: process.env.ACCESS_KEY,
    fetch: fetch,
  });

export const home = async (req, res) => {
    unsplash.photos.get({ photoId: 'foo' }).then(result => {
        if (result.errors) {
          // handle error here
          console.log('error occurred: ', result.errors[0]);
        } else {
          // handle success here
          const photo = result.response;
          console.log(photo);
        }
      });
    return res.send("home")
}