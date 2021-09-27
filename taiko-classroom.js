const { openBrowser, goto, click, into, write, button, text, toRightOf, closeBrowser } = require('taiko');
const assert = require('assert').strict;

(async () => {
    try {
        await openBrowser();
        await goto("https://classroom.google.com/u/2/a/not-turned-in/all");
        await write(process.env.CLASSROOM_USER, into("Email or phone"));
        await press("Enter");
        await write(process.env.CLASSROOM_PASSWORD, into("Enter your password"));
        await press("Enter");
        waitFor(async () => (await text('This week').exists()))

        if (await $('//*[@id="THIS_WEEK"]/div[2]').exists()) {
            await screenshot($('//*[@id="THIS_WEEK"]/div[2]'), { path: 'assignedThisWeek.png' });
        } else {
            await click("This week");
            if (await $('//*[@id="THIS_WEEK"]/div[2]').exists()) {
                await screenshot($('//*[@id="THIS_WEEK"]/div[2]'), { path: 'assignedThisWeek.png' });
            } else {
                await screenshot(text("This week"), { path: 'assignedThisWeek.png' });
            }
        }

        if (await $('//*[@id="NEXT_WEEK"]/div[2]').exists()) {
            await screenshot($('//*[@id="NEXT_WEEK"]/div[2]'), { path: 'assignedNextWeek.png' });
        } else {
            await click("Next week")
            if (await $('//*[@id="NEXT_WEEK"]/div[2]').exists()) {
                await screenshot($('//*[@id="NEXT_WEEK"]/div[2]'), { path: 'assignedNextWeek.png' });
            } else {
                await screenshot(text("Next week"), { path: 'assignedNextWeek.png' });
            }
        }

        await click("Missing");
        if (await $('//*[@id="THIS_WEEK"]/div[2]').exists()) {
            await screenshot($('//*[@id="THIS_WEEK"]/div[2]'), { path: 'missingThisWeek.png' });
        } else {
            await click("Missing")
            if (await $('//*[@id="THIS_WEEK"]/div[2]').exists()) {
                await screenshot($('//*[@id="THIS_WEEK"]/div[2]'), { path: 'missingThisWeek.png' });
            } else {
                await screenshot(text("This week"), { path: 'missingThisWeek.png' });
            }
        }

        if (await $('//*[@id="LAST_WEEK"]/div[2]').exists()) {
            await screenshot($('//*[@id="LAST_WEEK"]/div[2]'), { path: 'missingLastWeek.png' });
        } else {
            await click("Last week")
            if (await $('//*[@id="LAST_WEEK"]/div[2]').exists()) {
                await screenshot($('//*[@id="LAST_WEEK"]/div[2]'), { path: 'missingLastWeek.png' });
            } else {
                await screenshot(text("Last week"), { path: 'missingLastWeek.png' });
            }
        }

    } catch (error) {
        await screenshot();
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
