import { useState, useEffect } from 'react'

function App() {
  const [petList, setPetList] = useState([]);
  const [owner, setOwner] = useState([]);
  const [aboutOwner, setAboutOwner] = useState({});

  useEffect(() => {
    const fetchPets = async () => {
      try{
        const response = await fetch ('http://localhost:8080/api/v1/pets');
        const results = await response.json();
        //console.log(results);
        setPetList(results);
      }catch(error){
        console.log(`Error caught when fetching pets`, error);
      }
    }
    fetchPets();
  }, []);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch (`http://localhost:8080/api/v1/pets/owner?owner=${owner.toLowerCase()}`);
      const results = await response.json();
      console.log(results);
      setAboutOwner(results);
    }catch (error) {
      console.log(`Caught Error when submitting`, error);
    }
  }

  return (
    <>
      <h1>Pets and Owners</h1>
      <ul>
        {
          petList.map((currentPet) => {
            return (
              <li key={currentPet.name}>
              {currentPet.name}, {currentPet.type}, {currentPet.owner}</li>
            )
          })
        }
      </ul>
      <form onSubmit={(e) => {submitHandler(e)}}>
        <label>
          Owners name:
        </label>
        <input type='text' value={owner} onChange={(e) => setOwner(e.target.value)}></input>
        <button>Submit</button>
      </form>
      {
        //ternary needs an else statement, we only want an if statement
        aboutOwner.owner &&
        <p>{aboutOwner.owner} has an {aboutOwner.type} named {aboutOwner.name}!</p>
      }
    </>
  )
}

export default App
