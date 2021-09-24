const { openBrowser, goto, click, into, write, button, text, toRightOf, closeBrowser } = require('taiko');
const assert = require('assert').strict;

(async () => {
    try {
        await openBrowser();
        await goto("https://classroom.google.com/u/2/a/not-turned-in/all");
        await write(process.env.CLASSROOM_USER, into("Email or phone"));
        await click("Next");
        await write(process.env.CLASSROOM_PASSWORD, into("Enter your password"));
        await click("Sign in");
        waitFor(async () => (await text('This week').exists()))

        await click("No due date")
        await click("This week")
        await screenshot({ path: 'assignedThisWeek.png', fullPage: true });
        await click("Next week")
        await screenshot({ path: 'assignedNextWeek.png', fullPage: true });

        await click("Missing")
        await click("This week")
        await screenshot({ path: 'missingThisWeek.png', fullPage: true });
        await click("Last week")
        await screenshot({ path: 'missingLastWeek.png', fullPage: true });
        await click("Earlier")
        await screenshot({ path: 'missingEarlier.png', fullPage: true });
    } catch (error) {
        await screenshot();
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
