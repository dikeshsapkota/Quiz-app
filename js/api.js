// Load categories from OpenTDB API
export async function fetchCategories() {
  
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
                return data.trivia_categories;
}
            
//         data.trivia_categories.forEach(cat => {
//             const option = document.createElement("option");
//             option.value = cat.id;
//             option.textContent = cat.name;
//             selectCategory.appendChild(option);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }
// loadCategories();
