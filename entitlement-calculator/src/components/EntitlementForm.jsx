import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function EntitlementForm() {
    return <>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Do you want to calculate hours or days</Form.Label>
                <div>
                    <Form.Label>Hours</Form.Label>
                    <Form.Control type="radio" />
                    <Form.Label>Days</Form.Label>
                    <Form.Control type="radio" />
                </div>

            </Form.Group>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label>What are your contracted hours per week?
                    </Form.Label>
                    <select>
                        <option>Please select your contracted hours</option>
                        <option>37.5hrs</option>
                        <option>40hrs</option>
                        <option>22.5hrs</option>
                        <option>30hrs</option>
                    </select>
                </Form.Group>
            </div>

            <Form.Group className="mb-3">
                <Form.Label>How many days do you work per week?</Form.Label>
                <div>
                    <Form.Control type="number" />
                </div>

            </Form.Group>
            


            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}