<script module lang="ts">
    import type { DocumentReference } from 'firebase/firestore/lite';

    export interface AssignedSubject {
        faculty: DocumentReference;
        subject_name: DocumentReference;
    }

    export interface Subject {
        code: string;
        desc: string;
        faculty: string;
        units: {
            lec: number;
            lab: number;
        };
        schedule: {
            date: {
                day: string;
                start_time: string;
                end_time: string;
            }[];
            room: string;
        }[];
    }

    export function formatTime(time: string) {
        const str = time.split(':');
        const hour = parseInt(str[0]);
        const minute = parseInt(str[1]);
        return {
            hour,
            minute,
            text: `${hour === 12 ? 12 : hour % 12}:${str[1].padStart(2, '0')} ${(hour % 24) / 12 >= 1 ? 'PM' : 'AM'}`,
        };
    }

    export const dayMap: Record<string, string> = {
        Monday: 'M',
        Tuesday: 'T',
        Wednesday: 'W',
        Thursday: 'Th',
        Friday: 'F',
        Saturday: 'Sa',
        Sunday: 'Su',
    };

    interface Props {
        subjects: Subject[];
    }
</script>

<script lang="ts">
    const { subjects }: Props = $props();

    function renderSched(node: HTMLTableSectionElement): any {
        const schedules = subjects.map(({ code, schedule }) => ({
            code,
            ...schedule[0],
        }));

        schedules.forEach(({ code, date, room }) => {
            const days = Object.keys(dayMap);
            date.toReversed().forEach(({ day, start_time, end_time }) => {
                const dayIndex = days.indexOf(day);

                const startTime = formatTime(start_time);
                const endTime = formatTime(end_time);

                console.log(startTime, endTime);

                const rows =
                    (endTime.hour - startTime.hour) * 2 +
                    (endTime.minute - startTime.minute) / 30;

                const timeIndex =
                    (startTime.hour - 7) * 2 + startTime.minute / 30;

                console.log(code, dayIndex, timeIndex, rows);
                const cell = node.rows
                    .item(timeIndex)
                    ?.cells.item(dayIndex + 1);

                [...node.rows]
                    .slice(timeIndex + 1, timeIndex + rows)
                    .forEach((r, i) => {
                        r.cells
                            .item(dayIndex + ((timeIndex + i) % 2))
                            ?.remove();
                    });

                if (cell) {
                    cell.classList.add('schedule-filled');
                    cell.rowSpan = rows;
                    cell.innerHTML = 
                        `
                            <strong>${code}</strong>
                            <p><small>${room}</small></p>
                        `;
                }
            });
        });
    }
</script>

<table>
    <thead>
        <tr>
            <th></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
        </tr>
    </thead>

    <tbody use:renderSched>
        {#each { length: 14 } as _, i}
            {@const hour = 7 + i}
            <tr>
                <td rowspan="2"
                    >{hour === 12 ? hour : hour % 12}:30 {hour < 12 ? 'AM' : (
                        'PM'
                    )}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        {/each}
        <tr></tr>
    </tbody>
</table>

<style lang="scss">
    table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
            padding-inline: 0.5rem;
        }

        th {
            font-family: var(--font-default);
            font-size: 0.875rem;
            font-weight: normal;

            opacity: 0.6;
            text-align: left;
        }
        tbody tr {
            td {
                padding-block: 0.25rem;
            
            }
            
            &:nth-child(odd) td {
                border-top: 1px solid var(--color-gray);
            }
        }

        :global(.schedule-filled) {
            place-items: center;
            text-align: center;

            position: relative;
            isolation: isolate;

            &::before {
                content: '';
                position: absolute;
                inset: 0;

                margin: 0.25rem;
                
                border: 1px solid var(--color-brand);
                border-radius: 0.25rem;
                
                z-index: -1;
            }
        }

        :global(.schedule-filled *) {
            display: flex;
            line-height: 1;
        }

        :global(.schedule-filled strong) {
            color: var(--color-accent);
        }
    }
</style>
