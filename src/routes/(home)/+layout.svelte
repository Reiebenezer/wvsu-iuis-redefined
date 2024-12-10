<script lang="ts">
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';
    import Navigation from './navigation.svelte';
    import GradientText from '@/gradient-text.svelte';

    const { children, data } = $props();
</script>

<div class="container">
    <Navigation
        options={[
            {
                displayName: 'Dashboard',
                route: '/dashboard',
                icon: 'squares-four',
            },
            {
                displayName: 'Account',
                route: '/account-information',
                icon: 'user',
            },
            {
                displayName: 'Academics',
                route: '/academics',
                icon: 'graduation-cap',
            },
            {
                displayName: 'Enrollment',
                route: '/enrollment',
                icon: 'notebook',
            },
            // {
            //     displayName: 'Inbox',
            //     route: '/inbox',
            //     icon: 'chat-circle',
            // },
        ]} />
    <section>
        {#key data.pathname}
            <main
                in:fly={{ y: '-1rem', duration: 300, delay: 300 }}
                out:fly={{ y: '1rem', duration: 300 }}>
                {@render children?.()}
            </main>
        {/key}
    </section>
    <aside>
        <div class="card">
            <h3>Upcoming Events</h3>
            {#snippet calendar(month: string, day: number, caption: string)}
                <div class="calendar-event">
                    <div>
                        <small>{month}</small>
                        <h2>{day}</h2>
                    </div>
                    <p class="opacity-faded">{caption}</p>
                </div>
            {/snippet}
            {@render calendar(
                'SEPT',
                16,
                'Wearing of Complete School Uniform (Freshmen)'
            )}
            {@render calendar('SEPT', 20, 'Pag-iririmaw 2024')}
            {@render calendar('DEC', 11, '1st Semester Finals Day 1')}
        </div>

        <div class="card messages">
            <h3>Messages</h3>
            <p>
                <i class="ph ph-bell-simple-ringing"></i>
                <span class="opacity-faded">
                    ADMIN: Registration/Enrollemnt is now closed.
                </span>
            </p>
            <p>
                <i class="ph ph-envelope-simple"></i>
                <span class="opacity-faded">
                    Enrollment Confirmation Message
                </span>
            </p>
            <p>
                <i class="ph ph-envelope-simple"></i>
                <span class="opacity-faded"
                    >Scholarship Discount Confirmation
                </span>
            </p>
        </div>

        <div class="card documents">
            <h3>Documents</h3>
            {#snippet document(label: string, href?: string)}
                <p>
                    {label}
                    <a
                        {href}
                        class="button secondary outlined icon"
                        aria-label="Download {label}">
                        <i class="ph ph-arrow-line-down"></i>
                    </a>
                </p>
            {/snippet}
            {@render document('Certificate of Registration')}
            {@render document('Enrollment Confirmation')}
            {@render document('Scholarship/Discount Confirmation')}
        </div>
    </aside>
</div>

<style lang="scss">
    .container {
        display: grid;
        grid-template-columns: auto 3fr 1fr;

        position: fixed;
        inset: 0;

        overflow: hidden;
    }

    section {
        height: 100svh;
        background-color: var(--color-gray);
    }

    main {
        padding: 1.5rem;
        height: 100%;

        overflow-y: auto;
        scrollbar-gutter: stable;

        display: flex;
        flex-direction: column;

        gap: 1rem;
    }

    aside {
        display: grid;

        padding: 1.5rem;
        gap: 1.5rem;

        overflow-y: auto;

        .card {
            border: 1px solid var(--color-gray);
            border-radius: 0.75rem;

            padding: 1rem;

            h3 {
                margin-bottom: 1rem;
            }
        }

        .messages p,
        .documents p {
            display: flex;
            align-items: center;

            gap: 0.5rem;
            margin-block: 0.5rem;
        }

        .documents p {
            justify-content: space-between;
        }
    }

    .calendar-event {
        display: flex;
        align-items: center;

        gap: 0.5rem;
        margin-block: 0.5rem;

        > div {
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid var(--color-gray);

            display: grid;
            place-items: center;

            h2 {
                color: var(--color-accent);
            }
        }
    }

    :global(h1) {
        margin-bottom: 1rem;
    }
</style>
