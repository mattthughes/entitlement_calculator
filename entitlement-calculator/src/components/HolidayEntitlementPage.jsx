import EntitlementForm from "./EntitlementForm";
import '../styles/home.css'


export default function HolidayEntitlementPage() {
    return <>
        <div className="d-flex justify-content-center align-items-center min-vh-100 home">
            <div className="d-flex flex-column border border-black p-4 rounded col-12 col-md-10 mx-auto card">
                <h1 className="heading">Holiday entitlement calculator</h1>
                <div className=''>
                    <div>
                        <p className="intro pb-2">Helps you easily convert your remaining Peopleware entitlement into hours and minutes.</p>
                    </div>
                </div>
                <div className="text-center intro">
                    <p>
                        Please complete the following questions and then click <strong>calculate</strong>.
                    </p>
                </div>
                <div>
                    <EntitlementForm />
                </div>
            </div>
        </div>
    </>
}


