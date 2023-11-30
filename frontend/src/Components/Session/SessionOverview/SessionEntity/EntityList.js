import Entity from "./Entity";

function EntityList (props) {

    const entityList = props.entityList.map((entity) => {
        const entityComponent = <Entity entity={entity}></Entity>
        if(props.entityFilter == null || props.entityFilter == "All") {
            return entityComponent;
        }
        else if(props.entityFilter == entity.type) {
            return entityComponent;
        }
    })

    return (
        <div>
            {entityList}
        </div>
    )
}

export default EntityList;