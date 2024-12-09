<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        children?: Snippet;
        gradientRule: string;
    }

    const { children, gradientRule }: Props = $props();
</script>

<div class="gradient-text" style:--gradient-rule={gradientRule}>
    {@render children?.()}
</div>

<style lang="scss">
    .gradient-text {
        font: inherit;

        background-image: var(--gradient-rule);
        color: transparent;

        width: fit-content;

        background-clip: text;
        -webkit-background-clip: text;
    }
</style>
