import { initializeEditPage, timeEdited } from './views';
import { updateNote, removeNote } from './notes';

const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note');
const dateElement = document.querySelector('#date-edited');
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

titleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    });
    dateElement.textContent = timeEdited(note.dateUpdated);
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    });
    dateElement.textContent = timeEdited(note.dateUpdated);
})

removeElement.addEventListener('click', () => {
    removeNote(noteId);
    location.assign('/index.html');
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})