const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)  

    if (duplicateNotes){
        notes.push({
            title: title,
            body: body
          })
          saveNotes(notes)
          console.log(chalk.bgGreen('new note added!'))
      }
      else{
        console.log(chalk.bgRed('note title is taken!'))
      }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length){
    saveNotes(notesToKeep)
    console.log(chalk.bgGreen('note removed'))
} else{
    console.log(chalk.bgRed('note doesnt exist'))
}
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes: '))
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log('note not found!')
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
}





module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}