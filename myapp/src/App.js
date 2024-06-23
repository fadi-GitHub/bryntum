import './App.css';
import {BryntumScheduler} from "@bryntum/scheduler-react"
import React from 'react';

function App() {
  const [crudManagerConfig] = React.useState({
    loadUrl: "data.json",
    autoLoad: true,
  })

  const [columnsConfig] = React.useState([
    {text: "Name", field:"name", width: 130},
    {text: "Age", field: "age", width: 50}
  ])

  const [eventEditConfig] = React.useState({
    items: {
      nameField: {
        label: "Title",
      },
      textField:{
        label: "Text",
        type: "text",
        name: "text"
      }
    }
  })

  const handleBeforeEventEditSHow = React.useCallback(({editor, eventRecord}) => {
    const textField = editor.widgetMap.textField;
    textField.hidden = eventRecord.name === "Assign Document";
  }, [])

  return (
    <>
    <BryntumScheduler
    viewPreset = "hourAndDay"
    startDate= {new Date(2024, 2, 20, 6)}
    endDate= {new Date(2024, 2, 24, 20)}
    crudManager={crudManagerConfig}
    columns={columnsConfig}
    eventEditFeature = {eventEditConfig}
    onBeforeEventEditShow={handleBeforeEventEditSHow}
    eventMenuFeature = {{
      items : {
        editEvent: false,
        moveForward: {
          icon: "b-fa b-fa-caret-right",
          text: "Forward 1 hour",
          cls: "b-seperator",
          weight: 400,
          onItem: ({eventRecord}) => {
            eventRecord.shift(1, "hour");
          }
        }
      }
    }}
    timeAxisHeaderMenuFeature = {{
      items: {
        dateRange:{
          text: "Date range",
          weight: 190,
          style: {
            background: "green",
          }
        }
      }
    }}
    
    />
    </>
  );
}

export default App;
