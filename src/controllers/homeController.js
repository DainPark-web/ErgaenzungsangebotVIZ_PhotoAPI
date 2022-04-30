import fetch from "node-fetch"
import { createApi } from "unsplash-js"


const unsplash = createApi({
    accessKey: process.env.ACCESS_KEY,
    fetch: fetch,
  });

export const home = async (req, res) => {
    unsplash.search.getPhotos({query: "male", page:req.query.page ? req.query.page : 1, perPage: 60}).then(result => {
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
          // console.log('first photo: ', results);
          const { query: {page}} = req; 
          console.log(page);
          //rendering home pug
          return res.render("home", {photos: results, curPage: page ? page : 1})
        }
      });
      
   
}