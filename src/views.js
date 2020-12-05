import moment from 'moment';
import { getFilters } from './filters';
import { sortNotes, getNotes } from './notes';

//Generate DOM structure for a note
const generateNoteDom = (note) => {
    //create element
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p');

    //setup note title
    if(note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unnamed note';
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl);

    //setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`);
    noteEl.classList.add('list-item');

    //setup status message
    statusEl.textContent = timeEdited(note.dateUpdated);
    statusEl.classList.add('list-item__subtitle');
    noteEl.appendChild(statusEl);

    return noteEl;
}

//Render notes
const renderNotes = () => {
    const notesElement = document.querySelector('#notes');
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
    notesElement.innerHTML = '';
    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDom(note);
            notesElement.appendChild(noteEl);
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent= 'No notes to show';
        emptyMessage.classList.add('empty-message');
        notesElement.appendChild(emptyMessage);
    }
}

//initialise edit page
const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title');
    const bodyElement = document.querySelector('#note-body');
    const dateElement = document.querySelector('#date-edited');
    
    const notes = getNotes();
    const note = notes.find((note) => note.id === noteId)
    
    if (!note) {
        location.assign('/index.html');
    }

    console.log(note)
    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = timeEdited(note.dateUpdated);
}

//Generate editing time
const timeEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`;

export { generateNoteDom, renderNotes, timeEdited, initializeEditPage }