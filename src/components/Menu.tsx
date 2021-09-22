import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

export interface notes {
  value: string;
  id: number;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  notes: notes[];
  id: number;
}

export const appPages: AppPage[] = [
  {
    title: 'Confidential',
    url: '/page/Confidential',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    notes: [{value: "hello", id: 1}, {value: "how are you doing", id: 2}],
    id: 1
  },
  {
    title: 'Reminders',
    url: '/page/Reminders',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
    notes: [],
    id: 2
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    notes: [],
    id: 3
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    notes: [],
    id: 4
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
    notes: [],
    id:5
  },
  {
    title: 'Todo',
    url: '/page/Todo',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
    notes: [],
    id:6
  }
];



const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Notes</IonListHeader>
          <IonNote>hi@gmail.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

       
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
