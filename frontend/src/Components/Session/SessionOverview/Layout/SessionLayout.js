import {React, useState, useEffect} from "react";
import SessionHeader from "../Header/SessionHeader";
import EntityList from "../SessionEntity/EntityList";

function SessionLayout() {
    const [entityList, setEntityList] = useState([])
    const [entityFilter, setEntityFilter] = useState(null);

    useEffect(() => {
        //api call to get all entities in the session
    }, [])

    const reportValue = (event) => {
        setEntityFilter(event.target.value);
    }

    return (
        <div>
            <SessionHeader reportValue={reportValue}></SessionHeader>
            <EntityList entityList={entityList} entityFilter={entityFilter}></EntityList>
        </div>
    )

}

export default SessionLayout;