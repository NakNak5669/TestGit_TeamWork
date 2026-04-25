import {http} from "../api/http"

// params = {} មានន័យថា: បើអ្នក call getProducts() ដោយមិនផ្ញើអ្វី -> params នឹងជា {} (មិន error)(Standard Safe)
export async function getProducts(params ={}){
// { params } params គឺជា object សម្រាប់បញ្ចូល query string ទៅក្នុង URL ដោយស្វ័យប្រវត្តិ (ដោយសាតែ /products មានឲ Filter អ្វីជាច្រើន )
    const res = await http.get("/products", { params });
    // console.log(res)
    return res.data
}
/**
 * ✅ getProductById(id)
 * GET /products/:id
 */
export async function getProductById(id) {
  const res = await http.get(`/products/${id}`);
  return res.data;
}