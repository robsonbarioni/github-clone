import React from "react";
import Heatmap from "react-calendar-heatmap";
import { subYears, isBefore, isSameDay, addDays } from "date-fns";
import { Container } from "./styles";

type HeatmapValue = { date: Date; count: number };

const RandomCallendar: React.FC = () => {
    const startDate = subYears(new Date(), 1);
    const endDate = new Date();

    return (
        <Container>
            <div className="wrapper">
                <Heatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={generateHeatmapValues(startDate, endDate)}
                    gutterSize={3.5}
                    showWeekdayLabels
                    classForValue={(item: HeatmapValue) => {
                        let clampedCount = 0;

                        if (item !== null) {
                            clampedCount = Math.max(item.count, 0);
                            clampedCount = Math.min(clampedCount, 4);
                        }

                        return `scale-${clampedCount}`;
                    }}
                />
            </div>
            <span>Learn how we count contributions.</span>
        </Container>
    );
};

const generateHeatmapValues = (startDate: Date, endDate: Date) => {
    const values: HeatmapValue[] = [];

    let currentDate = startDate;
    while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
        const count = Math.random() * 4;
        values.push({ date: currentDate, count: Math.round(count) });
        currentDate = addDays(currentDate, 1);
    }

    return values;
};

export default RandomCallendar;