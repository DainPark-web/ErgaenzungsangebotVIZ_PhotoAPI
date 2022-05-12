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
          // console.log('error occurred: ', result.errors[0]);

          // Mach hier redirect => "/"
          return res.send("error")
        } else {
          const feed = result.response;
      
          // extract total and results array from response
          const { total, results } = feed;
      
          // handle success here
          // console.log(`received ${results.length} photos out of ${total}`);
          // console.log('first photo: ', results);
          // console.log(page);
          //rendering home pug
          // console.log(results)
          return res.render("home", {photos: results, curPage: page ? page : 1, search: search ? search: "random"})
        }
      });
      
   
}

export const ex01 = async (req, res) => {
  const { query: {page, search}} = req; 
  let oldList;
  let newList;
  let oldList2;
  let newList2;
  await unsplash.search.getPhotos({query: "old", perPage: 30}).then(result => {
        if (result.errors) {
       
          // console.log('error occurred: ', result.errors[0]);

          // Mach hier redirect => "/"
          return res.send("error")
        } else {
          const feed = result.response;
      
  
          const { total, results } = feed;
      
          // handle success here
          console.log(`received ${results.length} photos out of ${total}`);
       
          // console.log(results)
          oldList = results
        }

      });
  await unsplash.search.getPhotos({query: "new", perPage: 30}).then(result => {
        if (result.errors) {
       
          // console.log('error occurred: ', result.errors[0]);

          // Mach hier redirect => "/"
          return res.send("error")
        } else {
          const feed = result.response;
      
  
          const { total, results } = feed;
      
          // handle success here
          // console.log(`received ${results.length} photos out of ${total}`);
       
          // console.log(results)
          newList = results
        }

      });
  await unsplash.search.getPhotos({query: "old", perPage: 30, page:2}).then(result => {
        if (result.errors) {
       
          // console.log('error occurred: ', result.errors[0]);

          // Mach hier redirect => "/"
          return res.send("error")
        } else {
          const feed = result.response;
      
  
          const { total, results } = feed;
      
          // handle success here
          // console.log(`received ${results.length} photos out of ${total}`);
       
          // console.log(results)
          oldList2 = results
        }

      });
  await unsplash.search.getPhotos({query: "new", perPage: 30, page:2}).then(result => {
        if (result.errors) {
       
          // console.log('error occurred: ', result.errors[0]);

          // Mach hier redirect => "/"
          return res.send("error")
        } else {
          const feed = result.response;
      
  
          const { total, results } = feed;
      
          // handle success here
          // console.log(`received ${results.length} photos out of ${total}`);
       
          // console.log(results)
          newList2 = results
        }

      });
    const ocolorL = Array.from(new Set(oldList.map(e => e.color)))
    const ocolorL2 = Array.from(new Set(oldList2.map(e => e.color)))
    const totalOldColor = Array.from(new Set(ocolorL.concat(ocolorL2)))

    const ncolorL = Array.from(new Set(newList.map(e => e.color)))
    const ncolorL2 = Array.from(new Set(newList2.map(e => e.color)))
    const totalNewColor = Array.from(new Set(ncolorL.concat(ncolorL2)))

    console.log(totalOldColor.length)
    return res.render("ex01", {totalOldColor: totalOldColor,totalNewColor:totalNewColor,  oldList: oldList,oldList2: oldList2, newList: newList,newList2: newList2, curPage: page ? page : 1, search: "male"})
      
}