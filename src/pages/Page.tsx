import { IonButtons, IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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

  const [addNote, setAddNote] = useState(false)
  const [notes, setNotes] = useState<notes[]>([]);

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
     
        setNotes(updatedNotes)

        handleOpenAddNote()
      }
    }
   
  }

 
 
 


  useEffect(() => {
   
      const pageContent = appPages.filter(page => page.url === location.pathname)
 
    setNotes(pageContent[0].notes)
    
    
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}
            <IonButton onClick={handleOpenAddNote} style={{float: "Right"}} shape="round" size="default" color="light">+</IonButton></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
       
       {/* <button >+</button> */}
       {addNote ? ( <form id="noteForm">
         <label>Create new note:</label>
         <input  name="newNote" type="text"></input>
         <button type="submit">Save</button>
       </form>) : (null)}
        {notes.map(note => {
          return(
            <div className="note-card" key={note.id}>{note.value}</div>
          )
        })}
      </IonContent>
    </IonPage>
  );
};

export default Page;
