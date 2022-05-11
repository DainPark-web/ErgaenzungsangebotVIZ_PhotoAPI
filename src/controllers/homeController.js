import fetch from "node-fetch"
import { createApi } from "unsplash-js"


const unsplash = createApi({
    accessKey: process.env.ACCESS_KEY,
    fetch: fetch,
  });

export const home = async (req, res) => {
  const { query: {page, search}} = req; 
    unsplash.search.getPhotos({query: search ? search : "random",page: page ? page : 1, perPage: 30}).then(result => {
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
          // console.log(page);
          //rendering home pug
          console.log(results)
          return res.render("home", {photos: results, curPage: page ? page : 1, search: search ? search: "random"})
        }
      });
      
   
}

export const ex01 = async (req, res) => {
  const { query: {page, search}} = req; 
  let maleList;
  let femaleList;
  await unsplash.search.getPhotos({query: "male", perPage: 30}).then(result => {
        if (result.errors) {
       
          console.log('error occurred: ', result.errors[0]);

          // Mach hier redirect => "/"
          return res.send("error")
        } else {
          const feed = result.response;
      
  
          const { total, results } = feed;
      
          // handle success here
          console.log(`received ${results.length} photos out of ${total}`);
       
          console.log(results)
          maleList = results
        }

      });
  await unsplash.search.getPhotos({query: "female", perPage: 30}).then(result => {
        if (result.errors) {
       
          console.log('error occurred: ', result.errors[0]);

          // Mach hier redirect => "/"
          return res.send("error")
        } else {
          const feed = result.response;
      
  
          const { total, results } = feed;
      
          // handle success here
          console.log(`received ${results.length} photos out of ${total}`);
       
          console.log(results)
          femaleList = results
        }

      });
    return res.render("ex01", {maleList: maleList, femaleList: femaleList, curPage: page ? page : 1, search: "male"})
      
}