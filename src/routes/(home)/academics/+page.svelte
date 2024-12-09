<script lang="ts">
    import GradientText from '@/gradient-text.svelte';
    import {
        dayMap,
        formatTime,
        type Subject,
    } from '../dashboard/schedule-graph.svelte';

    const { data } = $props();
    const { studentData } = data;

    let searchTerm = $state('');

    function filter(subjects: Subject[]) {
        return subjects.filter(
            (s) =>
                s.code.toUpperCase().includes(searchTerm.toUpperCase()) ||
                s.desc.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
</script>

<h1>Academics</h1>

{#if studentData}
    <div class="main-card">
        <GradientText gradientRule="var(--gradient-accent-brand)">
            <h2>Class Offerings</h2>
        </GradientText>

        <input
            type="text"
            placeholder="Search by subject code or description..."
            bind:value={searchTerm} />

        <section>
            <h4 style="grid-column: 1 / span 4">Filters</h4>

            <span>Academic Year</span>
            <input type="text" value="2024-2025" disabled />
            <span>Semester</span>
            <input type="text" value="1st" disabled />

            <span>College</span>
            <input
                style="grid-column-end: span 3"
                type="text"
                value="College of Information and Communications Technology (CICT)"
                disabled />

            <span>Program</span>
            <input
                style="grid-column-end: span 3"
                type="text"
                value="Bachelor of Science in Computer Science"
                disabled />
        </section>

        <table class="table-view">
            <thead>
                <tr>
                    <th rowspan="2">Subject Code</th>
                    <th rowspan="2">Subject Description</th>
                    <th rowspan="2">Subject Faculty</th>
                    <th colspan="3">
                        Units
                        <hr />
                    </th>
                    <th colspan="3" class="schedule">
                        Schedule
                        <hr />
                    </th>
                </tr>
                <tr>
                    <th>Lec</th>
                    <th>Lab</th>
                    <th>Total</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Room</th>
                </tr>
            </thead>
            <tbody>
                {#each filter(studentData.subjects) as { code, desc, faculty, units, schedule }}
                    {@const { day, end_time, start_time } = schedule[0].date[0]}
                    <tr>
                        <td rowspan={schedule[0].date.length}> {code}</td>
                        <td rowspan={schedule[0].date.length}> {desc}</td>
                        <td rowspan={schedule[0].date.length}> {faculty}</td>
                        <td
                            rowspan={schedule[0].date.length}
                            style="text-align: center">
                            {units.lec}</td>
                        <td
                            rowspan={schedule[0].date.length}
                            style="text-align: center">
                            {units.lab}</td>
                        <td
                            rowspan={schedule[0].date.length}
                            style="text-align: center">
                            {units.lec + units.lab}</td>
                        <td>
                            <strong>{dayMap[day]}</strong>
                        </td>
                        <td>
                            {formatTime(start_time).text} - {formatTime(
                                end_time
                            ).text}
                        </td>
                        <td rowspan={schedule[0].date.length}>
                            {schedule[0].room}
                        </td>
                    </tr>
                    <tr>
                        {#each schedule[0].date.slice(1) as { day, end_time, start_time }}
                            <td>
                                <strong>{dayMap[day]}</strong>
                            </td>
                            <td>
                                {formatTime(start_time).text} - {formatTime(
                                    end_time
                                ).text}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}

<style lang="scss">
    .main-card {
        font-size: 0.875rem;

        section {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr 1fr;

            align-items: center;

            gap: 0.5rem 1rem;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;

        margin-top: 1rem;

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

            &.schedule {
                min-width: 15rem;
            }
        }

        th[colspan='3'] {
            justify-items: center;

            hr {
                width: 80%;
                background-color: var(--color-gray);
                height: 1px;
                border: none;
            }
        }

        tbody tr {
            border-top: 1px solid var(--color-gray);

            td {
                padding-block: 0.25rem;
            }
        }
    }
</style>
