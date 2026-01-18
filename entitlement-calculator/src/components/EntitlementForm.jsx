import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Alert from "react-bootstrap/Alert";
export default function EntitlementForm() {

    const [errors, setErrors] = useState({});
    const [remainingDays, setRemainingDays] = useState("");
    const [weeklyHours, setWeeklyHours] = useState("");
    const [daysPerWeek, setDaysPerWeek] = useState("");
    const [unit, setUnit] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit =(e) => {
        e.preventDefault();
    
    // Empty error found object to store the errors
    const errorsFound = {}

    // Setting the error fields to make sure the user can not submit the form without the fields being filled out
    if (!remainingDays) errorsFound.remainingDays = ["Please fill out the following field"]
    if (!unit) errorsFound.unit = ["Please pick either hours or days"]
    if (!weeklyHours) errorsFound.weeklyHours = ["Please fill out your weekly hours"]
    if (!daysPerWeek) errorsFound.daysPerWeek = ["Please fill out your days per week"]

    // Returning an array with the errors found, if there are no errors remaining set the errors to the empty object
    if (Object.keys(errorsFound).length) {
        setErrors(errorsFound)
        setResult(null)
        return
    }

    setErrors({})

    // Creating the days, hours and day per week variables
    const days = Number(remainingDays);
    const hours = Number(weeklyHours);
    const day_per_week = Number(daysPerWeek);

    const hoursPerDay = day_per_week > 0 ? hours / day_per_week : 0
    const remainingHours = days * hoursPerDay

    // Set the result so the user can visually see either days or hours remaining depending on what they have chosen
    setResult({
        daysRemaining: days,
        hoursRemaining: remainingHours
    })
    
    }
    return <>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                {/* Days remaining form field, setting max and min values so the form cannot be submitted without meeting the min or max values */}
                <Form.Label>How many days do you have remaining
                    <Form.Control type='number' max="40" min="1" value={remainingDays} name='remaining-days' onChange={(e) => setRemainingDays(e.target.value)}></Form.Control>
                </Form.Label>
            </Form.Group>
            {/* Mapping over the errors object and triggering an alert if the field is empty */}
            {errors?.remainingDays?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                    {message}
                </Alert>
                
            ))}
            <Form.Group className="mb-3">
                 {/* Radio buttons field which allows the user to pick either hours or days to calculate*/}
                <Form.Label>Do you want to calculate hours or days</Form.Label>
                <div>
                    <Form.Label>Hours</Form.Label>
                    <Form.Check type="radio"
                    name='unit'
                    value='hours'
                    checked={unit === 'hours'}
                    onChange={(e) => setUnit(e.target.value)}
                    />
                    <Form.Label>Days</Form.Label>
                    <Form.Check type="radio" 
                    name='unit'
                    value="days"
                    checked={unit === 'days'}
                    onChange={(e) => setUnit(e.target.value)}
                    />
                </div>

            </Form.Group>
             {/* Mapping over the errors object and triggering an alert if the field is empty */}
            {errors?.unit?.map((message, idx) => (
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
                Submit
            </Button>

            {result && (
        <div style={{ marginTop: 16 }}>
          {unit === 'days' && <p><strong>{result.daysRemaining}</strong> days remaining</p>}
          {unit === 'hours' && <p><strong>{result.hoursRemaining.toFixed(2)}</strong> hours remaining</p>}
        </div>
      )}
        </Form>
    </>
}