<script lang="ts">
    import type { Snippet } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';

    interface Props {
        children?: Snippet
        initialOption?: string | null
        options: Record<string, Snippet>
        onchange?: (option: string) => void
        disabled?: boolean
    };
    const { children, initialOption, options, onchange, disabled = false }: Props = $props();

    let currentOption = $state(initialOption ?? Object.keys(options)[0]);
    let lastOption = '';
    let _offset = $derived(currentOption ? offset() : 0);

    $effect(() => onchange?.(currentOption));

    function getMaxCharLength() {
        return Object.keys(options).sort((a, b) => b.length - a.length)[0]
            .length;
    }

    function getOffset() {
        const l = getMaxCharLength();
        const i = Object.keys(options).indexOf(currentOption);

        return `calc(${i} * (${l}ch + 3rem) + (${i + 1} * 0.25rem))`;
    }

    function offset() {
        let offset =
            Object.keys(options).indexOf(lastOption) -
            Object.keys(options).indexOf(currentOption);

        lastOption = currentOption;
        return Math.sign(offset);
    }
</script>

<div class="container">
    {@render children?.()}
    
    <ul class="switch" style:--width="{getMaxCharLength()}ch">
        <span class="handle" style:--pos={getOffset()}></span>
    
        {#each Object.keys(options) as option}
            <button
                onclick={() => (currentOption = option)}
                class="option"
                class:active={currentOption === option}
                {disabled}
                >{option.replace(/([a-z])([A-Z])/g, '$1 $2')}</button>
        {/each}
    </ul>
    
    {#key currentOption}
        <div
            class="contents"
            in:fly={{ x: `${-_offset * 2}rem`, duration: 225, easing: quintOut, delay: 225 }}
            out:fly={{ x: `${_offset * 2}rem`, duration: 225, easing: quintOut }}>
            {@render options[currentOption]()}
        </div>
    {/key}
</div>

<style lang="scss">
    .container {
        position: relative;
    }

    .switch {
        --tab-width: calc(var(--width) + 3rem);
        --gap: 0.25rem;

        display: flex;
        width: fit-content;
        user-select: none;

        padding: var(--gap);
        gap: var(--gap);

        border-radius: 0.5rem;
        background-color: var(--color-gray);

        position: relative;
        isolation: isolate;

        margin-bottom: 1rem;

        button {
            color: var(--color-text);
            opacity: 0.5;

            border: none;
            font-family: var(--font-default);
            
            padding-block: var(--gap);

            width: var(--tab-width);
            justify-content: center;

            background-color: transparent;
            z-index: 1;

            &.active {
                opacity: 1;
                color: var(--color-brand);
            }
        }

        .handle {
            font-size: 0.875rem;

            width: var(--tab-width);
            border-radius: 0.375rem;

            background-color: var(--color-primary);
            box-shadow: 0 3px 3px 0 hsla(0, 0%, 0%, 0.15);

            position: absolute;

            inset-block: var(--gap);
            left: var(--pos);

            transition: left var(--transition-fast);
        }
    }
</style>
