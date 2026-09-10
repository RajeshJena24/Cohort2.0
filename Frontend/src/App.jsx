import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [edit, setEdit] = useState(null)

  async function fetchNoteData() {
    // await axios.get('http://localhost:3000/api/notes')
    await axios.get('https://cohort2-0-z6mv.onrender.com/api/notes')
      .then(res=>{
        setNotes(res.data.notes)
      })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(name)
    console.log(description)
    console.log(price)

    // await axios.post('http://localhost:3000/api/notes', {
    //   title:name,
    //   description: description,
    //   price: price
    // })
    await axios.post('https://cohort2-0-z6mv.onrender.com/api/notes', {
      title:name,
      description: description,
      price: price
    })

    setName('')
    setDescription('')
    setPrice(0)

    fetchNoteData()
  }

  async function deleteNotes(id) {

    // await axios.delete('http://localhost:3000/api/notes/'+id)
    await axios.delete('https://cohort2-0-z6mv.onrender.com/api/notes/'+id)
    fetchNoteData()

  }

  async function updateNotes(id) {

    // await axios.patch('http://localhost:3000/api/notes/'+id, {
    //   description: description,
    //   price: price
    // })
    await axios.patch('https://cohort2-0-z6mv.onrender.com/api/notes/'+id, {
      description: description,
      price: price
    })

    setEdit(null)
    setDescription('')
    setPrice(0)
    fetchNoteData()
  }

  useEffect(() => {
    fetchNoteData()
  }, [])
  

  return (
    <div className='notes'>

      <form className='newNote' onSubmit={(e) => {
        handleSubmit(e)
      }}>
        <input
          type="text"
          placeholder='Enter title'
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder='Enter description'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
        <input
          type="number"
          placeholder='Enter price'
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />
        <button className='submit'>Submit</button>
      </form>


      {notes.map((note,idx) => {
        return <div key={idx} className='note'>
          <h1>Title: {note.title}</h1>
          <p>Description: {note.description}</p>
          <p>Price: {note.price}</p>

          <button onClick={()=>{
            deleteNotes(note._id)
          }}>Delete</button>

          <button onClick={() => {
            setEdit(note._id)      
          }}>Update</button>

          {edit===note._id && (
            <div>
              <form className='updateNote' onSubmit={(e) => {
                e.preventDefault()
                updateNotes(note._id)
              }}>
                <input type="text"
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                />
                <input type="number"
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                />
                <button>Submit</button>
              </form>
            </div>
          )}
        </div>
      })}

    </div>
  )
}

export default App