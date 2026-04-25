// import {http} from "../api/http"

// export async function getCategories(){
//     const res = await http.get("/categories");
//     // console.log(res)
//     return res.data
    
// }

import {http} from "./http"

export async function getCategories(){
    const res = await http.get("/categories");
    return res.data
}