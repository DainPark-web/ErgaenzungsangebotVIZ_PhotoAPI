import fetch from "node-fetch"
import { createApi } from "unsplash-js"


const unsplash = createApi({
    accessKey: process.env.ACCESS_KEY,
    fetch: fetch,
  });

export const home = async (req, res) => {
    unsplash.users.getPhotos({ username: 'park' }).then(result => {
        if (result.errors) {
          // handle error here
          console.log('error occurred: ', result.errors[0]);
        } else {
          const feed = result.response;
      
          // extract total and results array from response
          const { total, results } = feed;
      
          // handle success here
          console.log(`received ${results.length} photos out of ${total}`);
          console.log('first photo: ', results[0]);
        }
      });
    return res.send("home")
}