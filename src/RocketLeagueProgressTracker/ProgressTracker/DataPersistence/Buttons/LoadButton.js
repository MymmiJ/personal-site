import { Button } from "@material-ui/core";

export const LoadButton = ({ ...buttonGroupProps }) => {
    return <Button { ...buttonGroupProps }>Load</Button>;
}