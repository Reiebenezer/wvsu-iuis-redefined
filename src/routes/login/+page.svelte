<script lang="ts">
    import logo from '$lib/assets/wvsu-logo.png';
    import logoNew from '$lib/assets/wvsu-modern-logo.png';
    import bg from '$lib/assets/bg.jpg';
    import SwitchView from '@/switch-view.svelte';
    import GradientText from '@/gradient-text.svelte';
    import { openModal } from '@/modal.svelte';
    import type { FormEventHandler } from 'svelte/elements';
    import { collection, doc, getDoc } from 'firebase/firestore/lite';
    import db from '$lib/ts/firebase.app';
    import { createRawSnippet } from 'svelte';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

    let disabled = $state(false);

    const verifyLogin: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        disabled = true;

        const data = new Map(new FormData(e.currentTarget).entries());
        const student = await getDoc(
            doc(
                collection(db, 'students'),
                data.get('id')?.toString().toUpperCase()
            )
        );

        if (!student.exists()) {
            disabled = false;
            return openModal(
                `<div>
                    <h2>Login Error</h2>
                    <br>
                    <p>
                        Student #${data.get('id')}# does not exist in the database.
                        Check if you have entered the correct student ID number. Otherwise,
                        please reach out to the Management Information System for consultation.
                    </p>
                </div>`
            );
        }

        if (student.data()['password'] !== data.get('password')) {
            disabled = false;
            return openModal(
                `<div>
                    <h2>Incorrect Password</h2>
                    <br>
                    <p>The password you have entered is incorrect.</p>
                </div>`
            );
        }

        if (browser) {
            sessionStorage.setItem(
                'student-name',
                data.get('id')!.toString().toUpperCase()
            );
            goto('/dashboard');
        }
    };
</script>

<main>
    <section>
        <div class="logos">
            <img src={logo} alt="wvsu-logo" />
            <img src={logoNew} alt="wvsu-modern-logo" />
        </div>

        <h1>
            <GradientText
                gradientRule="radial-gradient(farthest-corner at bottom right, var(--color-brand), var(--color-accent) 70%)">
                Integrated University<br />Information System
            </GradientText>
        </h1>

        <p>Sign in to your account to continue.</p>

        {#snippet DataPrivacyAgreement()}
            <div class="data-privacy">
                <h3>Data Privacy Agreement</h3>

                <p style="display: inline-block">
                    In accordance with RA 10173 or the <a
                        href="https://privacy.gov.ph/data-privacy-act/"
                        >Data Privacy Act of 2012</a
                    >, I consent to the following terms and conditions on the
                    collection, use, processing and disdosure of my personal
                    data:
                </p>

                <p style="display: inline-block">
                    Please open this link <a href="https://wvsu.edu.ph/privacy/"
                        >https://wvsu.edu.ph/privacy/</a> and read the Privacy Notice
                    before you click “I agree to these terms” below.
                </p>

                <p style="display: inline-block">
                    1. I am aware that WVSU has collected and stored my personal
                    data during my admission. These data include my demographic
                    profile, contact details like addresses, email address and
                    landline/mobile numbers.
                </p>

                <p style="display: inline-block">
                    2. I express my consent for WVSU to collect, use, record,
                    disclose, transfer, store, organize, update, monitor, and/or
                    process my personal information.
                </p>
            </div>
        {/snippet}

        {#snippet Login()}
            <form onsubmit={verifyLogin}>
                <label>
                    Student ID Number
                    <input
                        type="text"
                        name="id"
                        placeholder="Ex. 2024M0123"
                        required />
                </label>
                <label>
                    Password
                    <input type="password" name="password" required />
                </label>

                <label>
                    <input type="checkbox" required />
                    <span>
                        I have read and agree to the terms of the
                        <a
                            href="#data-privacy-agreement"
                            onclick={() => openModal(DataPrivacyAgreement)}>
                            Data Privacy Agreement
                        </a></span>
                </label>

                <button class="elevated" {disabled} >Log In</button>
            </form>
        {/snippet}

        {#snippet ForgotPassword()}
            <form>
                <label>
                    University Email
                    <input type="email" placeholder="firstname.lastname@wvsu.edu.ph" />
                </label>
                <button class="elevated" >Send Recovery Request</button>
            </form>
        {/snippet}

        <SwitchView options={{ Login, ForgotPassword }} {disabled} />
    </section>

    <div class="bg">
        <img src={bg} alt="" />
    </div>
</main>

<style lang="scss">
    h1 {
        font-size: 3rem;
        text-shadow: var(--text-shadow-medium);
    }

    main {
        display: grid;
        grid-template-columns: auto 1fr;

        position: fixed;
        inset: 0;

        .bg {
            position: relative;

            &::after {
                content: '';

                position: absolute;
                inset: 0;

                background: var(--gradient-accent-gray);
                opacity: 0.5;
            }

            img {
                height: 100%;
                object-fit: cover;
                mix-blend-mode: screen;
            }
        }
    }

    section {
        padding: 2rem 4rem;

        display: flex;
        flex-direction: column;

        max-height: 100svh;
        overflow-y: auto;

        gap: 1.5rem;
        scrollbar-gutter: stable;

        .logos {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        label {
            margin-bottom: 1rem;
        }
    }

    .data-privacy {
        display: grid;
        gap: 1rem;

        h3 {
            color: var(--color-accent);
        }
    }
</style>
