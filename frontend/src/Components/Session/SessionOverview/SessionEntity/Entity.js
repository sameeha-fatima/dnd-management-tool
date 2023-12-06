function Entity (props) {

    return (
        <div>
            <h2>{props.entity.type + " - " + props.entity.name}</h2>
        </div>
    )
}

export default Entity;