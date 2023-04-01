import { Button } from "@material-ui/core";

export const ExportButton = ({ ...buttonGroupProps }) => {
    return <Button { ...buttonGroupProps }>Export</Button>;
}