import { React, useState, useEffect } from "react";
import SessionHeader from "../Header/SessionHeader";
import EntityList from "../SessionEntity/EntityList";

function SessionLayout() {
    const [entityList, setEntityList] = useState([])
    const [entityFilter, setEntityFilter] = useState(null);

    useEffect(() => {
        fetch("/session/1", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                let entityList = []
                res.forEach((entity) => {
                    if(entity['town_id'] != null) {
                        entityList.push({
                            type: "Town",
                            name: entity['town_name']
                        })
                    }
                    else if(entity['monster_id'] != null) {
                        entityList.push({
                            type: "Monster",
                            name: entity['monster_name']
                        })
                    }
                    else if(entity['attack_id'] != null) {
                        entityList.push({
                            type: "Attack",
                            name: entity['attack_name']
                        })
                    }
                })
                setEntityList(entityList)
            });
    }, [])

    const reportValue = (event) => {
        setEntityFilter(event.target.value);
    }

    return (
        <div>
            <SessionHeader reportValue={reportValue}></SessionHeader>
            <h1>Entity List</h1>
            <EntityList entityList={entityList} entityFilter={entityFilter}></EntityList>
        </div>
    )

}

export default SessionLayout;