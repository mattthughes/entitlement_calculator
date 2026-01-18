import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Alert from "react-bootstrap/Alert";
import { daysToHours } from '../utils/Entitlement';
export default function EntitlementForm() {

    const [errors, setErrors] = useState({});
    const [remainingDays, setRemainingDays] = useState("");
    const [weeklyHours, setWeeklyHours] = useState("");
    const [daysPerWeek, setDaysPerWeek] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();


        // Empty error found object to store the errors
        const errorsFound = {}

        // Setting the error fields to make sure the user can not submit the form without the fields being filled out
        if (!remainingDays) errorsFound.remainingDays = ["Please fill out the following field"]
        if (!weeklyHours) errorsFound.weeklyHours = ["Please fill out your weekly hours"]
        if (!daysPerWeek) errorsFound.daysPerWeek = ["Please fill out your days per week"]

        // Returning an array with the errors found, if there are no errors remaining set the errors to the empty object
        if (Object.keys(errorsFound).length) {
            setErrors(errorsFound)
            setResult(null)
            return
        }

        setErrors({})

        const days = Number(remainingDays)
        const hours = Number(weeklyHours)
        const day_per_week = Number(daysPerWeek)

        // Set the result so the user can visually see either days or hours remaining depending on what they have chosen
        const calculation = daysToHours(days, hours, day_per_week)
        setResult(calculation)

        console.log(result);
    }
    return <>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                {/* Days remaining form field, setting max and min values so the form cannot be submitted without meeting the min or max values */}
                <Form.Label>How many days do you have remaining
                    <Form.Control type='number' max="40" value={remainingDays} name='remaining-days' onChange={(e) => setRemainingDays(e.target.value)}></Form.Control>
                </Form.Label>
            </Form.Group>
            {/* Mapping over the errors object and triggering an alert if the field is empty */}
            {errors?.remainingDays?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                    {message}
                </Alert>

            ))}
            <div>
                <Form.Group className="mb-3">
                    <Form.Label>What are your contracted hours per week?
                    </Form.Label>
                    {/* Select drop down, that will allow the user to pick there contract*/}
                    <Form.Select name='weekly-hours' value={weeklyHours} onChange={(e) => setWeeklyHours(e.target.value)}>
                        <option>Please select your contracted hours</option>
                        <option value="37.5">37.5hrs</option>
                        <option value="40">40hrs</option>
                        <option value="22.5">22.5hrs</option>
                        <option value="30">30hrs</option>
                    </Form.Select>
                </Form.Group>
                {/* Mapping over the errors object and triggering an alert if the field is empty */}
                {errors?.weeklyHours?.map((message, idx) => (
                    <Alert variant='warning' key={idx}>
                        {message}
                    </Alert>

                ))}
            </div>

            <Form.Group className="mb-3">
                <Form.Label>How many days do you work per week?</Form.Label>
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



            <Button variant="primary" type="submit">
                Calculate
            </Button>

            {result?.holidayBreakdown && (
                <div style={{ marginTop: 16 }}>
                    <p> You have
                        <strong> {result.totalDays}</strong> days remaining
                    </p>

                    <p>
                        {result.holidayBreakdown.days > 0 && (
                            <strong>{result.holidayBreakdown.days}</strong>
                        )}{result.holidayBreakdown.days > 0 && ' days '}

                        {result.holidayBreakdown.hours > 0 && (
                            <strong>{result.holidayBreakdown.hours}</strong>
                        )}{result.holidayBreakdown.hours > 0 && ' hours '}

                        {(result.holidayBreakdown.minutes > 0 ||
                            (result.holidayBreakdown.days === 0 && result.holidayBreakdown.hours === 0)) && (
                                <><strong>{result.holidayBreakdown.minutes}</strong> minutes remaining</>
                            )}
                    </p>
                </div>
            )}
        </Form>
    </>
}