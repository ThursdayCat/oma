const Note = (props) => {
   // console.log('note ', props)
    return (
        <li className="note">
            {props.content}
        </li>
    )
}

export default Note