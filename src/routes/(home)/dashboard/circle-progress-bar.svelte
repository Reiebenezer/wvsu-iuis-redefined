<script lang="ts">
    import type { Snippet } from 'svelte';
    import { bounceOut } from 'svelte/easing';
    import { draw } from 'svelte/transition';

    interface Props {
        completed: number;
        total: number;
        centerLabel?: Snippet | string;
    }

    const { completed, total, centerLabel }: Props = $props();
    let angle = Math.floor((completed / total) * 360);
</script>

<div class="circle-progress-bar">
    <svg viewBox="0 0 100 100" width="100%" height="100%">
        <!-- <rect x=0 y=0 width=100 height=100 /> -->
        <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--color-gray)"
            stroke-width="8"></circle>
        <path
            d="
                M 50 10
                A 40 40 0 {Math.floor(angle / 180)} 1 
                {50 + 40 * Math.cos(((angle + 270) * Math.PI) / 180)}
                {50 + 40 * Math.sin(((angle + 270) * Math.PI) / 180)}
            "
            in:draw={{ easing: bounceOut, duration: 1000 }}
            fill="none"
            stroke="var(--color-brand)"
            stroke-linecap="round"
            stroke-width="8"></path>
    </svg>

    <div class="label">
        {#if typeof centerLabel === 'string'}
            {@html centerLabel}
        {:else}
            {@render centerLabel?.()}
        {/if}
    </div>
</div>

<style lang="scss">
    .circle-progress-bar {
        position: relative;
        height: fit-content;

        display: grid;
        place-items: center;

        max-width: var(--max-width, 7rem);

        .label {
            position: absolute;
        }
    }
</style>
