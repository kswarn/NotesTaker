import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
// import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { useLocation } from 'react-router-dom';

import { notes } from '../components/Menu'

import { appPages } from '../components/Menu';
import React, { useEffect, useState } from 'react';
import { add } from 'ionicons/icons';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const location = useLocation();
  const pageContent = appPages.filter(page => page.url === location.pathname)

  const [addNote, setAddNote] = useState(false)
  const [notes, setNotes] = useState<notes[]>(pageContent[0].notes);

  const handleOpenAddNote = () => {
    setAddNote(!addNote)
  }

  if(addNote) {
    const form : HTMLFormElement = document.querySelector("#noteForm");
    if(form) {
      form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form)
    
        const newNote = formData.get("newNote") as string;
    
        const updatedNotes : notes[] = [{id: notes.length + 1, value: newNote}, ...notes]
        console.log(updatedNotes);
        setNotes(updatedNotes)

        handleOpenAddNote()
      }
    }
   
  }

 
 
 
 

  useEffect(() => {
    setNotes(notes)
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
       <button onClick={handleOpenAddNote}>+</button>
       {addNote ? ( <form id="noteForm">
         <label>Create new note:</label>
         <input  name="newNote" type="text"></input>
         <button type="submit">Save</button>
       </form>) : (null)}
        {notes.map(note => {
          return(
            <div key={note.id}>{note.value}</div>
          )
        })}
      </IonContent>
    </IonPage>
  );
};

export default Page;
