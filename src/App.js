import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [enteredName, setEnteredName] = useState('')
  const [foundUserToDisplay, setFoundUserToDisplay] = useState('')
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then((response) => response.json())
      .then((data) => setList(data.data))
      .catch((error) => console.log(error));
  }, []);

  function handleChange(event) {
    setEnteredName(event.target.value)
  }

  function handleClick() {
    let foundUser = list.find((ele) => ele.first_name == enteredName)



    if (!foundUser) {
      alert('User Not Found')
      setEnteredName('')
      return
    }

    setFoundUserToDisplay(foundUser)
    setDisplay(true)
    setEnteredName('')


  }
  // console.log(foundUserToDisplay)


  return (
    <div className="App">
      <div className='searchBar'>

        <input onChange={handleChange} value={enteredName} placeholder='Enter the First Name'></input>
        <button onClick={handleClick}>search</button>
      </div>

      {
        display ?
          <div className='user' >
            <p className='id'>{foundUserToDisplay.id}</p>
            <img className='image' width={'100px'} src={foundUserToDisplay.avatar} />
            <caption className='firstName' >{foundUserToDisplay.first_name}</caption>

          </div> : ''



      }

      <div className='data'>

        {list.length > 0 ? (
          list.map((user) => (
            <div className='user' >
              <div>
                <p className='id'>{user.id}</p>
                <img className='image' src={user.avatar} />
                <caption className='firstName'>{user.first_name}</caption>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}

      </div>
    </div>
  );
}

export default App;

