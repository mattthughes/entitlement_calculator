import Modal from 'react-bootstrap/Modal'

export default function CalculationModal({ show, onHide, calcInputs }) {
  if (!calcInputs) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Calculation breakdown</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <p className="mb-1">Hours</p>
          <div className="border border-black d-flex justify-content-evenly p-2">
            <span>{calcInputs.remainingDays}</span>
            <span>*</span>
            <span>{calcInputs.weeklyHours}</span>
            <span>/</span>
            <span>{calcInputs.daysPerWeek}</span>
            <span>=</span>
            <strong>{calcInputs.totalHours}</strong>
          </div>
        </div>

        <div>
          <p className="mb-1">Days</p>
          <div className="border border-black d-flex justify-content-evenly p-2">
            <span>{calcInputs.totalHours}</span>
            <span>/</span>
            <span>{calcInputs.weeklyHours}</span>
            <span>/</span>
            <span>{calcInputs.daysPerWeek}</span>
            <span>=</span>
            <strong>{calcInputs.totalDays}</strong>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}