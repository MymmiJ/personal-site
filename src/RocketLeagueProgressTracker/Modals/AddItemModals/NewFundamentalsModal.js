import { Button, Dialog } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { FundamentalsForm } from "../../Forms/FundamentalsForm";

const FundamentalsFormContainer = styled.div`
    padding: 12px;
`;

export const NewFundamentalsModal = ({ dispatch, existingFundamentals, closeModal, showModal }) => {
    const [fundamentalsToCreate, setFundamentalsToCreate] = useState([]);

    const resetFundamentals = () => setFundamentalsToCreate([]);

    const addNewFundamentals = () => {
        const validFundamentals = fundamentalsToCreate.filter(fundamental => !!fundamental);
        const filteredFundamentals = validFundamentals
            .filter(fundamental => !existingFundamentals.includes(fundamental));
        dispatch(filteredFundamentals);
        resetFundamentals();
        closeModal();
    }

    return <Dialog
            PaperProps={{ style: { maxWidth: '420px' } }}
            open={showModal}
            onClose={() => {
                resetFundamentals();
                closeModal();
            }}
        >
        <FundamentalsFormContainer>
            <FundamentalsForm fundamentals={fundamentalsToCreate} updateFundamentals={setFundamentalsToCreate} />
            <Button onClick={addNewFundamentals}>Add New Fundamentals</Button>
        </FundamentalsFormContainer>
    </Dialog>;
};