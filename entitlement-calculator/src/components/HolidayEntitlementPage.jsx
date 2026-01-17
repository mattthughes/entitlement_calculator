import { useState } from "react";

export default function HolidayEntitlementPage() {
    return <>
        <div>
            <h1>Welcome to the holiday entitlement tracker.</h1>
            <p>This tool helps you calculate how much annual leave you have remaining, so you can plan your time off with confidence and make the most of your entitlement.</p>
            <h2>Instructions</h2>
            <ol>
                <li>
                    Select whether you would like to calculate your entitlement in days or hours.
                </li>
                <li>
                    Choose your contract length — for example 37.5 hours, 40 hours, 22.5 hours, or another option from the dropdown.
                </li>
                <li>
                    Enter how many days you work each week.
                </li>
                <li>
                    Click Calculate, and your remaining holiday entitlement will be displayed.
                </li>
            </ol>
        </div>

    </>
}


