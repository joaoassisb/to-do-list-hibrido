import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonButton,
  IonCheckbox,
  IonFabButton,
  IonIcon,
  IonModal,
  IonListHeader,
  IonLabel,
  IonRow,
  IonCol,
  IonAlert
} from "@ionic/react";
import { add, trash, logOut } from "ionicons/icons";
import React, { useState } from "react";
import { NewTask } from "./NewTask.jsx";

export function TasksPage({ history }) {
  const [showAlert, setShowAlert] = useState(false);
  const user = localStorage.getItem("user");

  function logout() {
    localStorage.removeItem("user");
    localStorage.setItem("tasks", JSON.stringify([]));
    history.push("/home");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={e => setShowAlert(true)}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
          <IonTitle>Tarefas </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="ion-text-center">
          <h4>Olá {user} !</h4>
        </div>
        <ListItems />
      </IonContent>
      <TaskModal />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Deseja sair do app?"}
        subHeader={" Todas tarefas serão perdidas."}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: () => setShowAlert(false)
          },
          {
            text: "Confirmar",
            handler: () => logout()
          }
        ]}
      />
    </IonPage>
  );
}

const ListItems = () => {
  const [tasks, setState] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  function finishTask(e, index) {
    e.preventDefault();
    e.stopPropagation();

    const tasks = JSON.parse(localStorage.getItem("tasks") || []);

    const newTasks = tasks.map(function(task, i) {
      if (i === index) {
        task.checked = !task.checked;
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setState(newTasks);
  }

  function deleteTask(e, index) {
    e.preventDefault();
    e.stopPropagation();

    const tasks = JSON.parse(localStorage.getItem("tasks") || []);

    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    setState(tasks);
  }

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Minhas Tarefas</IonLabel>
      </IonListHeader>
      {tasks.length === 0 ? (
        <IonItem>
          <em>Nenhuma tarefa cadastrada ainda.</em>
        </IonItem>
      ) : (
        tasks.map(({ label, date, checked }, index) => {
          return (
            <IonRow key={index}>
              <IonCol size="10">
                <IonItem>
                  <IonLabel>
                    <span
                      style={{
                        textDecoration: checked ? "line-through" : ""
                      }}
                    >
                      {label} - ({formatDate(date)})
                    </span>
                  </IonLabel>
                  <IonCheckbox
                    slot="start"
                    color="primary"
                    checked={checked}
                    onIonChange={e => finishTask(e, index)}
                  ></IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="2">
                <IonButton onClick={e => deleteTask(e, index)} color="danger">
                  <IonIcon icon={trash} color="light"></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          );
        })
      )}
    </IonList>
  );
};

function TaskModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <IonModal isOpen={showModal} showBackdrop={true} animated={true}>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Nova Tarefa </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <NewTask closeModal={() => setShowModal(false)}></NewTask>
        </IonContent>
      </IonModal>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setShowModal(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </div>
  );
}

function formatDate(value) {
  if (!value) {
    return "";
  }
  let date = value;

  if (typeof value === "string") {
    date = new Date(value);
  }

  const YYYY = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());

  return `${DD}/${MM}/${YYYY}`;
}

const pad = function(i) {
  return (i < 10 ? "0" : "") + i;
};
