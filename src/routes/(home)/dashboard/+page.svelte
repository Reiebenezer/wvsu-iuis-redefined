<script lang="ts">
    import { goto } from '$app/navigation';
    import GradientText from '@/gradient-text.svelte';
    import CircleProgressBar from './circle-progress-bar.svelte';
    import SwitchView from '@/switch-view.svelte';
    import ScheduleGraph, {
        type AssignedSubject,
        type Subject,
        formatTime,
        dayMap,
    } from './schedule-graph.svelte';
    import { page } from '$app/stores';

    import { PDFDocument } from 'pdf-lib';
    import fontkit from '@pdf-lib/fontkit';

    import Signika from '@fontsource/signika/files/signika-latin-700-normal.woff2';
    import SourceSans3 from '@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2';
    import SourceSans3Italic from '@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-italic.woff2';
    import logo from '$lib/assets/wvsu-logo.png';
    import { getStudentData } from '$lib/ts/db';
    import type { PageData } from './$types';

    async function downloadSchedule() {}

    function getTotalUnits(subjects: Subject[]) {
        return subjects.reduce(
            (prev, curr) => prev + curr.units.lec + curr.units.lab,
            0
        );
    }

    const { data }: { data: PageData } = $props();
    const { studentData } = data;
</script>

<h1>Dashboard</h1>

{#if studentData}
    <section>
        <div class="main-card profile">
            <div class="name">
                <img src="" alt="" />
                <span>
                    <GradientText gradientRule="var(--gradient-accent-brand)">
                        <h2>{studentData.name}</h2>
                    </GradientText>
                    <p>Student ID: {studentData.studentID}</p>
                </span>
            </div>

            <div class="details">
                <p><i class="ph ph-envelope"></i>{studentData.email}</p>
                <p>
                    <i class="ph ph-graduation-cap"></i>Bachelor of Science in
                    Computer Science
                </p>
                <p>
                    <i class="ph ph-book-open"></i><strong>ENROLLED</strong>
                    for AY 2024-2025, 1st Semester
                </p>
            </div>

            <a class="button" href="/account-information">
                View Account Details
            </a>
        </div>

        <div class="main-card gwa">
            {#snippet progress()}
                <div class="progress">
                    <small>Curriculum</small>
                    <h2>44%</h2>
                </div>
            {/snippet}
            <CircleProgressBar
                completed={44}
                total={100}
                centerLabel={progress} />
            <div>
                <p style="opacity: 0.5">General Weighted Average</p>
                <h1>
                    <GradientText gradientRule="var(--gradient-accent-brand)">
                        0.00
                    </GradientText>
                </h1>
                <button disabled title="This feature is not yet available."
                    >View Grades</button>
            </div>
        </div>
    </section>
    <section class="main-card">
        <h2>Schedule</h2>
        {#snippet TableView()}
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
                    {#each studentData.subjects as { code, desc, faculty, units, schedule }}
                        {@const { day, end_time, start_time } =
                            schedule[0].date[0]}
                        <tr>
                            <td rowspan={schedule[0].date.length}> {code}</td>
                            <td rowspan={schedule[0].date.length}> {desc}</td>
                            <td rowspan={schedule[0].date.length}>
                                {faculty}</td>
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
        {/snippet}

        {#snippet GraphView()}
            <ScheduleGraph subjects={studentData!.subjects} />
        {/snippet}

        <SwitchView
            options={{ TableView, GraphView }}
            initialOption={$page.url.searchParams.get('schedule-view')}
            onchange={(opt) => {
                const p = $page.url.searchParams;
                p.set('schedule-view', opt);
                goto(`?${p.toString()}`);
            }}>
            <div class="cta">
                <p>
                    Total: <span class="highlight"
                        >{getTotalUnits(studentData.subjects ?? [])} units</span>
                </p>
                <button
                    onclick={downloadSchedule}
                    disabled
                    title="This feature is not yet available."
                    >Download Schedule</button>
            </div>
        </SwitchView>
    </section>
{/if}

<style lang="scss">
    section:first-of-type {
        display: grid;
        grid-template-columns: 1fr 1fr;

        gap: 1.5rem;

        .main-card {
            align-items: center;
        }
    }

    section:nth-of-type(2) {
        .cta {
            position: absolute;
            right: 0;

            display: flex;
            align-items: center;
            gap: 1rem;
        }

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
    }

    .profile {
        .name {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            img {
                --size: 4rem;

                width: var(--size);
                height: var(--size);

                object-fit: cover;
                border-radius: 100vw;
            }

            span {
                flex-grow: 1;
            }
        }
        .details {
            i {
                margin-right: 0.5rem;
                vertical-align: middle;
            }
        }

        > a {
            justify-content: center;
        }
    }

    .gwa {
        display: flex;

        h1 {
            text-shadow: var(--text-shadow-small);
            font-size: 3rem;
        }

        .progress {
            display: grid;
            place-items: center;
        }
    }
</style>
