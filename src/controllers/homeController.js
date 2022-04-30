import fetch from "node-fetch"
import { createApi } from "unsplash-js"


const unsplash = createApi({
    accessKey: process.env.ACCESS_KEY,
    fetch: fetch,
  });

export const home = async (req, res) => {
    // unsplash.users.getPhotos({ username: 'park' }).then(result => {
    unsplash.search.getPhotos({query: "dog", page:1, perPage: 10}).then(result => {
        if (result.errors) {
          // handle error
          // Immer zuerst
          console.log('error occurred: ', result.errors[0]);

          // Mach hier redirect => "/"
          return res.send("error")
        } else {
          const feed = result.response;
      
          // extract total and results array from response
          const { total, results } = feed;
      
          // handle success here
          console.log(`received ${results.length} photos out of ${total}`);
          console.log('first photo: ', results);

          //rendering home pug
          return res.send("home")
        }
      });
   
}