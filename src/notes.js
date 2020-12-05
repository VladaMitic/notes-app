import uuidv4 from 'uuid/v4';
import moment from 'moment';

let notes = [];

//Read existing notes form local storage, check existance and parse into arrey
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
}

//Save notes to local storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//Create single empty note
const createNote = () => {
    const id = uuidv4();
    const dateTimestamp = moment().valueOf();
    notes.push({
        id: id,
        title: '',
        body: '',
        dateCreated: dateTimestamp,
        dateUpdated: dateTimestamp,
    });
    saveNotes();
    return id;
}

//remove note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex(note => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
    }
}

//Sorting notes
const sortNotes = (sortedBy) => {
    if (sortedBy === 'byEditing') {
        return notes.sort((a, b) => {
            if(a.dateUpdated > b.dateUpdated) {
                return -1;
            } else if (b.dateUpdated > a.dateUpdated) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortedBy === 'byCreating') {
        return notes.sort((a, b) => {
            if (a.dateCreated > b.dateCreated) {
                return -1;
            } else if (b.dateCreated > a.dateCreated) {
                return 1;
            } else {
                return 0
            }
        })
    } else if (sortedBy === 'byAlpha') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes
    }
}

//Update note
const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if(!note) {
        return
    };

    if(typeof updates.title === 'string') {
        note.title = updates.title;
        note.dateUpdated = moment().valueOf();
    }

    if(typeof updates.body === 'string') {
        note.body = updates.body;
        note.dateUpdated = moment().valueOf();
    }

    saveNotes();
    return note
}

//Expose notes from module
const getNotes = () => notes

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote };