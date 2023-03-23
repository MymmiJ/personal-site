import { createContext, useReducer } from "react";
import { measurementMaker, ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS } from "../Factories/measurementsMaker";
import { globalMeasurementsReducer } from "../Reducers/globalMeasurementsReducer";

export const GlobalMeasurementsContext = createContext();

export const GlobalMeasurementsProvider = ({ children }) => {
    const [globalMeasurements, dispatch] = useReducer(globalMeasurementsReducer, [
        measurementMaker(
            'Level Reached',
            0,
            ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.NUMBER,
            [],
        ),
        measurementMaker(
            'Time Taken',
            0,
            ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.TIME,
            [],
        ),
        measurementMaker(
            'Failed Attempts',
            0,
            ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.NUMBER,
            [],
        ),
        measurementMaker(
            'Successful Attempts (Consecutive)',
            0,
            ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.NUMBER,
            [],
        )
    ]);

    return <GlobalMeasurementsContext.Provider value={[globalMeasurements, dispatch]}>
        {children}
    </GlobalMeasurementsContext.Provider>;
}
