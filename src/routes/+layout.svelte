<script lang="ts">
    import '@phosphor-icons/web/regular';
    import '@phosphor-icons/web/bold';
    import '@phosphor-icons/web/fill';
    
    import '@fontsource/signika/700.css';

    import '@fontsource/source-sans-3/400.css';
    import '@fontsource/source-sans-3/400-italic.css';
    import '@fontsource/source-sans-3/700.css';
    import '@fontsource/source-sans-3/700-italic.css';

    import '$lib/css/global.css';
    import '$lib/css/input.css';
    import '$lib/css/button.css';
    import '$lib/css/main-card.css';

    import Modal from '@/modal.svelte';
    const { children } = $props();
</script>

<svelte:head>
    <title>WVSU Integrated University Information System</title>
</svelte:head>

<Modal />

{@render children?.()}

<style lang="scss">
</style>
