import { useState } from "react";
import EntitlementForm from "./EntitlementForm";
import '../styles/home.css'


export default function HolidayEntitlementPage() {
    return <>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="d-flex flex-column border border-black p-4 rounded col-12 col-md-8 col-lg-6 mx-auto">
            <h1 className="heading">Holiday entitlement calculator</h1>
            <div className=''>
                <div>
                    <p className="intro pb-2">This tool helps you calculate how much annual leave you have remaining, so you can plan your time off with confidence and make the most of your entitlement.</p>
                </div> 
            </div>
            <h2 className="heading p-1">Instructions:</h2>
            <div className="text-center intro">
                <ol>
                <li className="">
                    Select whether you would like to calculate your entitlement in days or hours.
                </li>
                <li>
                    Choose your contract length — for example 37.5 hours, 40 hours, 22.5 hours, or another option from the dropdown.
                </li>
                <li>
                    Enter how many days you work each week.
                </li>
                <li>
                    Click calculate, and your remaining holiday entitlement will be displayed.
                </li>
            </ol>
            </div>
            
        
        <div>
            <EntitlementForm/>
        </div>

    </div>

    </div>
        

    </>
}


