import { Button, Dialog } from "@material-ui/core";
import { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalPeopleContext } from "../../ContextProviders/GlobalPeopleProvider";
import { PeopleForm } from "../../Forms/PeopleForm";
import { addNewGlobalPeopleAction } from "../../Reducers/Actions/GlobalPersonActions/addNewGlobalPeopleAction";

const PersonFormContainer = styled.div`
    padding: 12px;
`;

export const NewPeopleModal = ({ dispatch, showModal }) => {
    const [peopleToCreate, setPeopleToCreate] = useState([]);
    const [globalPeople,dispatchGlobalPeople] = useContext(GlobalPeopleContext);

    const resetPeople = () => setPeopleToCreate([]);

    const addNewPeople = () => {
        const validPeople = peopleToCreate.filter(person => !!person.name);
        const filteredPeople = validPeople
            .filter(person => !globalPeople.find(globalPerson => globalPerson.name === person.name));
        dispatchGlobalPeople(addNewGlobalPeopleAction(filteredPeople));

        dispatch(validPeople);
        resetPeople();
    }

    return <Dialog
            PaperProps={{ style: { maxWidth: '420px' } }}
            open={showModal}
            onClose={() => {
                resetPeople();
                dispatch();
            }}
        >
        <PersonFormContainer>
            <PeopleForm people={peopleToCreate} updatePeople={setPeopleToCreate} />
            <Button onClick={addNewPeople}>Add New People</Button>
        </PersonFormContainer>
    </Dialog>;
};