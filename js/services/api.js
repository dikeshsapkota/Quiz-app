// Load categories from OpenTDB API

const BASE_URL = "https://opentdb.com";
 async function fetchData(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`);
    if(!res.ok) throw new Error (`API call failed: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    alert("Somothing went wrong");
    return null;
  }
}
            
export async function getCategories(){
  const endpoint = `api_category.php`;
  const data = await fetchData(endpoint);
  console.log(data.trivia_categories);
  return data ? data.trivia_categories : [];
} 

export async function getQuestions(categoryID, amount = 5, type = "multiple"){
  const endpoint = `api.php?amount=${amount}&category=${categoryID}&type=${type}`;
  const data = await fetchData(endpoint);
  return data ? data.results : [];
}
