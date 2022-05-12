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
    const totalOldColor_to_rgb = totalOldColor.map((hex) => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    })
    const totalOldColor_analyse = totalOldColor_to_rgb.reduce((prev, curr) => {
      const r = prev.r + curr.r;
      const g = prev.g + curr.g;
      const b = prev.b + curr.b;
      return {r, g, b}
    })

    const total_likes_old = oldList.map((e) => {
        return e.likes;
    }).reduce((prev, curr) => {
      return prev + curr
    }) + oldList2.map((e) => {
      return e.likes;
  }).reduce((prev, curr) => {
    return prev + curr
  })
    const total_likes_new = newList.map((e) => {
        return e.likes;
    }).reduce((prev, curr) => {
      return prev + curr
    }) + newList2.map((e) => {
      return e.likes;
  }).reduce((prev, curr) => {
    return prev + curr
  })
    
 
    const total_likes_user_old = oldList.map((e) => {
        return e.user.total_likes;
    }).reduce((prev, curr) => {
      return prev + curr
    }) + oldList2.map((e) => {
      return e.user.total_likes;
  }).reduce((prev, curr) => {
    return prev + curr
  })
    const total_likes_user_new = newList.map((e) => {
        return e.user.total_likes;
    }).reduce((prev, curr) => {
      return prev + curr
    }) + newList2.map((e) => {
      return e.user.total_likes;
  }).reduce((prev, curr) => {
    return prev + curr
  })

    const total_photo_user_old = oldList.map((e) => {
        return e.user.total_photos;
    }).reduce((prev, curr) => {
      return prev + curr
    }) + oldList2.map((e) => {
      return e.user.total_photos;
  }).reduce((prev, curr) => {
    return prev + curr
  })
    const total_photo_user_new = newList.map((e) => {
        return e.user.total_photos;
    }).reduce((prev, curr) => {
      return prev + curr
    }) + newList2.map((e) => {
      return e.user.total_photos;
  }).reduce((prev, curr) => {
    return prev + curr
  })
    
    // console.log(total_likes)
   

    const ncolorL = Array.from(new Set(newList.map(e => e.color)))
    const ncolorL2 = Array.from(new Set(newList2.map(e => e.color)))
    const totalNewColor = Array.from(new Set(ncolorL.concat(ncolorL2)))
    const totalNewColor_to_rgb = totalNewColor.map((hex) => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    })

    const totalNewColor_analyse = totalNewColor_to_rgb.reduce((prev, curr) => {
      const r = prev.r + curr.r;
      const g = prev.g + curr.g;
      const b = prev.b + curr.b;
      return {r, g, b}
    })

    const oldgroup = oldList.concat(oldList2).sort((a, b) => a.user.total_photos - b.user.total_photos);
    const newgroup = newList.concat(newList2).sort((a, b) => a.user.total_photos - b.user.total_photos);
    return res.render("ex01", {oldgroup,newgroup, total_photo_user_old, total_photo_user_new,total_likes_user_old,total_likes_user_new, total_likes_old, total_likes_new,totalOldColor_analyse,totalNewColor_analyse, totalOldColor: totalOldColor_to_rgb,totalNewColor:totalNewColor_to_rgb,  oldList: oldList,oldList2: oldList2, newList: newList,newList2: newList2, curPage: page ? page : 1, search: "male"})
      
}