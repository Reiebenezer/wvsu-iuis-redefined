<script lang="ts">
    import GradientText from '@/gradient-text.svelte';
    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();
    const { studentData } = data;
</script>

<h1>Enrollment Confirmation</h1>

<div class="main-card">
    <GradientText gradientRule="var(--gradient-accent-brand)">
        <h2>Guidelines for Enrollment</h2>
    </GradientText>

    <ol>
        <strong>I. Personal Information</strong>
        <li>
            Make sure that your information below is complete, updated, and
            correct. Otherwise, you cannot proceed to confirm your enrollment.
        </li>
        <li>
            Should you have any lacking information in your account, proceed to
            the 'Account Information' section and update your information from
            there.
        </li>
    </ol>

    <ol>
        <strong>II. Scholarship Application</strong>
        <li>
            Should you opt for a scholarship this semester, download and fill
            out the applicable Scholarship Application Form provided to you by
            this portal.
        </li>
        <li>
            Follow the procedure(s) on the next page on how to upload said form.
        </li>
        <li>
            The uploaded scholarship form(s) will be reviewed by the OSA
            Scholarship Coordinator.
        </li>
    </ol>

    <ol>
        <strong>III. Miscellaneous</strong>
        <li>
            You are not allowed to make any modifications to your enrollment
            confirmation form after submission.
        </li>
        <li>
            Once submitted, any changes to your personal information on your
            account will not be accepted. You are only allowed to change your
            information once enrollment opens again.
        </li>
        <li>
            The confirmation email will be sent to both your school email
            address and your IUIS messaging account.
        </li>
        <li>
            To avoid problems with your enrollment, check out the guidelines and
            procedure through this link: <a
                href="https://wvsu.edu.ph/general-guidelines-of-online-enrollment/"
                >https://wvsu.edu.ph/general-guidelines-of-online-enrollment/</a>
        </li>
    </ol>
</div>

{#if studentData}
    <div class="main-card">
        <GradientText gradientRule="var(--gradient-accent-brand)">
            <h2>Enrollment Form</h2>
        </GradientText>

        <form>
            <p>
                I. Personal Information
                <a href="/account-information">[Edit]</a>
            </p>
            <label style:grid-column="1 / span 2">
                Complete Name
                <input
                    type="text"
                    value={studentData.name.toUpperCase()}
                    disabled />
            </label>
            <label>
                Student ID
                <input
                    type="text"
                    value={studentData.studentID}
                    disabled />
            </label>
            <label>
                Grade/Year Level
                <input
                    type="text"
                    value="Third Year Undergraduate"
                    disabled />
            </label>
            <label style:grid-column="2 / span 2">
                Permanent Address
                <input
                    type="text"
                    value="Purok 1 Yapo, Barbaza, Antique"
                    disabled />
            </label>
            <label>
                Contact Number
                <input
                    type="text"
                    value="+63 997 087 1255"
                    disabled />
            </label>
            <label style:grid-column="2 / span 2">
                Email Address
                <input
                    type="text"
                    value={studentData.email}
                    disabled />
            </label>

            <p>II. Payment and Scholarships</p>
            <label style:grid-column="1 / span 3">
                Mode of Payment
                <input
                    type="text"
                    value="Full Payment"
                    disabled />
            </label>
            <label style:grid-column="1 / span 2">
                Scholarship
                <input
                    type="text"
                    value="FREE HIGHER EDUCATION"
                    disabled />
            </label>
            <button class="secondary outlined" type="button">
                Upload Scholarship Documents
            </button>
            <p>III. Enrollment Agreement</p>
            <label style:grid-column="1 / span 3">
                <input type="checkbox" name="" id="">
                <span>
                    I hereby signify that the above-stated information are true and correct and do agree to share my personal information with
                    <strong>West Visayas State University</strong> authorities.
                </span>
            </label>
            <button>
                Submit Enrollment Form
            </button>
        </form>
    </div>
{/if}

<style lang="scss">
    ol li {
        margin-left: 2rem;
    }

    form {
        display: grid;
        grid-template-columns: 2fr 1fr 2fr;
        gap: 1rem;
        
        button {
            align-self: flex-end;
            width: fit-content;
        }

        p {
            grid-column: 1 / span 3;
            margin-block: 1rem 0.5rem;
        }
    }
</style>
