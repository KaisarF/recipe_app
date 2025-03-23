import { React, useEffect ,useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function RecipePage() {

    const [recipes, setRecipe] = useState([])
    const [loading, setLoading] =useState(true)

    useEffect(()=>{
        const fetchRecipe = async ()=>{
            try {
                const response = await axios.get('https://dummyjson.com/recipes')
                if(Array.isArray(response.data.recipes)){
                    setRecipe(response.data.recipes)
                }else{
                    console.log('data is empty',response.data.recipes)
                }
            } catch (error) {
                console.error('Error fetching notes:', error)
            }finally{
                setLoading(false)
            }
        }
        fetchRecipe();
    },[])
    
    if(loading){
        return(
            <main className='w-full h-screen p-20 bg-white flex items-center justify-center'>
                <div class="loader"></div>
            </main>
        )
    }

  return (
    <main className='w-full h-screen p-20 font-black'>
        <h1 className="text-6xl">RECIPES APP</h1>
        <div  className="grid grid-cols-3 gap-5 my-5">
        {recipes.map((recipe)=>(
            <div key={recipe.id} className='bg-red-300 w-full h-full px-3 py-5 flex flex-col items-center justify-between gap-3' >
                <div className="flex flex-col items-center justify-start">
                    <h2> {recipe.name} </h2>
                    <img src={recipe.image} className="w-50 h-50 rounded-2xl" />
                    <div className="flex flex-col items-start" >
                        <h3>serving: {recipe.servings}</h3>
                        <h3>difficult: {recipe.difficulty}</h3>
                        <h3>cuisine: {recipe.cuisine}</h3>
                        
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {recipe.tags && recipe.tags.map((tag, index) => (
                            <span key={index} className="bg-red-900 text-white px-3 py-1 rounded-full">
                            {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <Link to={`/recipe/${recipe.id}`} className="mt-3 text-red-950">View Details</Link>
            </div>
        ))}
        </div>
        
    </main>
  )
}

export default RecipePage
