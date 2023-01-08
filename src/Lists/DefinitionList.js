// This is a strange way to do this, I'm not entirely sure what the reasoning was.
// I think originally this must have been a more restricted kind of definition list,
// and features were added until it became a convoluted version of an inbuilt <dl>.
// Lessons to take:
// 1. Name your components very restrictively - e.g. 'text definition list' should be 'TextDefinitionList'
// 2. Be careful when adding new features to old components that it doesn't dilute the actual helpfulness of the component
const DefinitionList = ({ header, entries }) => {
    return <dl>
        <dt><strong>{ header }</strong></dt>
        { entries.map((entry, i) => <dd key={ `${entry}-${i}` }>
            {entry}
        </dd>)}
    </dl>
}

export default DefinitionList;