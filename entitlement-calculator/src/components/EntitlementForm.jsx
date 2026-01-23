import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Alert from "react-bootstrap/Alert";
import { daysToHours } from '../utils/Entitlement';
import '../styles/entitlement.css'
import CalculationModal from './CalculationModal';
export default function EntitlementForm() {

    const [errors, setErrors] = useState({});
    const [remainingDays, setRemainingDays] = useState("");
    const [weeklyHours, setWeeklyHours] = useState("");
    const [daysPerWeek, setDaysPerWeek] = useState("");
    const [result, setResult] = useState(null);
    const totalHours = remainingDays * weeklyHours / daysPerWeek
    const totalDays = remainingDays / daysPerWeek
    const [calcInputs, setCalcInputs] = useState(null);
    const [showCalc, setShowCalc] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();

        // Empty error found object to store the errors
        const errorsFound = {}

        // Setting the error fields to make sure the user can not submit the form without the fields being filled out
        if (!remainingDays) errorsFound.remainingDays = ["Please fill out the following field"]
        if (!weeklyHours) errorsFound.weeklyHours = ["Please fill out your weekly hours"]
        if (!daysPerWeek) errorsFound.daysPerWeek = ["Please fill out your days per week"]

        const days = Number(remainingDays)

        if (days <= 0) {
            errorsFound.remainingDays = ["Please enter a number larger than 0"]
        }

        // Returning an array with the errors found, if there are no errors remaining set the errors to the empty object
        if (Object.keys(errorsFound).length) {
            setErrors(errorsFound)
            setResult(null)
            return
        }

        setErrors({})

        const hours = Number(weeklyHours)
        const day_per_week = Number(daysPerWeek)

        // Set the result so the user can visually see either days or hours remaining depending on what they have chosen
        const calculation = daysToHours(days, hours, day_per_week)
        setResult(calculation)

        console.log(result);

        setCalcInputs({
            remainingDays,
            weeklyHours,
            daysPerWeek,
            totalHours: (days * hours) / day_per_week,
            totalDays: totalHours / (weeklyHours / day_per_week)
        });


    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mx-auto" style={{ maxWidth: 400 }}>
                {/* Days remaining form field, setting max and min values so the form cannot be submitted without meeting the min or max values */}
                <Form.Label>
                    <strong>
                        <span>
                            What is your remaining entitlement <br /> in days?
                        </span>


                    </strong>
                    <Form.Control type='number' max="40" step="0.01" value={remainingDays} name='remaining-days' onChange={(e) => setRemainingDays(e.target.value)}></Form.Control>
                </Form.Label>
            </Form.Group>
            {/* Mapping over the errors object and triggering an alert if the field is empty */}
            {errors?.remainingDays?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                    {message}
                </Alert>

            ))}
            <div>
                <Form.Group className="mb-3 mx-auto mb-3" style={{ maxWidth: 275 }}>
                    <Form.Label><strong>What are your contracted working hours per week?</strong>
                    </Form.Label>
                    {/* Select drop down, that will allow the user to pick there contract*/}
                    <Form.Select name='weekly-hours' value={weeklyHours} onChange={(e) => setWeeklyHours(e.target.value)}>
                        <option>Select your contracted hours</option>
                        <option value="40">40hrs</option>
                        <option value="37.5">37.5hrs</option>
                        <option value="37">37hrs</option>
                        <option value="36.5">36.5hrs</option>
                        <option value="33.75">33.75hrs</option>
                        <option value="33">33hrs</option>
                        <option value="32.5">32.5hrs</option>
                        <option value="32">32hrs</option>
                        <option value="31.25">31.25hrs</option>
                        <option value="30">30hrs</option>
                        <option value="29.5">29.5hrs</option>
                        <option value="29">29hrs</option>
                        <option value="28">28hrs</option>
                        <option value="27.5">27.5hrs</option>
                        <option value="27">27hrs</option>
                        <option value="26.5">26.5hrs</option>
                        <option value="26">26hrs</option>
                        <option value="25.83">25.83hrs</option>
                        <option value="25">25hrs</option>
                        <option value="24.75">24.75hrs</option>
                        <option value="23.5">23.5hrs</option>
                        <option value="23">23hrs</option>
                        <option value="22.5">22.5hrs</option>
                        <option value="21">21hrs</option>
                        <option value="20">20hrs</option>
                        <option value="17.5">17.5hrs</option>
                        <option value="16.5">16hrs 24 mins</option>
                        <option value="16">16hrs</option>
                        <option value="15.5">15.5hrs</option>
                        <option value="15">15hrs</option>
                        <option value="14.5">14.5hrs</option>
                        <option value="13.5">13.5hrs</option>
                        <option value="13">13hrs</option>
                        <option value="10.5">10.5hrs</option>
                        <option value="8">8hrs</option>
                        <option value="7.5">7.5hrs</option>
                    </Form.Select>
                </Form.Group>
                {/* Mapping over the errors object and triggering an alert if the field is empty */}
                {errors?.weeklyHours?.map((message, idx) => (
                    <Alert variant='warning' key={idx}>
                        {message}
                    </Alert>

                ))}
            </div>

            <Form.Group className="mb-3 mx-auto" style={{ maxWidth: 275 }} >
                <Form.Label><strong>How many days per week do you work?</strong></Form.Label>
                <div>
                    {/* Days per week form field, setting max and min values so the form cannot be submitted without meeting the min or max values */}
                    <Form.Control type="number" max="5" min="1" name='days-per-week' value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} />
                </div>

            </Form.Group>
            {/* Mapping over the errors object and triggering an alert if the field is empty */}
            {errors?.daysPerWeek?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                    {message}
                </Alert>

            ))}


            <Button className='p-2' variant="primary" type="submit">
                Calculate
            </Button>

            {result?.holidayBreakdown && (
                <>
                    <div>

                    </div>
                    <div className='border border-black rounded p-2 m-3 allowance-text' style={{ marginTop: 16 }}>
                        <p>You have</p>
                        <p hidden>
                            <strong>{result.holidayBreakdown.totalDays}</strong>
                            {result.holidayBreakdown.totalDays === 1 ? ' day ' : ' days '}
                        </p>

                        <p>
                            {result.holidayBreakdown.days > 0 && (
                                <strong>{result.holidayBreakdown.days}</strong>
                            )}
                            {result.holidayBreakdown.days > 0 && (
                                result.holidayBreakdown.days === 1 ? ' day ' : ' days '
                            )}

                            {result.holidayBreakdown.hours > 0 && (
                                <strong>{result.holidayBreakdown.hours}</strong>
                            )}
                            {result.holidayBreakdown.hours > 0 && (
                                result.holidayBreakdown.hours === 1 ? ' hour ' : ' hours '
                            )}

                            {result.holidayBreakdown.minutes > 0 && (
                                <strong>{result.holidayBreakdown.minutes}</strong>
                            )}
                            {result.holidayBreakdown.minutes > 0 && (
                                result.holidayBreakdown.minutes === 1 ? ' minute ' : ' minutes '
                            )}

                            remaining
                        </p>


                    </div>
                    <Button
                        className="p-2 d-none d-lg-inline-block"
                        variant="outline-primary"
                        onClick={() => setShowCalc(true)}
                    >
                        Show calculation
                    </Button>

                    {/* Mobile: toggle inline breakdown */}
                    <Button
                        className="p-2 d-lg-none"
                        variant="primary"
                        onClick={() => setShowCalc(!showCalc)}
                    >
                        Show calculation
                    </Button>

                    <CalculationModal
                        show={showCalc}
                        onHide={() => setShowCalc(false)}
                        calcInputs={calcInputs}
                    />
                </>

            )}

            

        </Form>
    </>
}