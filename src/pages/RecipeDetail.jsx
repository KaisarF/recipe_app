import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function RecipeDetail() {
  const { id } = useParams(); // Mengambil id dari URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
        setRecipe(response.data); // Mengatur data resep yang diambil
      } catch (error) {
        console.error('Error fetching recipe detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return (
      <main className='w-full h-screen p-20 bg-white flex items-center justify-center'>
        <div class="loader"></div>
      </main>
    );
  }

  return (
    <main className='w-full h-screen p-20 font-black'>
      {recipe ? (
        <div>
            <div className="flex flex-row">
                <img src={recipe.image} alt="" className="w-96 h-96 rounded-4xl" />
                <div className=" mx-15 p-10 rounded-3xl bg-orange-400 w-full flex flex-col justify-start items-start text-xl">
                    <h1>name: {recipe.name}</h1>
                    <h1>difficult: {recipe.difficult}</h1>
                    <h1>servings: {recipe.servings}</h1>
                    <h1>ingredients:</h1>
                    <div className="text-base flex flex-col items-start my-3">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </div>
                    <h3 className="mt-5">preptime: {recipe.prepTimeMinutes} minutes</h3>
                </div>
            </div>
            <h1 className="my-10 text-5xl" >HOW TO MAKE IT</h1>
            <div className=" p-10 rounded-3xl bg-orange-400 w-full flex flex-col justify-start items-start text-l mb-10">
                {recipe.instructions.map((instruction,index)=>(
                    <li key={index} >{instruction}</li>
                ))}
                <h3 className="text-xl mt-5">cook time: {recipe.cookTimeMinutes} minutes</h3>
                <div className="flex flex-col items-center justify-center w-full">
                    <h2>tags</h2>
                    <div className="flex flex-row gap-5 mt-5">
                        {recipe.tags.map((tag,index)=>(
                            <span className="px-3 py-1 rounded-4xl bg-orange-900 text-white" key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            <Link className='bg-red-500 w-full h-10 px-10 py-4 text-2xl rounded-bl-4xl rounded-tr-4xl' to="/">Back to recipe list page</Link>
        </div>
      ) : (
        <p>Recipe not found.</p>
      )}
    </main>
  );
}

export default RecipeDetail;
