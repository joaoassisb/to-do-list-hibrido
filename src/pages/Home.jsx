import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonRow,
  IonGrid,
  IonCol
} from "@ionic/react";
import { contact } from "ionicons/icons";
import React, { useState } from "react";
import "./Home.css";

export default function HomePage({ history }) {
  const [user, setUser] = useState("");

  function handleChange(e) {
    setUser(e.target.value);
  }

  function login(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      return;
    }

    localStorage.setItem("user", user);

    history.push("/tasks");
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid style={{ height: "100%" }}>
          <IonRow className="ion-align-items-center" style={{ height: "100%" }}>
            <IonCol>
              <IonCard className="welcome-card">
                <IonCardHeader>
                  <IonCardTitle>Olá, seja bem vindo !</IonCardTitle>
                  <IonCardSubtitle>
                    Informe seu nome para continuar.
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={e => login(e)}>
                    <IonList>
                      <IonItem>
                        <IonLabel>
                          <IonIcon icon={contact} />
                        </IonLabel>

                        <IonInput
                          type="text"
                          name="user"
                          placeholder="Nome"
                          value={user}
                          oninput={e => handleChange(e)}
                          required
                        ></IonInput>
                      </IonItem>
                    </IonList>
                    <div className="ion-text-center">
                      <IonButton type="submit">Entrar</IonButton>
                    </div>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
