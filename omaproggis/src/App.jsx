
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Hello from './components/Hello'
import History from './components/History'
import Display from './components/Display'
import Button from './components/Button'
import Notification from './components/Notification'
import Footer from './components/Footer'
import './index.css'

const baseUrl = 'http://localhost:3001/api/notes'

const App = (props) => {
  const now = new Date()
  const ten = 10
  const two = 2

  const [counter, setCounter] = useState(0)
  const [allClicks, setAll] = useState([])
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // counterin painikkeiden tapahtumankäsitteilijät
  const increase = () => {
    setAll(allClicks.concat('+'))
    const newCounter = counter + 1
    setCounter(newCounter)
    console.log('counter set to', newCounter)
  }

  const decrease = () => {
    setAll(allClicks.concat('-'))
    const newCounter = counter - 1
    setCounter(newCounter)
    console.log('counter set to', newCounter)
  }

  const setToZero = () => {
    setAll(allClicks.concat('0'))
    const newCounter = 0
    setCounter(newCounter)
    console.log('counter set to', newCounter)
  }

  // fetching initially existing notes from the server
  useEffect(() => {
    console.log('effect')
    axios
      .get(baseUrl)
      .then(response => {
        console.log('promise fulfilled. Initial notes are:', response.data)
        setNotes(response.data)
      })
  }, [])

  const toggleImportant = () => setShowAll(!showAll)
  
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nnote = {
      id: notes.length+1, 
      content: newNote, 
      important: Math.random() > 0.5}
    const allNotes = notes.concat(nnote)
    console.log('notes are now',allNotes)
    setNotes(allNotes)
    setErrorMessage(`'${newNote}' added to the notes`)
    setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log('imput changed to',event.target.value)
    setNewNote(event.target.value)
  }


  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)
  
  
  return (
    <div>
      <Hello year={now.getFullYear().toString()}/>
      <p>Come on, it is {now.getFullYear().toString()}</p>
      <p>{ten} plus {two} is {ten+two}</p>
      <Hello year={ten} nowyear = {two}/>
      <Display counter={counter}/>
      <Button handleClick={increase} text = {'plus'}/>
      <Button handleClick={decrease} text = {'minus'}/>
      <Button handleClick={setToZero} text = {'zero'}/>
      <History allClicks={allClicks} />
      <div>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Button handleClick={toggleImportant} text = {showAll ? 'show important' : 'show all' }/>
      <Notification message={errorMessage}/>
      <ul>
          {notesToShow.map(note => 
              <Note key={note.id} content={note.content}/>
          )}
      </ul>
      </div>
      <Footer />
    </div>
  )
}
  
  export default App