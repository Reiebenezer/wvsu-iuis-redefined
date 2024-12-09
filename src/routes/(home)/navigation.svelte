<script lang="ts">
    import logo from '$lib/assets/wvsu-logo.png';
    import bg from '$lib/assets/bg.jpg';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

    interface Props {
        options: {
            displayName: string;
            route: `/${string}`;
            icon: string;
        }[];
    }

    let { options }: Props = $props();

    function matchRoute(route: `/${string}`) {
        return $page.url.pathname === route;
    }

    function logOut() {
        if (browser) {
            sessionStorage.clear();
            goto('/login');
        }
    }
</script>

<nav style:--bg="url('{bg}')">
    <div class="logos">
        <img src={logo} alt="" class="logo" />
    </div>

    <div class="buttons">
        {#each options as { displayName, icon, route }}
            <a href={route}>
                <button
                    class="icon"
                    aria-label={displayName}
                    class:active={matchRoute(route)}>
                    <i
                        class="ph-{matchRoute(route) ? 'fill' : (
                            'bold'
                        )} ph-{icon}"></i>
                </button>
                <span>{displayName}</span>
            </a>
        {/each}
    </div>

    <button onclick={logOut} class="secondary log-out">
        <i class="ph-bold ph-arrow-bend-up-left"></i>
        Log Out
    </button>
</nav>

<style lang="scss">
    nav {
        background: var(--bg) left/cover no-repeat;

        position: relative;
        isolation: isolate;

        padding: 1.5rem;
        display: grid;

        &::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;

            background: var(--gradient-accent-gray);
            opacity: 0.5;
        }

        .buttons {
            display: grid;
            height: fit-content;

            gap: 1rem;

            a {
                text-decoration: none;
                display: flex;

                gap: 0.5rem;
                align-items: center;

                font-family: var(--font-display);
                color: var(--color-primary);

                button {
                    background-color: transparent;
                    font-size: 1.5rem;
                    padding: 0.5rem;

                    color: var(--color-primary);

                    &.active {
                        background-color: var(--color-primary);
                        color: var(--color-brand);
                    }
                }
            }
        }
    }

    .logos {
        height: fit-content;
        display: flex;

        align-items: center;
        gap: 0.5rem;

        :first-child {
            width: 3rem;
        }
    }

    .log-out {
        align-self: flex-end;
        justify-content: center;
    }
</style>
