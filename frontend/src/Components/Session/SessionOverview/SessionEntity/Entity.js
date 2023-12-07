import { useNavigate } from "react-router-dom";

function Entity (props) {
    const navigation = useNavigate()

    return (
        <div>
            <h2 onClick={() => navigation('/editEntity')}>{props.entity.type + " - " + props.entity.name}</h2>
        </div>
    )
}

export default Entity;