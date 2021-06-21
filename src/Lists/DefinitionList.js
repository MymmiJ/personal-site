const DefinitionList = ({ header, entries }) => {
    return <dl>
        <dt><strong>{ header }</strong></dt>
        { entries.map((entry, i) => <dd key={ `${entry}-${i}` }>
            {entry}
        </dd>)}
    </dl>
}

export default DefinitionList;