// Load categories from OpenTDB API
export async function fetchCategories() {
  
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
                return data.trivia_categories;
}
            
 

export async function fetchQuestions(categoryId) {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=5&category=${categoryId}&type=multiple`
  );
  const data = await res.json();
  return data.results;
}
