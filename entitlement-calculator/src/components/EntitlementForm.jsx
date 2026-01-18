import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
export default function EntitlementForm() {

    const [remainingDays, setRemainingDays] = useState("")
    const [weeklyHours, setWeeklyHours] = useState("")
    const [daysPerWeek, setDaysPerWeek] = useState("")
    const [unit, setUnit] = useState('')
    const [result, setResult] = useState(null)

    const handleSubmit =(e) => {
        e.preventDefault()
 
    const days = Number(remainingDays)
    const hours = Number(weeklyHours)
    const day_per_week = Number(daysPerWeek)

    const hoursPerDay = day_per_week > 0 ? hours / day_per_week : 0
    const remainingHours = days * hoursPerDay

    setResult({
        daysRemaining: days,
        hoursRemaining: remainingHours
    })
    
    }
    return <>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>How many days do you have remaining
                    <Form.Control type='number' value={remainingDays} name='remaining-days' onChange={(e) => setRemainingDays(e.target.value)}></Form.Control>
                </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Do you want to calculate hours or days</Form.Label>
                <div>
                    <Form.Label>Hours</Form.Label>
                    <Form.Check type="radio"
                    name='unit'
                    value='hours'
                    checked={unit === 'days'}
                    onChange={(e) => setUnit(e.target.value)}
                    />
                    <Form.Label>Days</Form.Label>
                    <Form.Check type="radio" 
                    name='unit'
                    value="days"
                    checked={unit === 'hours'}
                    onChange={(e) => setUnit(e.target.value)}
                    />
                </div>

            </Form.Group>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label>What are your contracted hours per week?
                    </Form.Label>
                    <Form.Select name='weekly-hours' value={weeklyHours} onChange={(e) => setWeeklyHours(e.target.value)}>
                        <option>Please select your contracted hours</option>
                        <option value="37.5">37.5hrs</option>
                        <option value="40">40hrs</option>
                        <option value="22.5">22.5hrs</option>
                        <option value="30">30hrs</option>
                    </Form.Select>
                </Form.Group>
            </div>

            <Form.Group className="mb-3">
                <Form.Label>How many days do you work per week?</Form.Label>
                <div>
                    <Form.Control type="number" name='days-per-week' value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} />
                </div>

            </Form.Group>
            


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