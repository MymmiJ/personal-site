import { Typography } from "@material-ui/core"
import { FundamentalForm } from "./FundamentalForm";

export const FundamentalsForm = ({ fundamentals = [], updateFundamentals }) => {
    const updateFundamental = (i) => (fundamental) => {
        if(fundamental) {
            updateFundamentals([...fundamentals.slice(0,i), fundamental, ...fundamentals.slice(i+1)]);
        } else {
            updateFundamentals([...fundamentals.slice(0,i), ...fundamentals.slice(i+1)]);
        }
    }
    const fundamentalsPlusNext = [...fundamentals, ''];
    return <>
        <Typography>Fundamentals:</Typography>
        { fundamentalsPlusNext.map((fundamental, i) =>
            <FundamentalForm
                fundamental={fundamental}
                updateFundamental={updateFundamental(i)}
                key={i}
            />)}
    </>
}