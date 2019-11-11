import React, { useState } from "react";
import {
  IonList,
  IonItem,
  IonDatetime,
  IonInput,
  IonButton,
  IonRow,
  IonGrid,
  IonCol
} from "@ionic/react";

import { Plugins } from "@capacitor/core";
const { LocalNotifications } = Plugins;

export function NewTask({ closeModal }) {
  const [task, setState] = useState({
    label: "",
    date: null
  });

  function handleChange(e) {
    setState({
      ...task,
      [e.target.name]: e.target.value
    });
  }

  function createTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
      label: task.label,
      date: task.date,
      checked: false
    };

    //criar notificação nativa

    LocalNotifications.schedule({
      notifications: [
        {
          title: "Tarefa",
          body: newTask.label,
          id: Math.random(),
          schedule: { at: newTask.date },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  return (
    <IonGrid style={{ height: "100%" }}>
      <IonRow style={{ height: "100%" }}>
        <IonCol>
          <form onSubmit={createTask}>
            <IonList>
              <IonItem>
                <IonInput
                  type="text"
                  name="label"
                  placeholder="Digite uma tarefa"
                  value={task.label}
                  onIonInput={e => handleChange(e)}
                  required
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonDatetime
                  placeholder="Selecione a data"
                  displayFormat="DD/MM/YYYY"
                  value={task.date}
                  pickerOptions={{
                    buttons: [
                      {
                        text: "Cancelar",
                        handler: () => {}
                      },
                      {
                        text: "Selecionar",
                        handler: ({ year, month, day }) => {
                          const date = new Date(
                            year.value,
                            month.value - 1,
                            day.value
                          );
                          setState({
                            ...task,
                            date
                          });
                        }
                      }
                    ]
                  }}
                ></IonDatetime>
              </IonItem>
            </IonList>
            <div className="ion-text-center">
              <IonButton
                type="button"
                color="danger"
                onClick={() => closeModal()}
              >
                Cancelar
              </IonButton>
              <IonButton type="submit" color="success">
                Salvar
              </IonButton>
            </div>
          </form>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
